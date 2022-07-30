import { combineReducers } from "redux"
import { todoReducer } from "./todo/reducer";
import { notificationReducer } from "./notification";

export const rootReducer = combineReducers({
    todo: todoReducer,
    notification: notificationReducer
})

export type RootState = ReturnType<typeof rootReducer>

