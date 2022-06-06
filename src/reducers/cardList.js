let idCounter = 2;
let initial = '[{"id": "1", "title":"Rice", "ingredients":"rice, water", "instructions": "First put the rice into the ' +
    'rice cooker, then add some water, finally turn on the rice cooker. Wait and enjoy."}, {"id": "2", "title":"Tea", ' +
    '"ingredients":"tea, water", "instructions": "First boil some hot water ' +
    ', then add some tea. Wait and enjoy."}]'
const cardList = (state = JSON.parse(initial), action) => {
    switch (action.type) {
        case "ADD_RECIPE":
            return [
                ...state,
                {
                    id: ++idCounter,
                    title: action.payload.title,
                    ingredients: action.payload.ingredients,
                    instructions: action.payload.instructions
                }
            ];

        case "DELETE_RECIPE":
            return state.filter((e) => {
                return e.id !== action.payload.id;
            })

        case "MODIFY_RECIPE":
            return state.map((e) => {
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

        case "DELETE_ALL_RECIPE":
            return [];

        default:
            return state;
    }
}
export default cardList;
