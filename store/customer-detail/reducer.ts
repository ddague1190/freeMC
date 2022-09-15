import { ActionReducerMapBuilder, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCustomerDetailAction, editCustomerDetailAction } from "./action";
import { initialState, CustomerDetailState } from "./state";

/**
 * TODO reducer
 */

export const customerDetailSlice = createSlice({
    name: 'customerDetail',
    initialState,
    reducers: {

    },
    extraReducers: (builder: ActionReducerMapBuilder<CustomerDetailState>) =>
        builder
            .addCase(fetchCustomerDetailAction.pending, (state: CustomerDetailState, action: PayloadAction<CustomerDetailState>) => {
                return { ...state, isFetching: true, success: null }
            })
            .addCase(fetchCustomerDetailAction.fulfilled, (state: CustomerDetailState, action: PayloadAction<CustomerDetailState>) => {
                return { ...state, ...action.payload, isFetching: false, success: true }
            })
            .addCase(fetchCustomerDetailAction.rejected, (state: CustomerDetailState, action: PayloadAction<CustomerDetailState>) => {
                return { ...state, isFetching: false, success: false, errorMessage: action.payload }
            })
            .addCase(editCustomerDetailAction.pending, (state: CustomerDetailState, action: PayloadAction<CustomerDetailState>) => {
                return { ...state, isFetching: true, success: null }
            })
            .addCase(editCustomerDetailAction.fulfilled, (state: CustomerDetailState, action: PayloadAction<CustomerDetailState>) => {
                return { ...state, ...action.meta.arg.values, isFetching: false, success: true }
            })
            .addCase(editCustomerDetailAction.rejected, (state: CustomerDetailState, action: PayloadAction<CustomerDetailState>) => {
                return { ...state, isFetching: false, success: false, errorMessage: action.payload }
            })
})

export const customerDetailReducer = customerDetailSlice.reducer

export const customerDetailSelector = (state: RootState): CustomerDetailState => state.customerDetail


