import {RootState} from 'store/store';

export const isLoggedSelector = (state: RootState) => state.auth.isLoggedIn

export const loggedUserSelector = (state: RootState) => state.auth.user