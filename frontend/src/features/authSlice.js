import { createSlice } from '@reduxjs/toolkit';

const loadAuthFromStorage = () => {
  try {
    const data = localStorage.getItem('auth');
    if (!data) return null;

    const parsed = JSON.parse(data);
    return parsed.token ? parsed : null;
  } catch (err) {
    console.error('Error loading auth from storage:', err);
    return null;
  }
};

const stored = loadAuthFromStorage();

const initialState = {
  isAuthenticated: !!stored,
  token: stored?.token || null,
  token_type: stored?.token_type || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const { access_token, token_type } = action.payload;
      state.token = access_token;
      state.token_type = token_type;
      state.isAuthenticated = true;

      localStorage.setItem(
        'auth',
        JSON.stringify({ token: access_token, token_type })
      );
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.token_type = null;
      localStorage.removeItem('auth');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
