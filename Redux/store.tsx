
import { configureStore } from '@reduxjs/toolkit';
import { allReducers } from './Index';


export const store =
    configureStore({ reducer: allReducers });