
export const addRecipe = (title, ingredients, instructions) => {
    return {
        type: "ADD_RECIPE",
        payload:
            {
                title,
                ingredients,
                instructions
            }

    }
}

export const deleteRecipe = (id) => {
    return {
        type: "DELETE_RECIPE",
        payload: {
            id: id
        }
    }
}

export const modifyRecipe = (id, title, ingredients, instructions) => {
    return {
        type: "MODIFY_RECIPE",
        payload: {
            id: id,
            title,
            ingredients,
            instructions
        }
    }
}

export const deleteAllRecipe = () => {
    return {
        type: "DELETE_ALL_RECIPE"
    }
}
