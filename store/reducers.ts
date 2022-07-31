import { combineReducers } from "redux"
import { todoReducer } from "./todo/reducer";
import { notificationReducer } from "./notification/notification";
import { userInfoReducer } from "./user-info/user-info";
import { adminRouteReducer } from "./admin-route/admin-route";

export const rootReducer = combineReducers({
    adminRoute: adminRouteReducer,
    userInfo: userInfoReducer,
    notification: notificationReducer
})

export type RootState = ReturnType<typeof rootReducer>

