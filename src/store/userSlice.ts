import { createAppSlice } from "@/src/store/createAppSlice";
import type { TUser } from "@/src/types";

const initialState: TUser = {
  favorites: [],
  surname: "",
  name: "",
  email: "",
  password: "",
};

export const userSlice = createAppSlice({
  name: "user",
  initialState,
  reducers: {
    toggleUser: (state, action) => (state = action.payload),
  },
});

export const { toggleUser } = userSlice.actions;
