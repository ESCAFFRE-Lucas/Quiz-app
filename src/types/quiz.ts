export interface Question {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    answers: string[];
    correct_answer: string;
}

export interface QuizResponse {
    response_code: number;
    results: Question[];
}