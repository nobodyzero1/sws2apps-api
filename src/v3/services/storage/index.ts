import { FirebaseStorageProvider } from './firebase_storage_provider.js';
import { StorageProvider, StoredFileMetadata } from './storage_provider.js';

export type { StorageProvider, StoredFileMetadata };

export const storageProvider: StorageProvider = new FirebaseStorageProvider();
