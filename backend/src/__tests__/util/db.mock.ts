import { DBConnect } from "../../database";
import fs from 'fs'
const dbName="mock"
export function startDbConnection() {
    DBConnect.connect(dbName)
}
export function destroyDbConnection() {
    try{
        fs.rmSync(dbName, { recursive: true, force: true });
    }catch{}   
}