import { useEffect, useState } from 'react'

const TIME_TO_REQUEST = 500

export const useDebounce = <T>(value: T, delay = TIME_TO_REQUEST): T => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedValue
}
