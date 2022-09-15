import { ActionReducerMapBuilder, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getBikeDetailAction, editBikeDetailAction } from "./action";
import { initialState, CustomerBikeDetailState } from "./state";
import { RootState } from "../reducers";

/**
 * TODO reducer
 */

export const customerBikeDetailSlice = createSlice({
    name: 'customerBikeDetails',
    initialState,
    reducers: {

    },
    extraReducers: (builder: ActionReducerMapBuilder<CustomerBikeDetailState>) =>
        builder
            .addCase(getBikeDetailAction.pending, (state: CustomerBikeDetailState, action: PayloadAction<CustomerBikeDetailState>) => {
                return {isFetching: true, success: null }
            })
            .addCase(getBikeDetailAction.fulfilled, (state: CustomerBikeDetailState, action: PayloadAction<CustomerBikeDetailState>) => {
                return { ...state, ...action.payload, isFetching: false, success: true }
            })
            .addCase(getBikeDetailAction.rejected, (state: CustomerBikeDetailState, action: PayloadAction<CustomerBikeDetailState>) => {
                return { isFetching: false, success: false, errorMessage: action.payload }
            })
            .addCase(editBikeDetailAction.pending, (state: CustomerBikeDetailState, action: PayloadAction<CustomerBikeDetailState>) => {
                return {...state, isFetching: true, success: null }
            })
            .addCase(editBikeDetailAction.fulfilled, (state: CustomerBikeDetailState, action: PayloadAction<CustomerBikeDetailState>) => {
                return { ...state, ...action.payload, isFetching: false, success: true }
            })
            .addCase(editBikeDetailAction.rejected, (state: CustomerBikeDetailState, action: PayloadAction<CustomerBikeDetailState>) => {
                return { isFetching: false, success: false, errorMessage: action.payload }
            })
})

export const customerBikeDetailReducer = customerBikeDetailSlice.reducer

export const customerBikeDetailSelector = (state: RootState): CustomerBikeDetailState => state.customerBikeDetail


