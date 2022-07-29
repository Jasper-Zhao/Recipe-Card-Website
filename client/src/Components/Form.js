import { useState } from 'react';
import "./Form.css"
import { useDispatch } from "react-redux";
import { addCardAsync } from "../redux/thunks";


export default function Form() {
    const [title, setTitle] = useState("");
    const [ingredients,setIngredients] = useState("");
    const [instructions,setInstructions] = useState("");
    const [completionTime,setCompletionTime] = useState("");
    const dispatch = useDispatch();
    const handleSubmit = (event) => {
        event.preventDefault();
        const newCard = {
            title: title,
            ingredients: ingredients,
            instructions: instructions,
            completionTime: completionTime
        }
        dispatch(addCardAsync(newCard));
        setTitle("");
        setIngredients("");
        setInstructions("");
        setCompletionTime("");
    }

    return (
        <div className="new-recipe">
            <h2>NEW RECIPES!!!</h2>
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
            <label className="label" htmlFor="completionTime">Completion Time: </label><br/>
            <input type="text" name="completionTime" placeholder={"Estimated Completion Time"}
                   value={completionTime} onChange={element => setCompletionTime(element.target.value)}/><br/>
            <button>Add</button>
            <button type="button" onClick={ () => {
                setTitle("");
                setIngredients("");
                setInstructions("");
                setCompletionTime("")
            }}>Clear</button>
        </form>
        </div>

    )
}
