import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeatureKey } from "../featureKey";
import { RootState } from "../reducers";

/**
 * Payload
 */
export type AdminRoutePayload = {
    adminRoute: string,
}

/**
 * State
 */
export type AdminRouteState = {
    adminRoute: string,
}

const initialState: AdminRouteState = {
    adminRoute: 'home',
}

/**
 * Slice
 * @see https://redux-toolkit.js.org/api/createslice
 */
const slice = createSlice({
    name: FeatureKey.NOTIFICATION,
    initialState,
    reducers: {
        changeRoute: (
            state: AdminRouteState,
            action: PayloadAction<AdminRoutePayload>
        ): AdminRouteState => {

            return {
                adminRoute: action.payload,
            }
        },
    }
})

/**
 * Reducer
 */
export const adminRouteReducer = slice.reducer

/**
 * Action
 */
export const { changeRoute } = slice.actions

/**
 * Selector
 * @param state PageStateType
 */
export const adminRouteSelector = (state: RootState): NotificationState => state.adminRoute
