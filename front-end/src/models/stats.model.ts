export interface ComprehensiveStats {
    totalUsers: number;
    totalQuizzes: number;
    totalGamesPlayed: number;
    averageQuizScore: number;
  
    userStats: {
      mostActiveUsers: UserPerformance[];
      newUsersThisMonth: number;
      userGrowthRate: number;
    };
  
    quizStats: {
      mostPlayedQuizzes: QuizPerformance[];
      categoriesDistribution: CategoryDistribution[];
      averageQuizCompletion: number;
    };
  
    timeSeriesData: {
      dailyActiveUsers: TimeSeriesDataPoint[];
      dailyQuizzesTaken: TimeSeriesDataPoint[];
    };
  }
  
  export interface UserPerformance {
    userId: number;
    name: string;
    lastName: string;
    totalQuizzesTaken: number;
    averageScore: number;
    lastActive: Date;
  }
  
  export interface QuizPerformance {
    quizId: number;
    title: string;
    totalPlays: number;
    averageScore: number;
    difficulty: 'Easy' | 'Medium' | 'Hard';
  }
  
  export interface CategoryDistribution {
    category: string;
    percentage: number;
    count: number;
  }
  
  export interface TimeSeriesDataPoint {
    date: Date;
    value: number;
  }