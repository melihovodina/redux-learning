import axios from "axios";
import { AppDispatch } from "../store";
import { iUser } from "../../models/iUser";
import { userSlice } from "./userSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

//1 way
// export const fetchUsers = () => async (dispatch: AppDispatch) => {
//     try {
//         dispatch(userSlice.actions.usersFetching())
//         const response = await axios.get<iUser[]>('https://jsonplaceholder.typicode.com/users')
//         dispatch(userSlice.actions.usersFetchingSuccess(response.data))
//     } catch (error: unknown) {
//         if (axios.isAxiosError(error)) {
//             dispatch(userSlice.actions.usersFetchingError(error.message))
//         } else {
//             dispatch(userSlice.actions.usersFetchingError('Unknown error'))
//         }
//     }
// }

//2 way
export const fetchUsers = createAsyncThunk(
    'user/fetchAll',
    async(_, thunkAPI) => {
        try {
            const response = await axios.get<iUser[]>('https://jsonplaceholder.typicode.com/users')
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue("User's fetch is failed")
        }
    }
)