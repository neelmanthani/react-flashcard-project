import React from "react";
import "./Deck.css";
import {Link} from "react-router-dom";
import {} from "../utils/api"


function Deck({name, index, desc, id, numCards, handleDelete}) {

    const doDelete = () => {
        if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
            handleDelete(index, id);
        }
    }


    return (<div className="border p-3 container">
        <div className="row">
            <div className="col-9">
            <h4>{name}</h4>
            </div>
            <div className="col-2">
            </div>
            <div className="col-1">
            <p>{numCards} cards</p>
            </div>

        </div>
        <p>{desc}</p>
        <div className="container">
            <div className="row">
                <div className="col-2">
                    <Link to={`/decks/${id}`}><button className="btn btn-secondary w-100">View</button></Link>
                </div>
                <div className="col-2">
                    <Link to={`/decks/${id}/study`}><button className="btn btn-primary w-100">Study</button></Link>
                </div>
                <div className="col-6">

                </div>
                <div className="col-2">
                    <button className="btn btn-danger w-100" onClick={doDelete}>Delete</button>
                </div>
            </div>
        </div>
    </div>)
}

export default Deck;