import {
  configureStore,
  EnhancedStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper"
import { Env } from "../constants/Env";
import { rootReducer, RootState } from "./reducers";

const middlewares = [...getDefaultMiddleware<RootState>()]

const reducer = (state: ReturnType<typeof rootReducer>, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

// const store = configureStore({
//   reducer: reducer,
//   middleware: middlewares,
//   devTools: Env.NODE_ENV === "development",
// })

export const makeStore = () => configureStore({
  reducer: reducer,
  middleware: middlewares,
  devTools: Env.NODE_ENV === "development"
})


// export const makeStore: MakeStore = (_?: RootState): EnhancedStore => store

type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper(makeStore, { debug: true });


// import userSlice from './slices/userSlice';
// import {
//   useDispatch as useDispatchBase,
//   useSelector as useSelectorBase,
// } from 'react-redux';

// /**
//  * Creates a store and includes all the slices as reducers.
//  */
// export const store = configureStore({
//   reducer: {
//     user: userSlice,
//   },
// });

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;

// // Inferred type: { users: UsersState}
// type AppDispatch = typeof store.dispatch;

// // Since we use typescript, lets utilize `useDispatch`
// export const useDispatch = () => useDispatchBase<AppDispatch>();

// // And utilize `useSelector`
// export const useSelector = <TSelected = unknown>(
//   selector: (state: RootState) => TSelected
// ): TSelected => useSelectorBase<RootState, TSelected>(selector);