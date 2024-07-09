export const globalError = (res, error) => {
    return res.status(error.status || 500).json({message: error.message, status: error.status || 500});   
}
export class ClientError extends Error {
    constructor(status, message){
        super(status, message)
        this.status = status;
        this.message = message
    }
}

export class ServerError extends Error {
    constructor(message){   
        super(message)
        this.message = message
    }
}