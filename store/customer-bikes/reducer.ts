import { ActionReducerMapBuilder, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./state";
import { FeatureKey } from "../featureKey";
import { CustomerBikesState, customerBikesAdapter } from "./state";
import { editCustomerBikes, fetchAllCustomersBikes, addCustomerBikes, removeCustomerBikes } from "./action";
import { RootState } from "../reducers";

export const customerBikesSlice = createSlice({
    name: FeatureKey.CUSTOMERBIKES,
    initialState,
    reducers: {
        setCustomerBikes(state, action) {
            customerBikesAdapter.setAll(state, action.payload)
        },
        setSelectedBike(state, action) {
            return { ...state, selectedId: action.payload }
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<CustomerBikesState>) =>
        builder
            .addCase(fetchAllCustomersBikes.pending, (state) => {
                return { ...state, isFetching: true, success: null }
            })
            .addCase(fetchAllCustomersBikes.fulfilled, (state, action) => {

                return customerBikesAdapter.setAll({ ...state, isFetching: false, success: true }, action.payload)
            })
            .addCase(fetchAllCustomersBikes.rejected, (state, action) => {

                return { ...state, isFetching: false, success: false, errorMessage: action.payload }
            })
            //-------------------------------------------------------------------------------
            .addCase(editCustomerBikes.pending, (state, action) => {
                const { todo } = action.meta.arg
                return { ...state, isFetching: true, success: null, selectedId: todo?.id }
            })
            .addCase(editCustomerBikes.fulfilled, (state, action) => {
                return customerBikesAdapter.updateOne({ ...state, isFetching: false, success: true }, action.payload)
            })
            .addCase(editCustomerBikes.rejected, (state) => {
                return { ...state, isFetching: false, success: false }
            })
            //-------------------------------------------------------------------------------
            .addCase(addCustomerBikes.pending, (state, action) => {

                return { ...state, isFetching: true, success: null, selectedId: action.payload?.id }
            })
            .addCase(addCustomerBikes.fulfilled, (state, action) => {

                return customerBikesAdapter.addOne(
                    { ...state, isFetching: false, success: true },
                    {
                        id: action.payload.id,
                        changes: action.payload,
                    }
                )
            })
            .addCase(addCustomerBikes.rejected, (state) => {
                return { ...state, isFetching: false, success: false }
            })
            //-------------------------------------------------------------------------------
            .addCase(removeCustomerBikes.pending, (state, action) => {
                const { id } = action.meta.arg
                return { ...state, isFetching: true, selectedId: id }
            })
            .addCase(removeCustomerBikes.fulfilled, (state, action) => {
                const { id } = action.meta.arg
                return customerBikesAdapter.removeOne({ ...state, isFetching: false }, id)
            })
            .addCase(removeCustomerBikes.rejected, (state) => {
                return { ...state, isFetching: false }
            })
})

export const customerBikesSelector = (state: RootState): CustomerBikesState => state.customerBikes
export const customerBikesReducer = customerBikesSlice.reducer;
export const { setCustomerBikes, setSelectedBike } = customerBikesSlice.actions
