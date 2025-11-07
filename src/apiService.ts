import axios from 'axios';
import { APIResponse, SearchParams } from './types';

// Configuration de l'API
const API_BASE_URL = 'http://localhost:8001';

// Instance Axios configurée
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepteur pour gérer les erreurs
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);

        // Gestion spécifique des erreurs réseau
        if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
            // throw new Error('❌ Impossible de se connecter au serveur. Vérifiez que le backend PHP est démarré sur le port 8000.');
        }

        // Gestion des timeouts
        if (error.code === 'ECONNABORTED') {
            throw new Error('⏱️ La requête a pris trop de temps. Veuillez réessayer.');
        }

        // Gestion des erreurs HTTP spécifiques
        if (error.response) {
            const status = error.response.status;
            const data = error.response.data;

            if (status === 404) {
                throw new Error('🔍 Service non trouvé. Vérifiez l\'URL de l\'API.');
            }

            if (status === 500) {
                throw new Error('⚠️ Erreur serveur. Vérifiez la configuration du backend et la clé API Yelp.');
            }

            if (status === 403) {
                throw new Error('🔐 Accès interdit. Vérifiez votre clé API Yelp.');
            }

            if (status === 429) {
                throw new Error('⏳ Trop de requêtes. Attendez quelques secondes avant de réessayer.');
            }

            // Utiliser le message d'erreur du serveur s'il existe
            if (data?.message) {
                throw new Error(`⚠️ ${data.message}`);
            }
        }

        // Erreur générique avec plus de contexte
        if (error.message) {
            throw new Error(`❌ ${error.message}`);
        }

        throw new Error('❌ Une erreur inconnue s\'est produite. Veuillez réessayer.');
    }
);

/**
 * Service pour les appels à l'API
 */
export const apiService = {
    /**
     * Rechercher des entreprises via l'API Yelp
     */
    searchBusinesses: async (params: SearchParams): Promise<APIResponse> => {
        const response = await apiClient.get<APIResponse>('/api.php', {
            params: {
                action: 'search',
                ...params,
            },
        });

        return response.data;
    },

    /**
     * Récupérer les entreprises sauvegardées en base
     */
    getStoredBusinesses: async (limit = 10, offset = 0, search = ''): Promise<APIResponse> => {
        const response = await apiClient.get<APIResponse>('/api.php', {
            params: {
                action: 'businesses',
                limit,
                offset,
                search,
            },
        });

        return response.data;
    },
};

export default apiService;