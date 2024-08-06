import { iUser } from '../../models/iUser';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers } from "./actionCreators";

// интерфейс состояния пользователей
interface UserState {
    users: iUser[];
    isLoading: boolean;
    error: string;
}

// начальное состояние пользователей
const initialState: UserState = {
    users: [],
    isLoading: false,
    error: ''
}

// слайс для управления состоянием пользователей
export const userSlice = createSlice({
    // имя слайса
    name: 'user',
    // начальное состояние
    initialState,
    // редюсеры для обработки действий
    reducers: {
        // первый способ обработки действий
        // usersFetching(state) {
        //     state.isLoading = true
        // },
        // usersFetchingSuccess(state, action: PayloadAction<iUser[]>) {
        //     state.isLoading = false
        //     state.error = ''
        //     state.users = action.payload
        // },
        // usersFetchingError(state, action: PayloadAction<string>) {
        //     state.isLoading = false
        //     state.error = action.payload
        // }
    },
    // дополнительные редюсеры для обработки действий
    extraReducers: (builder) => {
        // второй способ обработки действий
        builder
        // обработка успешной загрузки пользователей
        .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<iUser[]>) => {
            state.isLoading = false;
            state.error = '';
            state.users = action.payload;
        })
        // обработка начала загрузки пользователей
        .addCase(fetchUsers.pending, (state) => {
            state.isLoading = true;
        })
        // обработка ошибки при загрузке пользователей
        .addCase(fetchUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string || 'Failed to fetch users';
        });
    },
});

export default userSlice.reducer;