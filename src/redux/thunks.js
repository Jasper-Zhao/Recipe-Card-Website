import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionTypes } from './actionTypes';
import {getCards, addCard, editCard, deleteCard, reset} from './services.js';

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

export const editCardAsync = createAsyncThunk(
    actionTypes.EDIT_CARD,
    async (card) => {
        return await editCard(card);
    }
);

export const deleteCardAsync = createAsyncThunk(
    actionTypes.DELETE_CARD,
    async (id) => {
        return await deleteCard(id);
    }
);

export const resetAsync = createAsyncThunk(
    actionTypes.CARD_RESET,
    async () => {
        return await reset();
    }
)
