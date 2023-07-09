import express from "express";
import { handle, validateRequestSchema } from '../middleware';
import { addData, deleteDataByID, getAllData, getUserDataByID, updateDataByID } from "../controllers";
import { createOUpdateValidationSchema } from "../validation-schemas";


const router = express.Router()

router.post('/',
    createOUpdateValidationSchema,
    validateRequestSchema,
    handle(addData))


router.get('/', handle(getAllData))
router.get('/:id', handle(getUserDataByID))
router.delete('/:id', handle(deleteDataByID))
router.put('/:id',
    createOUpdateValidationSchema,
    validateRequestSchema,
    handle(updateDataByID))

export { router as crudApi }