import { customerBikesAdapter, CustomerBikesState } from "./state";
import { RootState } from "../reducers";

export const customerBikesSelectors = customerBikesAdapter.getSelectors();
