import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { root } from "./slice/sliceRoot";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { loadState, saveState } from "./localStorage/localStorage";
import { comments } from "./slice/comentsSlice";
import { LOCAL_STORAGE_KEY } from "./localStorage/types";

export const rootReducer = combineReducers({
    root,
    comments
})

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: loadState()
})

store.subscribe(() => {
    // @ts-ignore
    store.getState().comments && saveState(LOCAL_STORAGE_KEY, store.getState().comments)
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
