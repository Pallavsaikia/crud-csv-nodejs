export class DatabaseResourseError extends Error {
    reason = "could not connect to database"
    constructor(error?: string) {
        super()
        if (error) {
            this.reason = error
        }
        Object.setPrototypeOf(this, DatabaseResourseError.prototype)
    }
}