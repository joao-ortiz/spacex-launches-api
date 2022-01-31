import { configureStore, createAction, createSlice, PayloadAction, AnyAction,
    combineReducers,
    EnhancedStore,
    Middleware,
    Reducer, } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { launchesApi } from './client-api'

const initialState: string[] = []

const favouritesReducer = createSlice({
    name: "favourites",
    initialState,
    reducers: {
        add(state, action: PayloadAction<string>) {
            state.push(action.payload)
        },
        remove(state, action: PayloadAction<string>) {
            return state.filter(id => id !== action.payload)
        }
    }

})

const store = configureStore({
    reducer:{
        [launchesApi.reducerPath]: launchesApi.reducer,
        favourites: favouritesReducer.reducer
    }
})
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const { add, remove} = favouritesReducer.actions
export default store