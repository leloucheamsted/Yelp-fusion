# Configuration des Variables d'Environnement

## Fichiers de Configuration

- `.env` - Configuration locale (ignoré par Git)
- `.env.example` - Template des variables disponibles
- `.env.production` - Configuration pour la production

## Variables Disponibles

### REACT_APP_API_BASE_URL
- **Description** : URL de base de l'API backend PHP
- **Défaut** : `http://localhost:8001`
- **Exemple** : `https://api.mondomaine.com`

### REACT_APP_API_TIMEOUT
- **Description** : Timeout des requêtes HTTP en millisecondes
- **Défaut** : `30000` (30 secondes)
- **Exemple** : `15000` (15 secondes)

### REACT_APP_ENVIRONMENT
- **Description** : Environnement de l'application
- **Valeurs** : `development`, `production`, `test`
- **Défaut** : `development`

## Installation

1. Copiez le fichier exemple :
   ```bash
   cp .env.example .env
   ```

2. Modifiez les valeurs selon votre configuration :
   ```bash
   nano .env
   ```

3. Redémarrez l'application React :
   ```bash
   npm start
   ```

## Notes Importantes

- Les variables d'environnement React doivent commencer par `REACT_APP_`
- Le fichier `.env` est ignoré par Git pour la sécurité
- Les modifications nécessitent un redémarrage du serveur de développement