# Quiz App

## Installation

1. Clone le projet
   ```bash
   git clone https://github.com/ESCAFFRE-Lucas/Quiz-app.git
   cd Quiz-app
   npm install
   ```

2. Crée un fichier `.env` à la racine :
   ```
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-here"
   ```
   
    Vous pouvez générer un secret avec la commande suivante :
    ```bash
    openssl rand -base64 32
    ```

3. Initialise la base de données :
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Lance le serveur :
   ```bash
   npm run dev
   ```

## Environnements

- **Local** : SQLite (schema.local.prisma)
- **Production** : PostgreSQL (schema.prod.prisma)

## Déploiement
Le projet peut être déployé sur Vercel. Assurez-vous de configurer les variables d'environnement dans le tableau de bord Vercel.