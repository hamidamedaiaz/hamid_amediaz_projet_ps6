const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const api = require('./api')
const socketIO = require('socket.io')

module.exports = (cb) => {
  const app = express()
  app.disable('x-powered-by')
  app.use(cors())
  app.use(bodyParser.json({}))
  app.use(morgan('[:date[iso]] :method :url :status :response-time ms - :res[content-length]'))
  app.use('/api', api)
  app.use('*', (req, res) => res.status(404).end())
  
  const server = app.listen(process.env.PORT || 9428, () => cb && cb(server))
  
  // Configuration de Socket.IO
  const io = socketIO(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  })
  
  // Stockage des sessions de jeu actives
  const gameSessions = new Map()
  
  // Gestion des connexions WebSocket
  io.on('connection', (socket) => {
    console.log(`Nouvelle connexion: ${socket.id}`)
    
    // Créer une session de jeu
    socket.on('create-game', (data) => {
      const { quizId, host } = data
      const gameCode = generateGameCode()
      
      // Créer une nouvelle session
      const gameSession = {
        gameCode,
        quizId,
        host,
        players: [],
        currentQuestion: 0,
        status: 'waiting', // waiting, playing, completed
        answers: new Map(), // playerId -> answers
        startTime: null
      }
      
      gameSessions.set(gameCode, gameSession)
      
      // Rejoindre la salle correspondant au code de jeu
      socket.join(gameCode)
      
      // Informer le client que la session a été créée
      socket.emit('game-created', { gameCode, session: gameSession })
      console.log(`Session créée: ${gameCode} pour le quiz ${quizId}`)
    })
    
    // Rejoindre une session de jeu
    socket.on('join-game', (data) => {
      const { gameCode, player } = data
      const session = gameSessions.get(gameCode)
      
      if (!session) {
        socket.emit('error', { message: 'Session de jeu non trouvée' })
        return
      }
      
      if (session.status !== 'waiting') {
        socket.emit('error', { message: 'La partie a déjà commencé' })
        return
      }
      
      // Ajouter le joueur à la session
      session.players.push({
        id: player.id, 
        name: player.name,
        lastName: player.lastName,
        score: 0,
        profilePicture: player.profilePicture
      })
      
      // Rejoindre la salle
      socket.join(gameCode)
      
      // Informer tous les clients de la nouvelle liste de joueurs
      io.to(gameCode).emit('player-joined', { 
        players: session.players,
        player: player
      })
      
      console.log(`Joueur ${player.name} a rejoint la session ${gameCode}`)
    })
    
    // Lancer la partie
    socket.on('start-game', (data) => {
      const { gameCode } = data
      const session = gameSessions.get(gameCode)
      
      if (!session) {
        socket.emit('error', { message: 'Session de jeu non trouvée' })
        return
      }
      
      session.status = 'playing'
      session.currentQuestion = 0
      session.startTime = Date.now()
      
      // Informer tous les joueurs que la partie commence
      io.to(gameCode).emit('game-started', { 
        currentQuestion: session.currentQuestion,
        totalQuestions: session.totalQuestions
      })
      
      console.log(`La partie ${gameCode} a commencé`)
    })
    
    // Soumettre une réponse
    socket.on('submit-answer', (data) => {
      const { gameCode, playerId, questionId, answerId, timeTaken } = data
      const session = gameSessions.get(gameCode)
      
      if (!session) {
        socket.emit('error', { message: 'Session de jeu non trouvée' })
        return
      }
      
      // Enregistrer la réponse du joueur
      if (!session.answers.has(questionId)) {
        session.answers.set(questionId, new Map())
      }
      
      const questionAnswers = session.answers.get(questionId)
      questionAnswers.set(playerId, { answerId, timeTaken })
      
      // Informer l'hôte des réponses reçues
      const answerCount = questionAnswers.size
      io.to(gameCode).emit('answer-received', { 
        questionId,
        answerCount,
        totalPlayers: session.players.length
      })
      
      console.log(`Réponse reçue de ${playerId} pour la question ${questionId}`)
    })
    
    // Passer à la question suivante
    socket.on('next-question', (data) => {
      const { gameCode } = data
      const session = gameSessions.get(gameCode)
      
      if (!session) {
        socket.emit('error', { message: 'Session de jeu non trouvée' })
        return
      }
      
      session.currentQuestion++
      
      // Si toutes les questions ont été posées, terminer la partie
      if (session.currentQuestion >= session.totalQuestions) {
        session.status = 'completed'
        
        // Calculer les scores finaux
        calculateFinalScores(session)
        
        // Informer tous les joueurs que la partie est terminée
        io.to(gameCode).emit('game-completed', { 
          players: session.players.sort((a, b) => b.score - a.score)
        })
        
        console.log(`La partie ${gameCode} est terminée`)
      } else {
        // Informer tous les joueurs de la nouvelle question
        io.to(gameCode).emit('question-changed', { 
          currentQuestion: session.currentQuestion
        })
        
        console.log(`Question suivante pour la partie ${gameCode}: ${session.currentQuestion}`)
      }
    })
    
    // Calculer et afficher les résultats de la question
    socket.on('show-question-results', (data) => {
      const { gameCode, questionId, correctAnswerIds } = data
      const session = gameSessions.get(gameCode)
      
      if (!session) {
        socket.emit('error', { message: 'Session de jeu non trouvée' })
        return
      }
      
      // Calculer les résultats et mettre à jour les scores
      const results = calculateQuestionResults(session, questionId, correctAnswerIds)
      
      // Informer tous les joueurs des résultats
      io.to(gameCode).emit('question-results', { 
        questionId,
        results,
        players: session.players.sort((a, b) => b.score - a.score)
      })
      
      console.log(`Résultats de la question ${questionId} envoyés pour la partie ${gameCode}`)
    })
    
    // Quitter la partie
    socket.on('leave-game', (data) => {
      const { gameCode, playerId } = data
      const session = gameSessions.get(gameCode)
      
      if (!session) return
      
      // Retirer le joueur de la session
      session.players = session.players.filter(player => player.id !== playerId)
      
      // Si c'est l'hôte qui quitte, terminer la partie
      if (session.host.id === playerId) {
        io.to(gameCode).emit('game-terminated', { 
          message: 'L\'hôte a quitté la partie'
        })
        
        gameSessions.delete(gameCode)
        console.log(`La partie ${gameCode} a été terminée (l'hôte a quitté)`)
      } else {
        // Informer les autres joueurs
        io.to(gameCode).emit('player-left', { 
          playerId,
          players: session.players
        })
        
        console.log(`Joueur ${playerId} a quitté la partie ${gameCode}`)
      }
      
      // Quitter la salle
      socket.leave(gameCode)
    })
    
    // Déconnexion
    socket.on('disconnect', () => {
      console.log(`Déconnexion: ${socket.id}`)
      
      // Trouver toutes les sessions où ce client était l'hôte
      gameSessions.forEach((session, gameCode) => {
        // Si l'hôte se déconnecte, informer les autres joueurs
        if (session.host && session.host.socketId === socket.id) {
          io.to(gameCode).emit('game-terminated', { 
            message: 'L\'hôte a quitté la partie'
          })
          
          gameSessions.delete(gameCode)
          console.log(`La partie ${gameCode} a été terminée (l'hôte s'est déconnecté)`)
        }
      })
    })
  })
  
  // Fonctions utilitaires
  function generateGameCode() {
    // Générer un code à 6 caractères alphanumériques
    //const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    let code = ''
   // for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
   // }
    
    // Vérifier si le code existe déjà
   // if (gameSessions.has(code)) {
    //  return generateGameCode() // Récursion pour générer un nouveau code
    //}
    
    return 1234;
  }
  
  function calculateQuestionResults(session, questionId, correctAnswerIds) {
    const questionAnswers = session.answers.get(questionId) || new Map()
    const results = {
      correctCount: 0,
      answerDistribution: {}, // answerId -> count
      averageTime: 0
    }
    
    let totalTime = 0
    
    // Calculer la distribution des réponses et les scores
    questionAnswers.forEach((answer, playerId) => {
      // Incrémenter le compteur pour cette réponse
      if (!results.answerDistribution[answer.answerId]) {
        results.answerDistribution[answer.answerId] = 0
      }
      results.answerDistribution[answer.answerId]++
      
      // Vérifier si la réponse est correcte
      const isCorrect = correctAnswerIds.includes(answer.answerId)
      if (isCorrect) {
        results.correctCount++
        
        // Mettre à jour le score du joueur
        const player = session.players.find(p => p.id === parseInt(playerId))
        if (player) {
          // Score basé sur la rapidité (plus rapide = plus de points)
          const timeBonus = Math.max(0, 1000 - answer.timeTaken) / 100
          const points = 1000 + Math.floor(timeBonus)
          player.score += points
        }
      }
      
      totalTime += answer.timeTaken
    })
    
    // Calculer le temps moyen
    const playerCount = questionAnswers.size
    results.averageTime = playerCount > 0 ? Math.round(totalTime / playerCount) : 0
    
    return results
  }
  
  function calculateFinalScores(session) {
    // Les scores sont déjà calculés progressivement
    // Cette fonction pourrait ajouter des bonus de fin ou d'autres calculs finaux
    return session.players.sort((a, b) => b.score - a.score)
  }
  
  // Exposer io pour l'utiliser ailleurs
  app.io = io
  
  return server
}