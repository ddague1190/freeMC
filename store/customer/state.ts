import { Address } from '../store-info/state';
import { createEntityAdapter, EntityState } from "@reduxjs/toolkit"


export interface Customer {
    identifier: number;
    name: string;
    address: Address;
    phone: string;
}

export type _CustomerState = {
    customers: Customer[]
}
export interface CustomerState extends EntityState<_CustomerState> {
    isFetching: boolean;
    errorMessage: string;
    success: boolean | null;
    selectedId: number | null;
    nextCustomerIdentifier: number;
}


export const customersAdapter = createEntityAdapter<Customer>({
    selectId: (customer: Customer) => customer.identifier
})

export const initialState: CustomerState = customersAdapter.getInitialState({
    isFetching: false,
    selectedId: null,
    success: null,
    errorMessage: "",
})
