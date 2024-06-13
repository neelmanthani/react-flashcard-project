import React from "react";
import {useState, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {readDeck, readCard, updateCard} from "../utils/api"
import CardForm from "./CardForm"

function EditCard() {
    const {cardId, deckId} = useParams();
    const [formData, setFormData] = useState({
        front: "",
        back: ""
    });

    const [deck, setDeck] = useState({})

    const navigate = useNavigate();

    useEffect(() => {
        const abortController = new AbortController();

        readDeck(deckId, abortController.signal)
        .then(setDeck)
        .catch((error) => { throw(error) });

        readCard(cardId, abortController.signal)
        .then((card) => setFormData({
            front: card.front,
            back: card.back
        }))
        .catch((error) => { throw(error) });

        return () => abortController.abort();
    }, [deckId, cardId])

    const handleSubmit = (event) => {
        event.preventDefault();

        const abortController = new AbortController();

        updateCard({...formData, id: cardId, deckId: Number(deckId)}, abortController.signal)
        .then((card) => navigate(`/decks/${card.deckId}`))

        return () => abortController.abort();
    }

    if (!deck) {
        return <div>Loading</div>
    }


    return (<>
        <div className="bg-light text-primary">
            <p><Link to="/">Home</Link> / <Link to={`/decks/${deckId}`}>{deck.name}</Link> / <span className="text-secondary">Edit Card {cardId}</span></p>
        </div>

        <CardForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit}/>
    </>)
}

export default EditCard;