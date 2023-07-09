export class DataUtil {
    static update<T>(original: any, updates: any): T {
        Object.keys(original).filter(function (itm) {
            if (itm in updates) {
                original[itm] = updates[itm]
            }
        });
        return original
    }

  

}


