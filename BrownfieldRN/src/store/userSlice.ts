import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  name: string;
  email: string;
  role: string;
  token: string;
}

export interface EditableUser {
  name: string;
  email: string;
  role: string;
}

interface UserState extends User {
  isLoaded: boolean;
}

const initialState: UserState = {
  name: '',
  email: '',
  role: '',
  token: '',
  isLoaded: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.isLoaded = true;
    },
    updateUser: (state, action: PayloadAction<EditableUser>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
  },
});

export const { setUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
