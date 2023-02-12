export type userResponse = {
    email: string,
    token: string
};

export type ErrorObject = {
    statusCode: number;
    message: string;
    type: string;
    errorCode: number
};
