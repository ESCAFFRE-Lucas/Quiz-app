export const QUIZ_CATEGORIES = {
    9: {
        name: "Culture Générale",
        slug: "general-knowledge",
        icon: "🧠",
        color: "bg-purple-500"
    },
    11: {
        name: "Cinéma",
        slug: "film",
        icon: "🎬",
        color: "bg-red-500"
    },
    15: {
        name: "Jeux Vidéo",
        slug: "video-games",
        icon: "🎮",
        color: "bg-blue-500"
    },
    18: {
        name: "Informatique",
        slug: "computers",
        icon: "💻",
        color: "bg-green-500"
    },
    20: {
        name: "Mythologie",
        slug: "mythology",
        icon: "⚡",
        color: "bg-yellow-500"
    },
    21: {
        name: "Sport",
        slug: "sports",
        icon: "⚽",
        color: "bg-orange-500"
    },
    23: {
        name: "Histoire",
        slug: "history",
        icon: "📜",
        color: "bg-indigo-500"
    }
} as const;

export type CategoryId = keyof typeof QUIZ_CATEGORIES;