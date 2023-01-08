import { useCallback } from "react"

const useLocalStorage = () => {
    
    const setItem = useCallback((key: string, item: any) => {
        localStorage.setItem(key, JSON.stringify(item))
    }, [])

    const getItem = useCallback((key: string) => {
        return JSON.parse(localStorage.getItem(key) || "[]")
    }, [])

    return { getItem, setItem }
}

export default useLocalStorage
