import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeatureKey } from "../featureKey";
import { RootState } from "../reducers";

/**
 * Payload
 */
export type UserInfoPayload = {
    id: string,
    firstName: string,
    lastName: string,
    admin: boolean
}

/**
 * State
 */
export type UserInfoState = {
    id: string,
    firstName: string,
    lastName: string,
    admin: boolean
}

const initialState: UserInfoState = {
    id: '',
    firstName: '',
    lastName: '',
    admin: ''
}

/**
 * Slice
 * @see https://redux-toolkit.js.org/api/createslice
 */
const slice = createSlice({
    name: FeatureKey.USERINFO,
    initialState,
    reducers: {
        clearUserInfo: (
            state: UserInfoState,
            action: PayloadAction<UserInfoPayload>
        ): UserInfoState => initialState,
        setUserInfo: (
            state: UserInfoState,
            action: PayloadAction<UserInfoPayload>
        ): UserInfoState => action.payload
    },
})

/**
 * Reducer
 */
export const userInfoReducer = slice.reducer

/**
 * Action
 */
export const { clearUserInfo, setUserInfo } = slice.actions

/**
 * Selector
 * @param state UserInfoStateType
 */
export const userInfoSelector = (state: RootState): UserInfoState => state.userInfo
