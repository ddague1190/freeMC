import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FeatureKey} from "../featureKey";
import {RootState} from "../reducers";
import { EntityState, EntityId, createEntityAdapter } from "@reduxjs/toolkit";




export interface Jobs {
  active: boolean;
  completed: boolean;
  id: EntityId;
  name: string;
  description: string;
  bikeId: EntityId;
}


export interface Bike {
  model: string;
  id: string;
  store: string;
  customerIdentifier: number;
}






/**
 * State
 */
 export interface CustomerBikeDetailState {
  bike: Bike;
  jobs: EntityState<Jobs>;
};


const jobsAdapter = createEntityAdapter<Jobs>();

export const initialState: CustomerBikeDetailState = {
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

