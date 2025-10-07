"use client"

import {use, useEffect, useState} from "react";
import {Question} from "@/types/quiz";

export default function QuizPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = use(params);

    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [userAnswers, setUserAnswers] = useState<{ question: string; answer: string; correct: boolean }[]>([]);
    const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
    const [showScore, setShowScore] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchQuestions() {
            try {
                const response = await fetch(`/api/quiz?category=${category}&amount=10&difficulty=easy`);
                const data = await response.json();
                if (response.ok) {
                    setQuestions(data.questions);
                    setCorrectAnswers(data.questions.map((q: any) => q.correctAnswer))
                } else {
                    setError(data.error || "Erreur lors de la récupération des questions");
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Une erreur est survenue");
            }
            setIsLoading(false);
        }
        
        fetchQuestions().then(r => r);
    }, [category]);

    const handleAnswerClick = (answer: string) => {
        setSelectedAnswer(answer);
    };

    const handleNext = () => {
        if (!selectedAnswer) return;

        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = selectedAnswer === correctAnswers[currentQuestionIndex];

        setUserAnswers([
            ...userAnswers,
            {
                question: currentQuestion.question,
                answer: selectedAnswer,
                correct: isCorrect
            }
        ]);

        setSelectedAnswer(null);

        if (currentQuestionIndex === questions.length - 1) {
            setShowScore(true);
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const calculateScore = () => {
        return userAnswers.filter(answer => answer.correct).length;
    };

    if (isLoading) return <p>Loading...</p>;

    if (error) return <p>Erreur: {error}</p>;

    if (questions.length === 0) {
        return <div>No questions available</div>;
    }

    if (showScore) {
        const score = calculateScore();
        return (
            <div>
                <h2>Your Score: {score} / {questions.length}</h2>
                <ul>
                    {userAnswers.map((ua, index) => (
                        <li key={index} style={{ color: ua.correct ? 'green' : 'red' }}>
                            Q: {ua.question} - Your Answer: {ua.answer} ({ua.correct ? 'Correct' : 'Wrong'})
                        </li>
                    ))}
                </ul>
                <button onClick={() => {
                    window.location.href = '/';
                }}>Accueil</button>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div>
            <p>Question {currentQuestionIndex + 1} / {questions.length}</p>
            <h2>{currentQuestion.question}</h2>

            <div>
                {currentQuestion.answers.map((answer) => (
                    <button
                        key={answer}
                        onClick={() => handleAnswerClick(answer)}
                        style={{
                            backgroundColor: selectedAnswer === answer ? "lightblue" : "white",
                            padding: "10px",
                            margin: "5px",
                            border: "1px solid black",
                            cursor: "pointer"
                        }}
                    >
                        {answer}
                    </button>
                ))}
            </div>

            <button
                onClick={handleNext}
                disabled={!selectedAnswer}
                style={{ marginTop: "20px", padding: "10px" }}
            >
                {currentQuestionIndex === questions.length - 1 ? "Terminer" : "Suivant"}
            </button>
        </div>
    );
}