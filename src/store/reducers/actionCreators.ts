import axios from "axios";
import { AppDispatch } from "../store";
import { iUser } from "../../models/iUser";
import { userSlice } from "./userSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

// первый способ создания thunk-экшена fetchUsers
// export const fetchUsers = () => async (dispatch: AppDispatch) => {
//     try {
//         // отправляем действие usersFetching, чтобы указать, что начался процесс загрузки пользователей
//         dispatch(userSlice.actions.usersFetching())
//         // отправляем GET-запрос на сервер для получения списка пользователей
//         const response = await axios.get<iUser[]>('https://jsonplaceholder.typicode.com/users')
//         // отправляем действие usersFetchingSuccess с полученными данными, чтобы указать, что загрузка пользователей успешна
//         dispatch(userSlice.actions.usersFetchingSuccess(response.data))
//     } catch (error: unknown) {
//         // если произошла ошибка, отправляем действие usersFetchingError с сообщением об ошибке
//         if (axios.isAxiosError(error)) {
//             dispatch(userSlice.actions.usersFetchingError(error.message))
//         } else {
//             dispatch(userSlice.actions.usersFetchingError('Unknown error'))
//         }
//     }
// }

// второй способ создания thunk-экшена fetchUsers с помощью createAsyncThunk
export const fetchUsers = createAsyncThunk(
    // тип thunk-экшена
    'user/fetchAll',
    // функция, которая будет вызвана при отправке thunk-экшена
    async(_, thunkAPI) => {
        try {
            // отправляем GET-запрос на сервер для получения списка пользователей
            const response = await axios.get<iUser[]>('https://jsonplaceholder.typicode.com/users')
            // возвращаем полученные данные
            return response.data
        } catch (error) {
            // если произошла ошибка, возвращаем ошибку с сообщением
            return thunkAPI.rejectWithValue("User's fetch is failed")
        }
    }
)