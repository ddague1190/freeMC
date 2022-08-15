import { ActionReducerMapBuilder, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./state";
import { FeatureKey } from "../featureKey";
import { CustomerState, customersAdapter} from "./state";
import { editCustomer, addCustomer, removeCustomer } from "./action";

export const customersSlice = createSlice({
    name: FeatureKey.CUSTOMERS,
    initialState,
    reducers: {
        setCustomers(state: StoreInfoState, action: PayloadAction<StoreInfoState>) {
            return { ...state, ...action.payload }
        }
    },
    extraReducers:   (builder: ActionReducerMapBuilder<TodoState>) =>
    builder
      .addCase(editCustomer.pending, (state, action) => {
        const { todo } = action.meta.arg
        return { ...state, isFetching: true, selectedId: todo?.id }
      })
      .addCase(editCustomer.fulfilled, (state, action) => {
        const { todo } = action.payload
        return customersAdapter.updateOne({ ...state, isFetching: false }, todo)
      })
      .addCase(editCustomer.rejected, (state) => {
        return { ...state, isFetching: false }
      })
      //-------------------------------------------------------------------------------
      .addCase(addCustomer.pending, (state, action) => {
        const { todo } = action.meta.arg
        return { ...state, isFetching: true, selectedId: todo?.id }
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        const { todo } = action.payload
        return customersAdapter.addOne(
          { ...state, isFetching: false },
          {
            id: todo.id,
            changes: todo,
          }
        )
      })
      .addCase(addCustomer.rejected, (state) => {
        return { ...state, isFetching: false }
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

export const customersReducer = customersSlice.reducer;
export const customerActions = customersSlice.actions
