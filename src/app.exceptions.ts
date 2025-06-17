export class TransactionError extends Error {
  constructor(message: string = '') {
    super(message);
    this.name = 'TransactionError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TransactionError);
    }
  }
}
