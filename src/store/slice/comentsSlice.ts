import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { CommentType } from "../api";


const commentsSlice = createSlice(
    {
        name: 'commentsSlice',
        initialState: [] as CommentType[],
        reducers: {
            addComment: (state, action: PayloadAction<CommentType>) => {
             return  state = [...state, { ...action.payload }]

            },
        },
    }
)

//
export const {
    addComment
} = commentsSlice.actions

export const comments = commentsSlice.reducer
