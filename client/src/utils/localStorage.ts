export function saveToStorage<Data>(key:string, data:Data): void {
    localStorage.setItem(key,JSON.stringify(data))
}
export function getFromStorage(key:string): any{
    return JSON.parse((localStorage.getItem(key)) as string)
}
// export function saveToLocalStorage<Data>(key:string, data:Data): void {
//     localStorage.setItem(key,JSON.stringify(data))
// }