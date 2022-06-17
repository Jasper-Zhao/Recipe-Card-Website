import {createSlice} from '@reduxjs/toolkit';

let idCounter = 2;
const INITIAL_STATE = {
    cardList: [{
        id: 1, title: "Rice", ingredients: "rice, water",
        instructions: "First put the rice into the rice cooker, then add some water, finally turn on the rice cooker." +
            " Wait and enjoy."
    },
        {
            id: 2, title: "Tea", ingredients: "tea, water",
            instructions: "First boil some hot water, then add some tea. Wait and enjoy."
        }]
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

    }
});

export const { addRecipe,  deleteRecipe, modifyRecipe, deleteAllRecipe } = cardsSlice.actions;

export default cardsSlice.reducer;
