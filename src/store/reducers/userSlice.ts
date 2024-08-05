import { iUser } from '../../models/iUser';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers } from "./actionCreators";

interface UserState {
    users: iUser[];
    isLoading: boolean;
    error: string;
}

const initialState: UserState = {
    users: [],
    isLoading: false,
    error: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        //1 way
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
    extraReducers: (builder) => {
        //2 way
        builder
        .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<iUser[]>) => {
            state.isLoading = false;
            state.error = '';
            state.users = action.payload;
        })
        .addCase(fetchUsers.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string || 'Failed to fetch users';
        });
    },
});

export default userSlice.reducer;