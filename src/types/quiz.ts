export interface Question {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    answers: string[];
    correctAnswer: string;
}

export interface UserAnswer {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
}

export interface QuizResponse {
    response_code: number;
    results: Question[];
}

export interface Answer {
    id: string;
    attemptId: string;
    questionText: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
}

export interface QuizAttempt {
    id: string;
    userId: string;
    categoryId: number;
    categoryName: string;
    score: number;
    totalQuestions: number;
    completedAt: Date;
    answers: Answer[];
}

export interface QuizHistoryListProps {
    attempts: QuizAttempt[];
    categories: any;
}