import { ActionReducerMapBuilder, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { editStoreInfoAction } from "./action";
import { initialState, StoreInfoState } from "./state";

/**
 * TODO reducer
 */

export const storeInfoSlice = createSlice({
    name: 'storeInfo',
    initialState,
    reducers: {
        setStoreInfo(state: StoreInfoState, action: PayloadAction<StoreInfoState>) {
            return { ...state, ...action.payload }
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<StoreInfoState>) =>
        builder
            .addCase(editStoreInfoAction.pending, (state: StoreInfoState, action: PayloadAction<StoreInfoState>) => {
                return { ...state, isFetching: true, success: null }
            })
            .addCase(editStoreInfoAction.fulfilled, (state: StoreInfoState, action: PayloadAction<StoreInfoState>) => {
                return { ...state, ...action.meta.arg, isFetching: false, success: true }
            })
            .addCase(editStoreInfoAction.rejected, (state: StoreInfoState, action: PayloadAction<StoreInfoState>) => {

                return { ...state, isFetching: false, success: false, errorMessage: action.payload }
            })
})

export const storeInfoReducer = storeInfoSlice.reducer

export const storeInfoSelector = (state: RootState): StoreInfoState => state.storeInfo

export const { setStoreInfo } = storeInfoSlice.actions
