import { useState } from 'react';
import "./Form.css"
import { useDispatch } from "react-redux";
import { addCardAsync } from "../redux/thunks";


export default function Form() {
    const [title, setTitle] = useState("");
    const [ingredients,setIngredients] = useState("");
    const [instructions,setInstructions] = useState("");
    const dispatch = useDispatch();
    const handleSubmit = (event) => {
        event.preventDefault();
        const newCard = {
            title: title,
            ingredients: ingredients,
            instructions: instructions
        }
        dispatch(addCardAsync(newCard));
        setTitle("");
        setIngredients("");
        setInstructions("");
    }

    return (
        <div className="new-recipe">
            <h2>Create a new recipe below:</h2>
        <form onSubmit={handleSubmit}>
            <label className="label" htmlFor="title"> Recipe title: </label>
            <input type="text" name="title" placeholder="name of the recipe" value={title}
    onChange={element => setTitle(element.target.value)}/><br/>
            <label className="label" htmlFor="ingredients"> Ingredients: </label><br/>
            <textarea id="ingredients" name="ingredients" rows="4" cols="50" placeholder="List of ingredients"
                      value={ingredients} onChange={element => setIngredients(element.target.value)}/><br/>

            <label className="label" htmlFor="instructions">Instructions: </label><br/>
            <textarea id="instructions" name="instructions" rows="4" cols="50" placeholder="List of instructions"
                      value={instructions} onChange={element => setInstructions(element.target.value)}/><br/>
            <button>Add</button>
            <button type="button" onClick={ () => {
                setTitle("");
                setIngredients("");
                setInstructions("");
            }}>Clear</button>
        </form>
        </div>

    )
}
