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
    totalPoints: number;
}

export function calculateUserStats(attempts: Array<{
    score: number;
    totalQuestions: number;
}>): Omit<UserStats, 'totalPoints'> {
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

export function getCompleteUserStats(
    attempts: Array<{ score: number; totalQuestions: number }>,
    dbTotalPoints: number
): UserStats {
    const calculatedStats = calculateUserStats(attempts);

    return {
        ...calculatedStats,
        totalPoints: dbTotalPoints
    };
}

export function calculateQuizPoints(score: number, totalQuestions: number): number {
    const percentage = (score / totalQuestions) * 100;

    if (percentage === 100) return 20;
    if (percentage >= 90) return 15;
    if (percentage >= 80) return 12;
    if (percentage >= 70) return 10;
    if (percentage >= 60) return 8;
    if (percentage >= 50) return 5;
    return 2;
}

export async function updateUserStatsAfterQuiz(
    userId: string,
    score: number,
    totalQuestions: number
): Promise<void> {
    const { prisma } = await import("./prisma");
    const points = calculateQuizPoints(score, totalQuestions);

    await prisma.user.update({
        where: { id: userId },
        data: {
            totalQuizzes: { increment: 1 },
            totalPoints: { increment: points },
        },
    });
}