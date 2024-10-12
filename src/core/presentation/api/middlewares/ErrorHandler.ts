import { Request, Response, NextFunction } from 'express'; // import: express 4.18.2
import { Error } from '../../../domain/common/Error'; // import: src/core/domain/common/Error.ts
import { Result } from '../../../domain/common/Result'; // import: src/core/domain/common/Result.ts

export class ErrorHandler {
  // Define a method to handle errors thrown by API routes
  handle(err: Error, req: Request, res: Response, next: NextFunction) {
    // If the error is a Result.Err object, handle it accordingly
    if (err.isOk === false) {
      return res.status(400).json({ message: err.error?.message });
    }
    // If the error is a general Error object, log it and send a 500 error
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}