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
 * Fetch customer details action
 */
export const fetchCustomerDetailAction = createAsyncThunk(
    'fetchCustomerDetail',
    async (id: number, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
        const url = `/api/customer-detail/${id}`

        try {
            const response = await axios.get(url);
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



/**
 * Edit customer details action
 */
export const editCustomerDetailAction = createAsyncThunk(
    'editCustomerDetail',
    async ({ id, values }, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
        const url = `/api/customer-detail/${id}`
        try {
            console.log(values, 'inthunk')
            const response = await axios.patch(url, values, config);
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
