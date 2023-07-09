import { body } from "express-validator";

export const createOUpdateValidationSchema = [
    body('email').isEmail().normalizeEmail().withMessage('Invalid Email').exists().escape(),
    body('firstname')
        .isLength({ min: 4 })
        .withMessage('firstname must be at least 4 chars long')
        .isLength({ max: 12 })
        .withMessage(' firstname must be less than 12 chars long')
        .exists()
        .withMessage('firstname is required')
        .trim()
        .matches(/^[A-Za-z\_]+$/)
        .withMessage('firstname must be alphabet only')
        .escape(),
    body('lastname')
        .isLength({ min: 4 })
        .withMessage('lastname must be at least 4 chars long')
        .isLength({ max: 12 })
        .withMessage(' lastname must be less than 12 chars long')
        .exists()
        .withMessage('lastname is required')
        .trim()
        .matches(/^[A-Za-z\_]+$/)
        .withMessage('lastname must be alphabet only')
        .escape(),
    body('age')
        .isNumeric()
        .withMessage('age must be a number')
        .exists()
        .withMessage('age is required')
        .escape(),
     body('isadult')
        .isBoolean()
        .withMessage('must be true or false')
        .exists()
        .withMessage('isadult is required')
        .escape()
]