import { createAsyncThunk } from "@reduxjs/toolkit"
import { CustomerBikesState } from "./state";
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

export const fetchAllCustomersBikes = createAsyncThunk(
    `${FeatureKey.CUSTOMERBIKES}/fetchAll`,
    async (customerIdentifier: number, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {

        const url = `/api/customer-bikes/${customerIdentifier}`
        try {
            const response = await axios.get(url)
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

export const editCustomerBikes = createAsyncThunk(
    `${FeatureKey.CUSTOMERBIKES}/edit`,
    async (customerBike: any, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
        const url = `/api/customer-bikes`
        try {
            const response = await axios.patch(url, { customerBike }, config)
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

export const addCustomerBikes = createAsyncThunk(
    `${FeatureKey.CUSTOMERBIKES}/add`,
    async (customerBike: any, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
        const url = `/api/customer-bikes/${customerBike.customerIdentifier}`

        try {
            const response = await axios.post(url, { customerBike }, config)
            console.log(response)
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
 * Remove customer
*/

export const removeCustomerBikes = createAsyncThunk(
    `${FeatureKey.CUSTOMERBIKES}/delete`,
    async (arg: { id: number }) => {
        const { id } = arg
        const url = `/api/customers`
        await fetch(url, {
            method: "delete",
        })
    }
)
