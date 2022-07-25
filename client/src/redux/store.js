import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './cards.js';

export const store = configureStore({
    reducer: {
        cards: cardsReducer
    },
    devTools: true
});
