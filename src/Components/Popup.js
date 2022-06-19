// The general idea of popup window and tiny bit of code was adapted from
// https://www.cluemediator.com/create-simple-popup-in-reactjs
import './Popup.css'
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {modifyRecipe} from "../redux/cards.js";
import {editCardAsync} from "../redux/thunks";

export default function Popup(props) {
    const cardList = useSelector(state => state.cards.cardList);
    const selectedCard = cardList.find(e => {
        return e.id === props.id
    })
    const [title, setTitle] = useState(selectedCard.title);
    const [ingredients, setIngredients] = useState(selectedCard.ingredients);
    const [instructions, setInstructions] = useState(selectedCard.instructions);
    const dispatch = useDispatch();

    const handleModify = (event) => {
        event.preventDefault();
        const modifiedCard = {
            id: selectedCard.id,
            title: title,
            ingredients: ingredients,
            instructions: instructions
        }
        dispatch(editCardAsync(modifiedCard));
        props.togglePopup(0);
    }

    return (
        <div className="popup-box">
            <div className="box">
                <h1>Recipe Name</h1><br/>
                <input type="text" name="title" placeholder={selectedCard.title} value={title}
                       onChange={element => setTitle(element.target.value)}/><br/>
                <h2>Ingredients:</h2>
                <textarea id="ingredients" name="ingredients" rows="6" cols="50" placeholder={selectedCard.ingredients}
                          value={ingredients} onChange={element => setIngredients(element.target.value)}/><br/>
                <h2>Instructions:</h2>
                <textarea id="instructions" name="instructions" rows="6" cols="50"
                          placeholder={selectedCard.instructions}
                          value={instructions} onChange={element => setInstructions(element.target.value)}/><br/>
                <button id="button" type="button" onClick={
                    (e) => {
                        e.preventDefault();
                        props.togglePopup(0)
                    }
                }>close
                </button>
                <button type="button" onClick={handleModify}>Modify</button>
            </div>
        </div>
    );
};
