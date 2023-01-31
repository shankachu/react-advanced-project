import { useEffect, useState } from "react"

// we check the type of the function
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

    // everytime we change it, we update it
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return [value, setValue] as [T, typeof setValue]
}

export default useLocalStorage
