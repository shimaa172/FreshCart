import { configureStore } from "@reduxjs/toolkit";
import { brandReducer } from "./brandsSlice";

export let store = configureStore({
    reducer:{
        // waitting reducer
        brand:brandReducer
        }
})