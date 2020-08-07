interface Output {
  key: string;
  bucket: string;
  state: 'SUCCEEDED' | 'FAILED' | 'STARTED' | 'PENDING' | 'CANCELLED';
  output?: object;
  createdAt: string;
}

/**
 * Store a s3 object with the given data.
 */
export function storeOutput (param: Output): Promise<object>

/**
 * Store a kill signal on S3 to cancel the analysis.
 */
export function storeKillSignal (param: Output): Promise<object>

/**
 * Checks if s3 object exists. Rejects promise if not.
 */
export function exists (params: { key: string; bucket: string }): Promise<any>
