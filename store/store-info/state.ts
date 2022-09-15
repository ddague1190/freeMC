import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeatureKey } from "../featureKey";
import { RootState } from "../reducers";

export enum Days {
  Sunday = 'SUNDAY',
  Monday = 'MONDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY',
  Thursday = 'THURSDAY',
  Friday = 'FRIDAY',
  Saturday = 'SATURDAY',
}

export interface Address {
  name: string;
  streetAddress: string;
  unitNumber: string;
  city: string;
  state: string;
  zip: string;
}

export type DaysString = keyof typeof Days;
// alternative
// type DayHours = Map<DaysString, [number,number]>

export interface DayHours {
  [key: DaysString]: [number, number];
}

/**
 * Payload
 */
export type StoreInfoPayload = {
  id?: string;
  timeZone?: string,
  companyName?: string;
  companyPhone?: string;
  companyEmail?: string;
  address?: Address;
  hours?: DayHours;
  onlineOnly?: boolean;
  errorMessage?: string;
};

/**
 * State
 */
export type StoreInfoState = {
  id: string;
  timeZone: string,
  isFetching: boolean,
  success: boolean | null,
  companyName?: string;
  companyEmail?: string;
  companyPhone?: string;
  address?: Address;
  hours?: DayHours;
  onlineOnly?: boolean;
  errorMessage?: string;

};

export const initialHours = {
  SUNDAY: [0, 0],
  MONDAY: [0, 0],
  TUESDAY: [0, 0],
  WEDNESDAY: [0, 0],
  THURSDAY: [0, 0],
  FRIDAY: [0, 0],
  SATURDAY: [0, 0],
};

export const initialState: StoreInfoState = {
  id: "",
  timeZone: "",
  isFetching: false,
  success: null,
  companyName: "",
  companyEmail: "",
  companyPhone: "",
  address: {
    name: "",
    streetAddress: "",
    unitNumber: "",
    city: "",
    state: "",
    zip: ""
  },
  hours: initialHours,
  onlineOnly: false,
  errorMessage: ''
};

/**
 * Slice
 * @see https://redux-toolkit.js.org/api/createslice
 */
// const slice = createSlice({
//   name: FeatureKey.STOREINFO,
//   initialState,
//   reducers: {
//     setStoreInfo: (
//       state: StoreInfoState,
//       action: PayloadAction<StoreInfoPayload>
//     ): StoreInfoState => {
//       return state;
//     },
//   },
// });

// /**
//  * Reducer
//  */
// export const storeInfoReducer = slice.reducer;

/**
//  * Action
//  */
// export const {setStoreInfo} = slice.actions;

