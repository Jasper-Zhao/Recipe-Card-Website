import './Card.css'
import { useDispatch } from "react-redux";
import { deleteRecipe } from '../actions'
export default function Card(props) {
    let id = props.id;
    const dispatch = useDispatch();
    return (
        <div className="card">
            <div onClick={() => {props.togglePopup(id)}}>
            <h1>{props.title}</h1>
            <h2>Ingredients:</h2>
            <p>{props.ingredients}</p>
            </div>
            <button type="button" onClick={() => {
                dispatch(deleteRecipe(id));
            }}> delete </button>

        </div>
    )

}
