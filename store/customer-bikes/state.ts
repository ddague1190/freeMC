import { Address } from '../store-info/state';
import { createEntityAdapter, EntityState } from "@reduxjs/toolkit"


export interface Bike {
    id: number;
    model: string;
    color: string;
    mileage: number;
    estimatedValue: number;
    description: string;
}

export type _CustomerBikesState = {
    customers: Bike[]
}
export interface CustomerBikesState extends EntityState<_CustomerBikesState> {
    isFetching: boolean;
    errorMessage: string;
    success: boolean | null;
    selectedId: number | null;
}


export const customerBikesAdapter = createEntityAdapter<Customer>({
    selectId: (bike: CustomerBikesState) => bike.id
})

export const initialState: CustomerBikesState = customerBikesAdapter.getInitialState({
    isFetching: false,
    success: null,
    errorMessage: ""
})
