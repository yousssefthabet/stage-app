import { isBackEndError, isBackEndErrors } from "./utils";

export class BackEndApiError extends Error {
  public statusCode?: number;
  public error?: string;

  constructor(public originalError: unknown) {
    // 1) build message
    const message = isBackEndError(originalError)
      ? originalError.message
      : "Unknown error";
    super(message);

    // 2) restore the prototype chain
    Object.setPrototypeOf(this, BackEndApiError.prototype);

    this.name = "BackEndApiError";
    if (isBackEndError(originalError)) {
      this.statusCode = originalError.statusCode;
      this.error = originalError.error;
    }
  }
}

export class BackEndApiErrors extends Error {
  public statusCode?: number;
  public errors?: { field: string; errors: string[] }[];

  constructor(public originalError: unknown) {
    const message = isBackEndErrors(originalError)
      ? originalError.message
      : "Unknown error";
    super(message);

    Object.setPrototypeOf(this, BackEndApiErrors.prototype);

    this.name = "BackEndApiErrors";
    if (isBackEndErrors(originalError)) {
      this.statusCode = originalError.statusCode;
      this.errors = originalError.errors;
    }
  }
}
