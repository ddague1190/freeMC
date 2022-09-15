import { ActionReducerMapBuilder, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./state";
import { FeatureKey } from "../featureKey";
import { CustomerState, customersAdapter } from "./state";
import { editCustomer, addCustomer, removeCustomer, fetchAllCustomers } from "./action";
import { RootState } from "../reducers";

export const customersSlice = createSlice({
    name: FeatureKey.CUSTOMERS,
    initialState,
    reducers: {
        setCustomers(state, action) {
            customersAdapter.setAll(state, action.payload)
        },
        setSelectedId(state, action) {
            console.log(action.payload)
            return { ...state, selectedId: action.payload }
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<CustomerState>) =>
        builder
            .addCase(fetchAllCustomers.pending, (state) => {
                return { ...state, isFetching: true, success: null }
            })
            .addCase(fetchAllCustomers.fulfilled, (state, action) => {
                const { customers } = action.payload;
                return customersAdapter.setAll({ ...state, isFetching: false, success: true }, customers)
            })
            .addCase(fetchAllCustomers.rejected, (state) => {
                console.log('rejectedfetchall')
                return { ...state, isFetching: false, success: false }
            })
            //-------------------------------------------------------------------------------
            .addCase(editCustomer.pending, (state, action) => {
                const { todo } = action.meta.arg
                return { ...state, isFetching: true, success: null, selectedId: todo?.id }
            })
            .addCase(editCustomer.fulfilled, (state, action) => {
                return customersAdapter.updateOne({ ...state, isFetching: false, success: true }, action.payload)
            })
            .addCase(editCustomer.rejected, (state) => {
                return { ...state, isFetching: false, success: false }
            })
            //-------------------------------------------------------------------------------
            .addCase(addCustomer.pending, (state, action) => {

                return { ...state, isFetching: true, success: null, selectedId: action.payload?.id }
            })
            .addCase(addCustomer.fulfilled, (state, action) => {
                return customersAdapter.addOne(
                    { ...state, isFetching: false, success: true },
                    {
                        id: action.payload.id,
                        changes: action.payload,
                    }
                )
            })
            .addCase(addCustomer.rejected, (state) => {
                return { ...state, isFetching: false, success: false }
            })
            //-------------------------------------------------------------------------------
            .addCase(removeCustomer.pending, (state, action) => {
                const { id } = action.meta.arg
                return { ...state, isFetching: true, selectedId: id }
            })
            .addCase(removeCustomer.fulfilled, (state, action) => {
                const { id } = action.meta.arg
                return customersAdapter.removeOne({ ...state, isFetching: false }, id)
            })
            .addCase(removeCustomer.rejected, (state) => {
                return { ...state, isFetching: false }
            })
})

export const customersSelector = (state: RootState): CustomerState => state.customers
export const customersReducer = customersSlice.reducer;
export const { setCustomers, setSelectedId } = customersSlice.actions
