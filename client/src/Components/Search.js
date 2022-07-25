import { useState } from 'react';
import "./Search.css"
import { useDispatch } from "react-redux";
import {getCardsAsync, searchCardsAsync} from "../redux/thunks";


export default function Form() {

    const [searchBy, setSearchBy] = useState("title")
    const [keywords, setKeywords] = useState("")
    const dispatch = useDispatch();
    const handleSubmit = (event) => {
        const params = {
            type: searchBy,
            keywords: keywords
        }

        dispatch(searchCardsAsync(params));
        event.preventDefault();
    }

    const handleReset = (event) => {
        dispatch(getCardsAsync());
        setKeywords("");
        event.preventDefault();
    }

    return (
        <div className="Search">
            <h2>or find an existing recipe below:</h2>
            <form onSubmit={handleSubmit}>
                <label className="label-body">
                    Search by: <select value={searchBy} onChange={element => setSearchBy(element.target.value)}>
                        <option value="title">Title</option>
                        <option value="ingredient">Ingredient</option>
                    </select>
                </label> <br/>
                <input className="input-body" type="text" placeholder={"input the " + searchBy +" here..."} value={keywords}
                       onChange={element => setKeywords(element.target.value)}></input> <br/>
                <button className="button-body">Submit</button>
                <button className="button-body" onClick={handleReset}>Reset</button>
            </form>
        </div>

    )
}
