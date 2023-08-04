import { createSlice,configureStore } from '@reduxjs/toolkit';


const initialAuthState = { isAuthenticated: false, isPremium: false, darkToggle:false };

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    islogin(state, action) {
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload);
    },
    islogout(state) {
      state.isAuthenticated = false;
      state.isPremium = false;
      localStorage.removeItem("token");
    },
    ispremium(state, action) {
      if (action.payload > 1000 ) {
        state.isPremium = true;
      } else {
        state.isPremium = false;
      }
    },
    isToggle(state){
    state.darkToggle=!state.darkToggle;
    },
  },
});
const emailSlice = createSlice({
  name: 'email',
  initialState: {
    sentEmails: [],
    receivedEmails: [],
  },
  reducers: {
    emailSentSuccess(state, action) {
      state.sentEmails.push(action.payload);
    },
    sentEmailsFetched(state, action) {
      state.sentEmails = action.payload;
    },
    receivedEmailsFetched(state, action) {
      state.receivedEmails = action.payload;
    },
  },
});

  
const store = configureStore({
    reducer: { auth: authSlice.reducer,email:emailSlice.reducer }
  });

export const authActions = authSlice.actions;
export const emailsActions = emailSlice.actions
//export const profileActions = profileSlice.actions;
//export const themeActions = themeSlice.actions;

export default store;
