import './App.css';
import {useEffect, useState} from 'react'
import Form from './Components/Form.js'
import Card from './Components/Card.js';
import Search from './Components/Search.js';
import { useSelector, useDispatch } from 'react-redux';
import Popup from "./Components/Popup";
import {getCardsAsync, resetAsync} from "./redux/thunks";


function App() {
    const cardList = useSelector(state => state.cards.cardList);
    const [popUp, setPopup] = useState(0);
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
                             togglePopup={setPopup}/>
            })}

            {popUp ? (<Popup togglePopup={setPopup} id={popUp}/>) : null}
            <button type="button" id="reset" onClick={() => {
                dispatch(resetAsync());
            }
            }>Reset</button>

        </div>


    );
}

export default App;
