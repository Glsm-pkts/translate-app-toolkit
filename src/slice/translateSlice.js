import { createSlice } from "@reduxjs/toolkit";
import { translateText } from "../redux/actions";

const initialState = {
    isLoading: false,
    error: null,
    answer:"",

}
const translateSlice = createSlice({
    name: "translate",
    initialState,
    reducers: {},

    extraReducers:(builder)=>{
builder.addCase(translateText.pending,(state)=>{
    state.isLoading = true;
    state.answer = "";
});
builder.addCase(translateText.rejected,(state,action)=>{
    state.isLoading= false;
    state.error= action.error.message;
});
builder.addCase(translateText.fulfilled,(state, action)=>{
    state.isLoading = false;
    state.error = null;
    state.answer = action.payload.translatedText;
    console.log(action);

})
    }
});

export default translateSlice.reducer;