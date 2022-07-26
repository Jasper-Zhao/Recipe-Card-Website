import './App.css';
import {useEffect, useState} from 'react'
import Form from './Components/Form.js'
import Card from './Components/Card.js';
import Search from './Components/Search.js';
import { useSelector, useDispatch } from 'react-redux';
import Popup from "./Components/Popup";
import { getCardsAsync } from "./redux/thunks";
import ConfirmationDialog from "./Components/ConfirmationDialog";


function App() {
    const cardList = useSelector(state => state.cards.cardList);
    const [popUp, setPopup] = useState(0);
    const [dialog, toggleDialog] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCardsAsync());
    }, [dispatch]);

    return (
        <div className="App">
            <Form/>
            <Search/>
            {cardList.map((e) => {
                return <Card key={e.id} id={e.id} title={e.title} ingredients={e.ingredients} modifyDate={e.modifyDate}
                             completionTime={e.completionTime}
                             togglePopup={setPopup}/>
            })}

            {popUp ? (<Popup togglePopup={setPopup} id={popUp}/>) : null}
            {dialog ? (<ConfirmationDialog toggleDialog={toggleDialog} />) : null}
            <button type="button" id="reset" onClick={() => {
                toggleDialog(true)
            }
            }>Reset</button>

        </div>


    );
}

export default App;
