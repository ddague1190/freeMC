import { combineReducers } from "redux"
import { todoReducer } from "./todo/reducer";
import { notificationReducer } from "./notification/notification";
import { userInfoReducer } from "./user-info/user-info";
import { adminRouteReducer } from "./admin-route/admin-route";
import { storeInfoReducer } from "./store-info/reducer";
import { customersReducer } from "./customer/reducer";
import { customerDetailReducer } from "./customer-detail/reducer";
import { customerBikesReducer } from "./customer-bikes/reducer";
import { customerBikeDetailReducer } from "./bike-detail/reducer";

export const rootReducer = combineReducers({
    adminRoute: adminRouteReducer,
    userInfo: userInfoReducer,
    notification: notificationReducer,
    storeInfo: storeInfoReducer,
    customers: customersReducer,
    customerDetail: customerDetailReducer, 
    customerBikes: customerBikesReducer,
    customerBikeDetail: customerBikeDetailReducer
})

export type RootState = ReturnType<typeof rootReducer>

