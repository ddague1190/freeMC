import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { StoreInfoState } from "./state";




export const storeAdapter = createEntityAdapter<StoreInfoState>({
    selectId: (store: StoreInfoState) => store.id,
})


const initialHours = {
    SUNDAY: [0, 0],
    MONDAY: [0, 0],
    TUESDAY: [0, 0],
    WEDNESDAY: [0, 0],
    THURSDAY: [0, 0],
    FRIDAY: [0, 0],
    SATURDAY: [0, 0],
};

const initialState: StoreInfoStateRedux = storeAdapter.getInitialState({
    isFetching: false,
    success: null,
    companyName: "",
    generalCompanyEmail: "",
    email: "",
    address: {
        name: "",
        streetAddress: "",
        unitNumber: "",
        city: "",
        zip: "",
    },
    hours: initialHours,
    onlineOnly: false,
})
