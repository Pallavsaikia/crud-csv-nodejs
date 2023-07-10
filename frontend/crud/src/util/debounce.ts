export function debounce(cb: (...args: any) => void, delay = 500) {
    let timeout: any
    return (...args: any) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            cb(...args)
        }, delay)
    }
}