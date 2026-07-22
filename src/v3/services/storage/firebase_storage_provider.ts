import { getStorage } from 'firebase-admin/storage';
import { StorageProvider, StoredFileMetadata } from './storage_provider.js';

export class FirebaseStorageProvider implements StorageProvider {
	async save(path: string, data: string, options?: { contentType?: string }): Promise<void> {
		const storageBucket = getStorage().bucket();
		const file = storageBucket.file(path);

		await file.save(data, { metadata: { contentType: options?.contentType } });
	}

	async exists(path: string): Promise<boolean> {
		const storageBucket = getStorage().bucket();
		const file = storageBucket.file(path);

		const [fileExist] = await file.exists();

		return fileExist;
	}

	async download(path: string): Promise<Buffer> {
		const storageBucket = getStorage().bucket();
		const file = storageBucket.file(path);

		const [contents] = await file.download();

		return contents;
	}

	async getMetadata(path: string): Promise<StoredFileMetadata> {
		const storageBucket = getStorage().bucket();
		const file = storageBucket.file(path);

		const [metadata] = await file.getMetadata();

		return metadata as StoredFileMetadata;
	}

	async deleteByPrefix(prefix: string): Promise<void> {
		const storageBucket = getStorage().bucket();
		await storageBucket.deleteFiles({ prefix, force: true });
	}
}
