import { createSlice, PayloadAction, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { FeatureKey } from "../featureKey";
import { RootState } from "../reducers";
import { StoreInfoState } from "../store-info/state";
import { editStoreInfoAction } from "../store-info/action";
/**
 * Payload
 */
export type NotificationPayload = {
    messageNotification: string,
    showNotification: boolean
}

/**
 * State
 */
export type NotificationState = {
    messageNotification: string,
    showNotification: boolean
}

const initialState: NotificationState = {
    messageNotification: '',
    isShownNotification: false
}

/**
 * Slice
 * @see https://redux-toolkit.js.org/api/createslice
 */
const slice = createSlice({
    name: FeatureKey.NOTIFICATION,
    initialState,
    reducers: {
        hideNotification: (
            state: NotificationState,
            action: PayloadAction<NotificationPayload>
        ): NotificationState => initialState,
        showNotification: (
            state: NotificationState,
            action: PayloadAction<NotificationPayload>
        ): NotificationState => {
            return {
                messageNotification: action.payload,
                isShownNotification: true
            }
        }
    },
    extraReducers: (builder : ActionReducerMapBuilder<any>) => {
        builder
        .addCase(editStoreInfoAction.fulfilled, (state: StoreInfoState, action: PayloadAction<StoreInfoState>) => { 
            return {
                messageNotification: 'Update successful',
                isShownNotification: true
            }
        })
    }
})

/**
 * Reducer
 */
export const notificationReducer = slice.reducer

/**
 * Action
 */
export const { showNotification, hideNotification } = slice.actions

/**
 * Selector
 * @param state PageStateType
 */
export const notificationSelector = (state: RootState): NotificationState => state.notification
