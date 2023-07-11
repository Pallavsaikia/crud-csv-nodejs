import { Request, Response, NextFunction } from "express";
import { SuccessResponse, StatusCode } from "@pschatapp/response";
import { deleteUserDetailsByIDService, finduserByIDAndUpdateService, getAllUserService, getUserDetailsByIDService, saveUserService } from "../services";




export async function getAllData(req: Request, res: Response, next: NextFunction) {

    const doc = await getAllUserService()
    if (doc.error) {
        return next(doc.error)
    }

    return new SuccessResponse(res, {
        data: { user: doc.data! },
        message: "successfully fetched", statuscode: StatusCode._200


    })
}

export async function getUserDataByID(req: Request, res: Response, next: NextFunction) {
    const doc = await getUserDetailsByIDService(req.params.id)
    if (doc.error) {
        return next(doc.error)
    }
    return new SuccessResponse(res, {
        data: { user: doc.data! },
        message: "successfully fetched", statuscode: StatusCode._200


    })
}
export async function deleteDataByID(req: Request, res: Response, next: NextFunction) {
    const doc = await deleteUserDetailsByIDService(req.params.id)
    if (doc.error) {
        return next(doc.error)
    }
    return new SuccessResponse(res, {
        data: { user: doc.data! },
        message: "successfully deleted", statuscode: StatusCode._200


    })
}

export async function updateDataByID(req: Request, res: Response, next: NextFunction) {
    const { email, lastname, firstname, isadult, age } = req.body
    console.log(isadult)
    const doc = await finduserByIDAndUpdateService({
        email: email,
        lastname: lastname,
        firstname: firstname,
        _id: req.params.id,
        age: age,
        isAdult: isadult
    })
    if (doc.error) {
        return next(doc.error)
    }
    return new SuccessResponse(res, {
        data: { user: doc.data! },
        message: "successfully updated", statuscode: StatusCode._200


    })
}

export async function addData(req: Request, res: Response, next: NextFunction) {
    const { email, lastname, firstname, isadult, age } = req.body
    const doc = await saveUserService({ email, lastname, firstname, isAdult: isadult, age })
    if (doc.error) {
        return next(doc.error)
    }
    return new SuccessResponse(res, {
        data: { user: doc.data! },
        message: "successfully added", statuscode: StatusCode._201


    })
}