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