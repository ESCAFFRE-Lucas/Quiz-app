import TenorGif from "@/components/TenorGif";

export default async function AboutPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">À propos de QuizMaster</h1>
            <p className="text-lg text-muted-foreground">
                QuizMaster est une application de quiz interactive conçue pour tester vos connaissances dans divers
                domaines. Que vous soyez un amateur de culture générale, un passionné de science ou un expert en
                histoire, QuizMaster a quelque chose à offrir à tout le monde.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-2">Fonctionnalités</h2>
            <ul className="list-disc list-inside text-lg text-muted-foreground">
                <li>Large sélection de catégories de quiz</li>
                <li>Questions variées et stimulantes</li>
                <li>Suivi des performances et statistiques personnelles</li>
                <li>Classement des meilleurs joueurs</li>
                <li>Interface utilisateur conviviale et réactive</li>
            </ul>
            <h2 className="text-2xl font-semibold mt-6 mb-2">Notre équipe</h2>
            <p className="text-lg text-muted-foreground">
                QuizMaster a été développé par une équipe de passionnés de technologie et d&#39;éducation, dédiée à la
                création d&#39;une expérience d&#39;apprentissage amusante et engageante.
            </p>
            <div className="fixed bottom-4 right-4 z-50 w-32 h-auto">
                <TenorGif />
            </div>
        </div>
    )
}