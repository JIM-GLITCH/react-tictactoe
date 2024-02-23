import { useCallback, useState } from "react"

export function useUpdate() {
    const [,setState] = useState({})
    const update = useCallback(()=>setState({}), [])
    return update ;
}