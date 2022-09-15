import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FeatureKey} from "../featureKey";
import {RootState} from "../reducers";


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
export type CustomerDetailState = any;



export const initialState: CustomerDetailState = {

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

