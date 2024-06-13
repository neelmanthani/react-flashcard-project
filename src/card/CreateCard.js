import React from "react";
import {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {readDeck, createCard} from "../utils/api"
import CardForm from "./CardForm"

function CreateCard() {
    const {deckId} = useParams();
    const [formData, setFormData] = useState({
        front: "",
        back: ""
    });

    const [deck, setDeck] = useState({})


    useEffect(() => {
        const abortController = new AbortController();

        readDeck(deckId, abortController.signal)
        .then(setDeck)
        .catch((error) => { throw(error) });

        return () => abortController.abort();
    }, [deckId])

    const handleSubmit = (event) => {
        event.preventDefault();

        const abortController = new AbortController();

        console.log(formData);

        createCard(deckId, {...formData}, abortController.signal);

        setFormData({
            front: "",
            back: ""
        })

        return () => abortController.abort();
    }

    if (!deck) {
        return <div>Loading</div>
    }


    return (<>
        <div className="bg-light text-primary">
            <p><Link to="/">Home</Link> / <Link to={`/decks/${deckId}`}>{deck.name}</Link> / <span className="text-secondary">Add Card</span></p>
        </div>

        <CardForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit}/>
    </>)
}

export default CreateCard;