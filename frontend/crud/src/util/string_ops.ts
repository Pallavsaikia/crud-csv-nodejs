export const isStringEmpty = (str:String) =>{
    return (!str || str.length === 0 || str.trim().length === 0);
}