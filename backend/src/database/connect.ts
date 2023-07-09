import fs from 'fs'
import { DatabaseResourseError } from './errors'
import AsyncLock from 'async-lock';


class DB {
    private baselocation?: string
    lock: AsyncLock
    constructor() {
        this.lock = new AsyncLock();
    }
    
    getBaselocation() {
        if (!this.baselocation) {
            throw new DatabaseResourseError("db connection required")
        }
        return this.baselocation
    }
    connect(baselocation: string) {
        this.baselocation = baselocation
        if (!fs.existsSync(this.baselocation)) {
            fs.mkdirSync(this.baselocation);
        }
        
    }
}


export const DBConnect = new DB()