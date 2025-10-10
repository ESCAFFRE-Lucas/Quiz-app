# Quiz App

Application de quiz interactive avec authentification, système de points et classement.

## 🚀 Installation

### 1. Cloner le projet
```bash
git clone https://github.com/ESCAFFRE-Lucas/Quiz-app.git
cd Quiz-app
npm install
```

### 2. Configurer les variables d'environnement

Créez un fichier `.env` à la racine du projet :

```bash
cp .env.example .env
```

Puis modifiez le fichier `.env` avec les valeurs suivantes :

```env
# Base de données (SQLite pour le développement local)
DATABASE_URL="file:./prisma/dev.db"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"

# OAuth Providers (Optionnel - laissez vide si vous utilisez uniquement email/password)
GITHUB_ID=""
GITHUB_SECRET=""
DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""

# Vercel Blob (Optionnel - nécessaire uniquement pour l'upload d'images de profil)
BLOB_READ_WRITE_TOKEN=""
```

**Générer un secret pour `NEXTAUTH_SECRET` :**
```bash
openssl rand -base64 32
```

> **Note :** L'authentification OAuth (GitHub/Discord) et l'upload d'images sont optionnels. Vous pouvez utiliser l'application avec uniquement l'inscription par email/mot de passe.

### 3. Initialiser la base de données

```bash
npx prisma generate
npx prisma db push
```

### 4. Lancer le serveur de développement

```bash
npm run dev
```

L'application sera accessible sur **http://localhost:3000**

---

## 🔧 Variables d'environnement optionnelles

### OAuth (GitHub/Discord)

Pour activer la connexion via GitHub ou Discord, créez des applications OAuth :

- **GitHub :** https://github.com/settings/developers
- **Discord :** https://discord.com/developers/applications

### Upload d'images de profil

Pour activer l'upload d'images, créez un token Vercel Blob :

- **Vercel Blob :** https://vercel.com/docs/storage/vercel-blob

---

## 🌟 Fonctionnalités

- 🎮 **9 catégories de quiz** (Cinéma, Jeux Vidéo, Histoire, Sport, etc.)
- 🏆 **Système de classement** avec points et statistiques
- 👤 **Profils utilisateurs** personnalisables avec avatars
- 🔐 **Authentification multiple** (Email/Password, GitHub, Discord)
- 📊 **Historique détaillé** de tous vos quiz
- 🔍 **Recherche** de catégories
- 📱 **Design responsive** optimisé mobile et desktop
- ⚡ **Performance optimale** avec Next.js 15 et React 19

## 🌍 Environnements

- **Local** : SQLite (schema.local.prisma)
- **Production** : PostgreSQL (schema.prod.prisma)

Le script `scripts/select-schema.ts` sélectionne automatiquement le bon schéma selon l'environnement.

---

## 🚢 Déploiement

