export interface Question {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    answers: string[];
    correct_answer: string;
}

export interface UserAnswer {
    question: string;
    answer: string;
    correct: boolean;
}

export interface QuizResponse {
    response_code: number;
    results: Question[];
}