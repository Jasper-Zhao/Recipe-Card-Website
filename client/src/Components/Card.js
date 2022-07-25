import './Card.css'
import {useDispatch} from "react-redux";
import {deleteCardAsync} from "../redux/thunks";

export default function Card(props) {
    let id = props.id;
    const dispatch = useDispatch();
    const date = new Date(props.modifyDate)
    const dateString = date.toDateString() + " " +date.getHours()+ ":"
        + ((date.getMinutes() > 9)? date.getMinutes(): ("0" + date.getMinutes()))+ ":" +
        ((date.getSeconds() > 9)? date.getSeconds(): ("0" + date.getSeconds()))
    return (
        <div className="card">
            <div onClick={() => {
                props.togglePopup(id)
            }}>
                <h1>{props.title}</h1>
                <h2>Ingredients:</h2>
                <p className="ingredients">{props.ingredients}</p>
                <p className="completionTime">Completion Time: {props.completionTime}</p>
                <p className="modifyDate">Last Modified at: {dateString}</p>
            </div>
            <button type="button" onClick={() => {
                dispatch(deleteCardAsync(id));
            }}> delete
            </button>
        </div>
    )

}
