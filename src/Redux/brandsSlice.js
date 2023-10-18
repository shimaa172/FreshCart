import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export let getBrands = createAsyncThunk('brandsSlice/getBrands',
    async () => {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
        return data
    }
)
let initialState = { brands: [], loading: false }

let brandsSlice = createSlice({
    name: 'brandsSlice',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getBrands.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getBrands.fulfilled, (state, action) => {
            state.loading = false;
            state.brands = action.payload.data
        })
    }
})
export let brandReducer = brandsSlice.reducer