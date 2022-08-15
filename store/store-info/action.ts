import { createAsyncThunk } from "@reduxjs/toolkit"
import { StoreInfoState, StoreInfoPayload } from "./state";
import { FeatureKey } from "../featureKey"
import axios from 'axios';


const config = {
    headers: {
        "Content-type": "application/json",
    },
};

/**
 * Fetch todo action
 */
// export const fetchTodoAction = createAsyncThunk(
//   `${FeatureKey.STOREINFO}/fetch`,
//   async (arg: { id: number }) => {
//     const { id } = arg
//     const url = `/api/todo/${id}`
//     const result: Todo = await fetch(url, {
//       method: "get",
//     }).then((response: Response) => response.json())
//     return { todo: result }
//   }
// )


/**
 * Edit todo action
 */
export const editStoreInfoAction = createAsyncThunk(
    `${FeatureKey.STOREINFO}/edit`,
    async (storeInfo: StoreInfoPayload, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
        const url = `/api/store-info/`
        try {
            const response = await axios.patch(url, { storeInfo }, config)
            if (response.status !== 200) {
                return rejectWithValue(`Status code ${response.status}`);
            }
            return fulfillWithValue(response.data)
        } catch (error) {
            const errData = error.response?.data;
            throw rejectWithValue(errData.message)
        }
    }
)


