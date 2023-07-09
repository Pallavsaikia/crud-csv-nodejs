import * as fs from 'fs';
import * as csv from 'fast-csv';

export async function checkFileExist(filePath: string): Promise<boolean> {
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
    return true
  } catch (err) {
    return false
  }
}

export enum WriteType {
  write = "w",
  append = "a"
}

export class FileIO {
  static WriteTOFile<U>(filepath: string, data: U[], writeType: WriteType, beforeWrite: (data: U[]) => void) {
    const promise = new Promise<U[]>((resolve, reject) => {
      try {
        const csvStream = csv.format({ headers: false });
        const writableStream = fs.createWriteStream(filepath, { flags: writeType });
        writableStream.write('\n');
        csvStream.pipe(writableStream);
        beforeWrite(data)
        for (let i = 0; i < data.length; i++) {
          csvStream.write(data[i]);
          writableStream.write('\n');
        }

        csvStream.end(() => {
          console.log(data)
          resolve(data)
        });
      } catch (e) {
        reject(e)
      }

    })
    return promise
  }
}

