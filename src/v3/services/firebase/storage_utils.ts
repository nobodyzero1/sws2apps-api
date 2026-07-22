import { StorageBaseType } from '../../definition/firebase.js';
import { decryptData, encryptData } from '../encryption/encryption.js';
import { storageProvider } from '../storage/index.js';

const getStoragePath = (options: StorageBaseType): string => {
	const { path, type } = options;

	let destPath = 'v3/';

	if (type === 'congregation') {
		destPath += `congregations/${path}`;
	}

	if (type === 'user') {
		destPath += `users/${path}`;
	}

	if (type === 'api') {
		destPath += `api/${path}`;
	}

	return destPath;
};

export const uploadFileToStorage = async (data: string, options: StorageBaseType) => {
	const destPath = getStoragePath(options);

	const encryptedData = encryptData(data);

	await storageProvider.save(destPath, encryptedData, { contentType: 'text/plain' });

	return encryptedData;
};

export const getFileMetadata = async (options: StorageBaseType) => {
	const destPath = getStoragePath(options);

	const fileExist = await storageProvider.exists(destPath);

	if (fileExist) {
		return storageProvider.getMetadata(destPath);
	}
};

export const getFileFromStorage = async (options: StorageBaseType) => {
	const destPath = getStoragePath(options);

	const fileExist = await storageProvider.exists(destPath);

	if (fileExist) {
		const contents = await storageProvider.download(destPath);
		const encryptedData = contents.toString();

		return decryptData(encryptedData);
	}
};

export const deleteFileFromStorage = async (options: StorageBaseType) => {
	if (!options.path || options.path.length === 0) return;

	const destPath = getStoragePath(options);

	await storageProvider.deleteByPrefix(destPath);
};
