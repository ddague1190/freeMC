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
 * Fetch all customers
*/

export const fetchAllCustomers = createAsyncThunk(
    `${FeatureKey.CUSTOMERS}/fetchAll`,
    async (customer: Customer, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
        const url = `/api/customers`
        try {
            const response = await axios.post(url)
            // if (response.status !== 200) {
            //     return rejectWithValue(`Status code ${response.status}`);
            // }
            return fulfillWithValue(response.data)
        } catch (error) {
            const errData = error.response?.data;
            throw rejectWithValue(errData.message)
        }
    }
)


/**
 * Edit customers
*/

export const editCustomer = createAsyncThunk(
    `${FeatureKey.CUSTOMERS}/edit`,
    async (customer: Customer, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
        const url = `/api/customers`
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
    async (customer: Customer, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
        const url = `/api/customers/`

        try {
            const response = await axios.post(url, { customer }, config)
            if (response.status !== 201) {
                return rejectWithValue(`Status code ${response.status}`);
            }
            console.log(response)
            return fulfillWithValue(response.data)
        } catch (error) {
            const errData = error.response?.data;
            throw rejectWithValue(errData.message)
        }
    }
)

/**
 * Remove customer
*/

export const removeCustomer = createAsyncThunk(
    `${FeatureKey.CUSTOMERS}/delete`,
    async (arg: { id: number }) => {
        const { id } = arg
        const url = `/api/customers`
        await fetch(url, {
            method: "delete",
        })
    }
)
