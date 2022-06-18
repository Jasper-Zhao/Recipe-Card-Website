import './App.css';
import {useEffect, useState} from 'react'
import Form from './Components/Form.js'
import Card from './Components/Card.js';
import { useSelector, useDispatch } from 'react-redux';
import Popup from "./Components/Popup";
import { deleteAllRecipe } from "./redux/cards.js";
import {ErrorAlert} from "./Components/ErrorAlert";
import {getCardsAsync} from "./redux/thunks";


function App() {
    const cardList = useSelector(state => state.cards.cardList);
    const [popUp, setPopup] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCardsAsync());
    });

    return (
        <div>
            <Form/>
            {/*<ErrorAlert />*/}
            {cardList.map((e) => {
                return <Card key={e.id} id={e.id} title={e.title} ingredients={e.ingredients}
                             togglePopup={setPopup}/>
            })}

            {popUp ? (<Popup togglePopup={setPopup} id={popUp}/>) : null}
            <button type="button" id="reset" onClick={() => {
                dispatch(deleteAllRecipe());
            }
            }>Reset</button>

        </div>


    );
}

export default App;
