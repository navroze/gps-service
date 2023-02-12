import { ErrorObject } from '../types/types';

const errorTypes: Record<string, string> = {
    'INVALID_PASSWORD': 'DATABASE',
    'EMAIL_NOT_FOUND': 'DATABASE'
};

const statusCodes: Record<string, number> = {
    'EMAIL_NOT_FOUND': 404,
    'INVALID_PASSWORD': 403
};

const errorMessages: Record<string, string> = {
    'EMAIL_NOT_FOUND': 'Email not found',
    'INVALID_PASSWORD': 'Invalid password'
};

const errorCodes: Record<string, number> = {
    'EMAIL_NOT_FOUND': 1,
    'INVALID_PASSWORD': 2
};

export function getErrorMessage(error: unknown) {
    if (error instanceof Error) { return error.message; }
    return String(error);
}

export function loggerErrorMessage(error: string) {
    const errorObject: ErrorObject = getErrorDetails(error);
    return `ERROR_TYPE:${errorObject.type} ${errorObject.message}`;
}

export function getErrorDetails(error: string): ErrorObject {
    const errorObject: ErrorObject = {
        statusCode: statusCodes[error],
        message: errorMessages[error],
        type: errorTypes[error],
        errorCode: errorCodes[error]
    };
    return errorObject;
}
