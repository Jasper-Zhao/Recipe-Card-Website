import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionTypes } from './actionTypes';
import { getCards, addCard } from './services.js';

export const getCardsAsync = createAsyncThunk(
    actionTypes.GET_CARDS,
    async () => {
        return await getCards();
    }
);

export const addCardAsync = createAsyncThunk(
    actionTypes.ADD_CARDS,
    async (card) => {
        return await addCard(card);
    }
);
