export interface UserStats {
    totalQuizzes: number;
    totalScore: number;
    totalQuestions: number;
    averageScore: number;
    bestScore: number;
    bestAttempt: {
        score: number;
        totalQuestions: number;
    } | null;
}

export function calculateUserStats(attempts: Array<{
    score: number;
    totalQuestions: number;
}>): UserStats {
    const totalQuizzes = attempts.length;
    const totalScore = attempts.reduce((sum, attempt) => sum + attempt.score, 0);
    const totalQuestions = attempts.reduce((sum, attempt) => sum + attempt.totalQuestions, 0);

    const averageScore = totalQuestions > 0
        ? Math.round((totalScore / totalQuestions) * 100)
        : 0;

    const bestAttempt = attempts.reduce((best, attempt) => {
        const currentPercentage = (attempt.score / attempt.totalQuestions) * 100;
        const bestPercentage = best ? (best.score / best.totalQuestions) * 100 : 0;
        return currentPercentage > bestPercentage ? attempt : best;
    }, null as typeof attempts[0] | null);

    const bestScore = bestAttempt
        ? Math.round((bestAttempt.score / bestAttempt.totalQuestions) * 100)
        : 0;

    return {
        totalQuizzes,
        totalScore,
        totalQuestions,
        averageScore,
        bestScore,
        bestAttempt: bestAttempt ? {
            score: bestAttempt.score,
            totalQuestions: bestAttempt.totalQuestions
        } : null
    };
}