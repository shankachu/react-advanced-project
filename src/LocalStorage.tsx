import { useState } from "react"

function useLocalStorage<T>(key: string, initialValue: T | (() => T)){
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue == null) {
            if (typeof jsonValue === 'function') {
                return (initialValue as () => T)()
            } else {
                return initialValue
            }
        } else {
            return JSON.parse(jsonValue)
        }
    })

    return [value, setValue] as [T, typeof setValue]
}

export default useLocalStorage
