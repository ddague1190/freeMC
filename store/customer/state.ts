import { Address } from '../store-info/state';
import { createEntityAdapter, EntityState } from "@reduxjs/toolkit"


export interface Customer {
    id: string;
    name: string;
    address: Address;
    phone: string;
}

export type _CustomerState = {
    customers: Customer[]
}
export interface CustomerState extends EntityState<_CustomerState> {
    isFetching: boolean
    selectedId: number | null
}


export const customersAdapter = createEntityAdapter<Customer>({
    selectId: (customer: Customer) => customer.id,
})

export const initialState: CustomerState = customersAdapter.getInitialState({
    isFetching: false,
    selectedId: null,
})
