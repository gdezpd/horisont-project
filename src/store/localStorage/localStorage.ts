import { LOCAL_STORAGE_KEY } from "./types"
import { CommentType } from "../api";

export const loadState = () => {
    try {
        const persistedTodoString = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (persistedTodoString === null) return undefined
        return { comments: JSON.parse(persistedTodoString) }
    } catch (err) {
        return undefined
    }
}

export const saveState = (stateName: string = "", state?: CommentType[]) => {
    try {
        if (state?.length === 0) {
            return
        }
        const serializedState = JSON.stringify(state)
        localStorage.setItem(stateName, serializedState)
    } catch {
        // ignore write errors
    }
}
