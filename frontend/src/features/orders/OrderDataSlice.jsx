import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    order: null,  
};

const OrderDataSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrder: (state, action) => {
            state.order = action.payload; 
        },
       
    },
});

export const { setOrder } = OrderDataSlice.actions;

export default OrderDataSlice.reducer;
