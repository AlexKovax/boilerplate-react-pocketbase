import PocketBase from 'pocketbase';

export const PB_URL = import.meta.env.VITE_POCKETBASE_URL || 'http://localhost:8090';
export const pb = new PocketBase(PB_URL);

// Desactiver l'annulation automatique des requetes
pb.autoCancellation(false);
