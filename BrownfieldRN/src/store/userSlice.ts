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
  phoneNumber: string;
  deviceId: string;
  pincode: string;
  isLoaded: boolean;
}

const initialState: UserState = {
  name: '',
  email: '',
  role: '',
  token: '',
  phoneNumber: '',
  deviceId: '',
  pincode: '',
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
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setDeviceId: (state, action: PayloadAction<string>) => {
      state.deviceId = action.payload;
    },
    setPincode: (state, action: PayloadAction<string>) => {
      state.pincode = action.payload;
    },
  },
});

export const { setUser, updateUser, setPhoneNumber, setDeviceId, setPincode } = userSlice.actions;
export default userSlice.reducer;