Le projet est déployé sur Vercel : **[Quiz App](https://quiz.lucesf.com/)**

### Configuration Vercel

1. Connectez votre repository GitHub à Vercel
2. Configurez les variables d'environnement dans le dashboard Vercel :
   - `DATABASE_URL` : Votre URL PostgreSQL
   - `NEXTAUTH_URL` : URL de production
   - `NEXTAUTH_SECRET` : Secret de production
   - Variables OAuth (optionnel)
   - `BLOB_READ_WRITE_TOKEN` (optionnel)

---

## 🐛 Dépannage

### Erreur "NEXTAUTH_SECRET is missing"
- Assurez-vous d'avoir généré et ajouté un secret avec `openssl rand -base64 32`
- Vérifiez que le fichier `.env` contient bien `NEXTAUTH_SECRET="votre-secret"`

### La base de données ne se crée pas
- Vérifiez que le dossier `prisma/` existe
- Lancez manuellement : `npx prisma db push`
- Supprimez le dossier `.next` et relancez `npm run dev`

### Erreur de connexion avec credentials
- Vérifiez que vous avez bien créé un compte avec `npm run dev` → Inscription
- Les sessions utilisent JWT, assurez-vous que les cookies sont activés

### Les images de profil ne s'uploadent pas
- Cette fonctionnalité nécessite `BLOB_READ_WRITE_TOKEN`
- Vous pouvez utiliser l'application sans upload d'images (les initiales s'affichent)

### OAuth ne fonctionne pas
- Vérifiez que les variables `GITHUB_ID`, `GITHUB_SECRET`, etc. sont correctes
- Configurez les URLs de callback dans les applications OAuth :
  - GitHub : `http://localhost:3000/api/auth/callback/github`
  - Discord : `http://localhost:3000/api/auth/callback/discord`

---

### Attendus obligatoires :
- [x] **Routing statique et dynamique**
  - Fait : Utilisation de fichiers dans le dossier `app/` pour les routes statiques et dynamiques
  - Exemple : `app/quiz/[categories]/page.tsx` pour une route dynamique basée sur les catégories de quiz.
  - Exemple : `app/about/page.tsx` pour une route statique.

- [x] **Server Components (minimum 3) pour récupérer les data**
  - Fait : Les pages app/(main)/about/page.tsx, app/(main)/leaderboard/page.tsx, et app/(main)/profile/page.tsx sont des Server Components qui récupèrent les données depuis la base de données.
    (Il n'y a ni `'use client'` ni `'use server'` dans ces fichiers)

- [x] **Client Components (minimum 3) avec 'use client' pour interactivité**
  - Fait : Composants comme `Navbar`, `AnswerButton`, et `ProfileModal` utilisant `'use client'` pour gérer l'interactivité.
  - Exemple : `app/components/Navbar.tsx`

- [x] **Layouts (root layout + 1 layout imbriqué minimum)**
  - Fait : `app/layout.tsx` pour le layout racine et `app/(main)/layout.tsx` pour le layout imbriqué (ce layout sert pour la Navbar).

- [x] **Pages spéciales (loading.tsx, error.tsx, not-found.tsx)**
  - Fait : Fichiers `error.tsx`, et `global-not-found.tsx` dans le dossier `app/` pour gérer les états spéciaux.

- [x] **Base de données SQLite avec Prisma**
  - Fait : Configuration de Prisma avec SQLite dans `prisma/schema.local.prisma` et initialisation de la base de données pour le developpement.
  - Fait : Configuration de Prisma avec Postgres dans `prisma/schema.prod.prisma` et initialisation de la base de données pour la production.

- [x] **CRUD complet (Create, Read, Update, Delete)**
  - Fait : Create, Read, Update pour les quiz et les utilisateurs. (Je n'ai pas trouvé de cas d'utilisation pour le Delete dans cette application)

- [x] **Server Actions avec 'use server'**
  - Fait : Tous les fichiers dans le dossier `app/actions/` utilisent `'use server'` pour les actions côté serveur.

- [x] **Authentification (NextAuth ou BetterAuth) avec login/logout**
  - Fait : Intégration de NextAuth dans `app/api/auth/[...nextauth].ts` pour gérer l'authentification.

- [x] **Protection des routes partiellement (middleware ou vérification session)**
  - Fait : Middleware dans `src/middleware.ts` pour protéger toutes les routes. Cela empêche l'accès aux pages si l'utilisateur n'est pas authentifié.

- [x] **Images optimisées avec le composant <Image> de Next.js**
  - Fait : Utilisation du composant `<Image>` dans des pages comme `app/(main)/profile/page.tsx` pour afficher les images de profil des utilisateurs.

- [x] **Séparation des responsabilités (lib/, components/, actions/) ( src/ bonus )**
  - Fait : Structure du projet avec des dossiers `lib/`, `components/`, `actions/`, `hooks/`, `app/`, et `types/` pour une meilleure organisation du code.

### Bonus possibles :
- [x] **Recherche et filtres avancés**
  - Fait : Fonctionnalité de recherche avec le component SearchBar introduit dans la page d'accueil.

- [x] **Design soigné et responsive**
  - Fait : Utilisation de CSS modules ou Tailwind CSS pour un design responsive.

- [x] **SEO optimisé (metadata dynamiques)**
  - Fait : SEO avec lighthouse score de 100/100.