import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from "./utils";
import { addCardAsync, getCardsAsync } from "./thunks";

// {
//     id: 1, title: "Rice", ingredients: "rice, water",
//     instructions: "First put the rice into the rice cooker, then add some water, finally turn on the rice cooker." +
// " Wait and enjoy."
// },
// {
//     id: 2, title: "Tea", ingredients: "tea, water",
//     instructions: "First boil some hot water, then add some tea. Wait and enjoy."
// }

let idCounter = 2;
const INITIAL_STATE = {
    cardList: [],
    getCards: REQUEST_STATE.IDLE,
    addCard: REQUEST_STATE.IDLE,
    error: null
}

const cardsSlice = createSlice({
    name: 'cards',
    initialState: INITIAL_STATE,
    reducers: {
        addRecipe: (state, action) => {
            const newCard  = {
                id: ++idCounter,
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
                state.cardList = action.payload;
            })
            .addCase(getCardsAsync.rejected, (state, action) => {
                state.getCards = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(addCardAsync.pending, (state) => {
                state.addCard = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(addCardAsync.fulfilled, (state, action) => {
                state.addCard = REQUEST_STATE.FULFILLED;
                state.cardList.push(action.payload);
            })
            .addCase(addCardAsync.rejected, (state, action) => {
                state.addCard = REQUEST_STATE.REJECTED;
                state.error = action.error;
            });
    }
});

export const { addRecipe,  deleteRecipe, modifyRecipe, deleteAllRecipe } = cardsSlice.actions;

export default cardsSlice.reducer;
