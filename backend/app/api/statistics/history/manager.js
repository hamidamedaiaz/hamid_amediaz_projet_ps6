const QuizHistory = require('../../../models/quiz-history.model')

class HistoryManager {
  /**
   * Récupère l'historique des quiz pour un profil spécifique
   * @param {number} profileId - ID du profil
   * @returns {Array} Liste des historiques pour ce profil
   */
  static getHistoryByProfileId(profileId) {
    const allHistory = QuizHistory.get()
    return allHistory.filter(history => history.profileId === profileId)
  }

  /**
   * Récupère l'historique pour un quiz spécifique
   * @param {number} quizId - ID du quiz
   * @returns {Array} Liste des historiques pour ce quiz
   */
  static getHistoryByQuizId(quizId) {
    const allHistory = QuizHistory.get()
    return allHistory.filter(history => history.quizId === quizId)
  }
  
  /**
   * Récupère l'historique pour un profil et un quiz spécifique
   * @param {number} profileId - ID du profil
   * @param {number} quizId - ID du quiz
   * @returns {Object|null} L'historique correspondant ou null
   */
  static getHistoryByProfileAndQuiz(profileId, quizId) {
    const allHistory = QuizHistory.get()
    return allHistory.find(history => 
      history.profileId === profileId && history.quizId === quizId
    ) || null
  }
}

module.exports = HistoryManager