import {createSlice} from '@reduxjs/toolkit';
import {REQUEST_STATE} from "./utils";
import {addCardAsync, deleteCardAsync, editCardAsync, getCardsAsync, resetAsync, searchCardsAsync} from "./thunks";


const INITIAL_STATE = {
    cardList: [],
    getCards: REQUEST_STATE.IDLE,
    addCard: REQUEST_STATE.IDLE,
    editCard: REQUEST_STATE.IDLE,
    deleteCard: REQUEST_STATE.IDLE,
    reset: REQUEST_STATE.IDLE,
    error: null
}

const cardsSlice = createSlice({
    name: 'cards',
    initialState: INITIAL_STATE,
    reducers: {
        addRecipe: (state, action) => {
            const newCard = {
                id: action.payload._id,
                title: action.payload.title,
                ingredients: action.payload.ingredients,
                instructions: action.payload.instructions
            }
            state.cardList.push(newCard);
        },

        deleteRecipe: (state, action) => {

            state.cardList = state.cardList.filter((e) => {
                return e.id !== action.payload;
            })
        },

        modifyRecipe: (state, action) => {
            state.cardList = state.cardList.map((e) => {
                console.log(e.id);
                if (e.id === action.payload.id) {
                    return {
                        id: action.payload.id,
                        title: action.payload.title,
                        ingredients: action.payload.ingredients,
                        instructions: action.payload.instructions
                    }
                } else {
                    return e;
                }
            })
            console.log(state.cardList);
        },

        deleteAllRecipe: (state) => {
            state.cardList = [];
        }

    },

    extraReducers: (builder) => {
        builder
            .addCase(getCardsAsync.pending, (state) => {
                state.getCards = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getCardsAsync.fulfilled, (state, action) => {
                state.getCards = REQUEST_STATE.FULFILLED;
                state.cardList = action.payload.map((card) => {
                    return {
                        id: card._id,
                        title: card.title,
                        ingredients: card.ingredients,
                        instructions: card.instructions,
                        modifyDate: card.updatedAt
                    };
                });
            })
            .addCase(getCardsAsync.rejected, (state, action) => {
                state.getCards = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(searchCardsAsync.pending, (state) => {
                state.getCards = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(searchCardsAsync.fulfilled, (state, action) => {
                state.getCards = REQUEST_STATE.FULFILLED;
                state.cardList = action.payload.map((card) => {
                    return {
                        id: card._id,
                        title: card.title,
                        ingredients: card.ingredients,
                        instructions: card.instructions,
                        modifyDate: card.updatedAt
                    };
                });
            })
            .addCase(searchCardsAsync.rejected, (state, action) => {
                state.getCards = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(addCardAsync.pending, (state) => {
                state.addCard = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(addCardAsync.fulfilled, (state, action) => {
                state.addCard = REQUEST_STATE.FULFILLED;
                const newCard = {
                    id: action.payload._id,
                    title: action.payload.title,
                    ingredients: action.payload.ingredients,
                    instructions: action.payload.instructions,
                    modifyDate: action.payload.updatedAt
                }
                state.cardList.push(newCard);
            })
            .addCase(addCardAsync.rejected, (state, action) => {
                state.addCard = REQUEST_STATE.REJECTED;
                state.error = action.error;
                alert("Recipe title cannot be empty!");
            })
            .addCase(editCardAsync.pending, (state) => {
                state.editCard = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(editCardAsync.fulfilled, (state, action) => {
                state.editCard = REQUEST_STATE.FULFILLED;
                const updatedCard = {
                    id: action.payload._id,
                    title: action.payload.title,
                    ingredients: action.payload.ingredients,
                    instructions: action.payload.instructions,
                    modifyDate: action.payload.updatedAt
                }
                state.cardList = state.cardList.map((card) => {
                    if (card.id === action.payload._id) {
                        return updatedCard;
                    } else {
                        return card;
                    }
                })
            })
            .addCase(editCardAsync.rejected, (state, action) => {
                state.editCard = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(deleteCardAsync.pending, (state) => {
                state.deleteCard = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(deleteCardAsync.fulfilled, (state, action) => {
                state.deleteCard = REQUEST_STATE.FULFILLED;
                state.cardList = state.cardList.filter((card) => {
                    return card.id !== action.payload.id;
                })
            })
            .addCase(deleteCardAsync.rejected, (state, action) => {
                state.deleteCard = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(resetAsync.pending, (state) => {
                state.reset = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(resetAsync.fulfilled, (state, action) => {
                state.resetCard = REQUEST_STATE.FULFILLED;
                let resCode = Number(action.payload);
                if (resCode === 250) {
                    state.cardList = [];
                }
            })
            .addCase(resetAsync.rejected, (state, action) => {
                state.resetCard = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
    }
});

export const {addRecipe, deleteRecipe, modifyRecipe, deleteAllRecipe} = cardsSlice.actions;

export default cardsSlice.reducer;
