export type StoredFileMetadata = {
	updated?: string;
	timeCreated?: string;
	[key: string]: unknown;
};

export interface StorageProvider {
	save(path: string, data: string, options?: { contentType?: string }): Promise<void>;

	exists(path: string): Promise<boolean>;

	download(path: string): Promise<Buffer>;

	getMetadata(path: string): Promise<StoredFileMetadata>;

	deleteByPrefix(prefix: string): Promise<void>;
}
