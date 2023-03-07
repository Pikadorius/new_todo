import {RootState} from 'store/store';

export const isInitializedSelector = (state: RootState) => state.app.isInitialized
export const appStatusSelector = (state: RootState) => state.app.status
export const appErrorSelector = (state: RootState) => state.app.error
export const modalTypeSelector = (state: RootState) => state.app.modal
export const modalTaskSelector = (state: RootState) => state.app.modalTask
export const modalTodoSelector = (state: RootState) => state.app.modalTodo