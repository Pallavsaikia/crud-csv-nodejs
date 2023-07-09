import { Response, Request, NextFunction } from "express";
import { ErrorResponse, StatusCode } from  "@pschatapp/response";

import {
    DBConflictError,
    DBConnectionError,
    PageNotFoundError,
    UnAuthorizedError,
} from "../errors";

import { RequestValidationError } from "../../../validations";

export const ErrorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
   

    if (err instanceof UnAuthorizedError) {
        const formattedErrors = err.errors.map(error => {
            return { message: error.msg as string, field: error.param }
        })
        return new ErrorResponse(res, {
            error: formattedErrors,
            message: err.reason,
            statuscode: err.status,
            __t: null
        })
    }
    if (err instanceof RequestValidationError) {
        
        const formattedErrors = err.errors.map(error => {
            return { message: error.msg as string, field: error.param }
        })
        return new ErrorResponse(res, {
            error: formattedErrors,
            message: err.reason,
            statuscode: err.status,
            __t: null
        })
    }

    if (err instanceof DBConnectionError) {
        return new ErrorResponse(res, {
            error: [{ message: err.reason, field: "database" }],
            message: err.reason,
            statuscode: err.status,
            __t: null
        })
    }

    if (err instanceof PageNotFoundError) {
        return new ErrorResponse(res, {
            error: [{ message: err.reason, field: "url" }],
            message: err.reason,
            statuscode: err.status,
            __t: null
        })
    }

    if (err instanceof DBConflictError) {
        const formattedErrors = err.errors.map(error => {
            return { message: error.msg, field: error.param }
        })
        return new ErrorResponse(res, {
            error: formattedErrors,
            message: err.reason,
            statuscode: err.status,
            __t: null
        })
    }

    new ErrorResponse(res, {
        error: [{ message: "something went wrong", field: err.name }],
        // message: "something went wrong",
        message: err.message,
        statuscode: StatusCode.server_error,
        __t: null
    })
}