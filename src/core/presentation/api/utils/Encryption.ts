import { EncryptionAlgorithm } from '../../../domain/common/EncryptionAlgorithm'; // import: src/core/domain/common/EncryptionAlgorithm.ts
import { Result } from '../../../domain/common/Result'; // import: src/core/domain/common/Result.ts
import { Error } from '../../../domain/common/Error'; // import: src/core/domain/common/Error.ts
import { EncryptionConfig } from '../../../infrastructure/database/config'; // import: src/core/infrastructure/database/config.ts
import crypto from 'crypto'; // import: crypto

export class EncryptionService {
  private algorithm: EncryptionAlgorithm;
  private secretKey: string;

  constructor(config: EncryptionConfig) {
    this.algorithm = config.algorithm;
    this.secretKey = config.secretKey;
  }

  async encrypt(data: string): Promise<Result<string>> {
    try {
      const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, '');
      const encrypted = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
      return Result.Ok(encrypted);
    } catch (error) {
      return Result.Err(new Error('Encryption failed: ' + error));
    }
  }

  async decrypt(data: string): Promise<Result<string>> {
    try {
      const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, '');
      const decrypted = decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
      return Result.Ok(decrypted);
    } catch (error) {
      return Result.Err(new Error('Decryption failed: ' + error));
    }
  }
}