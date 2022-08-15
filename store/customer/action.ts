import { createAsyncThunk } from "@reduxjs/toolkit"
import { Customer } from "./state";
import { FeatureKey } from "../featureKey";
import axios from 'axios';


const config = {
    headers: {
        "Content-type": "application/json",
    },
};


/**
 * Edit customers
*/

export const editCustomer = createAsyncThunk(
    `${FeatureKey.CUSTOMERS}/edit`,
    async (customer: Customer, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {

        const url = `/api/store-info/`
        try {
            const response = await axios.patch(url, { customer }, config)
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
 * Add customer
*/

export const addCustomer = createAsyncThunk(
    `${FeatureKey.CUSTOMERS}/add`,
    async (arg: { todo: Todo }) => {
        const { todo } = arg
        const url = `/api/todo`
        const result: Todo = await fetch(url, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(todo),
        }).then((response: Response) => response.json())
        return { todo: result }
    }
)

/**
 * Remove customer
*/

export const removeCustomer = createAsyncThunk(
    `${FeatureKey.CUSTOMERS}/delete`,
    async (arg: { id: number }) => {
        const { id } = arg
        const url = `/api/todo/${id}`
        await fetch(url, {
            method: "delete",
        })
    }
)
