export interface MultiplayerSession {
  gameCode: string;
  quizId: number;
  host: {
    id: number;
    name: string;
    lastName: string;
    socketId: string;
  };
  players: Player[];
  currentQuestion: number;
  status: 'waiting' | 'playing' | 'completed' | 'terminated';
  startTime: number | null;
}

export interface Player {
  id: number;
  name: string;
  lastName: string;
  score: number;
  profilePicture?: string;
}

export interface QuestionResultData {
  questionId: number;
  results: {
    correctCount: number;
    answerDistribution: Record<number, number>;
    averageTime: number;
  };
  players: Player[];
}