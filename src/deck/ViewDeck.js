import React from "react";
import {useState, useEffect} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import {readDeck, deleteDeck, deleteCard} from "../utils/api";



function ViewDeck() {
    const [deck, setDeck] = useState({});
    const {deckId} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const abortController = new AbortController();

        readDeck(deckId, abortController.signal)
        .then(setDeck)
        .catch((error) => { throw(error) });
    }, [deckId]);

    const handleDelete = () => {
        if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
            const abortController = new AbortController();

            deleteDeck(deckId, abortController.signal);

            navigate("/");

            return () => abortController.abort();
        }
    }

    const handleDeleteCard = (event) => {
        if (window.confirm("Delete this card?\n\nYou will not be able to recover it.")) {
            const abortController = new AbortController();

            deleteCard(event.target.dataset.cardid, abortController.signal);

            const index = event.target.dataset.index;

            setDeck({...deck,
                cards: [...deck.cards.slice(0, index), ...deck.cards.slice(index+1)]});

            return () => abortController.abort();
        }
    }

    if (!deck) {
        return (<div>Loading</div>)
    }

    if (!deck.cards) {
        return (<div>Loading</div>)
    }

    return (<>
        <div className="bg-light text-primary">
            <p><Link to="/">Home</Link> / <span className="text-secondary">Create Deck</span></p>
        </div>

        <h4>{deck.name}</h4>
        <div>{deck.description}</div>

        <div class="container mb-5">
            <div class="row">
                <div className="col-2">
                    <Link to={`/decks/${deckId}/edit`}><button className="btn btn-secondary w-100">Edit</button></Link>
                </div>
                <div className="col-2">
                    <Link to={`/decks/${deckId}/study`}><button className="btn btn-primary w-100">Study</button></Link>
                </div>
                <div className="col-3">
                    <Link to={`/decks/${deckId}/cards/new`}><button className="btn btn-primary w-100">Add Cards</button></Link>
                </div>

                <div className="col-3">

                </div>
                <div className="col-2">
                    <button className="btn btn-danger w-100" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>

        <h5>Cards</h5>

        {deck.cards.map((card, index) => {
            return (
            <div className="container border">
                <div className="row">
                <div className="col-6">{card.front}</div>
                <div className="col-6 container">
                    <div className="row">
                        {card.back}
                    </div>
                    <div className="row">
                        <div className="col-8"/>
                        <div className="col-2">
                            <Link to={`/decks/${deckId}/cards/${card.id}/edit`}><button className="btn btn-primary w-100">Edit</button></Link>
                        </div>
                        <div className="col-2">
                            <button data-cardid={card.id} data-index={index} className="btn btn-danger w-100" onClick={handleDeleteCard}>Delete</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            )
        })}

    </>)
}

export default ViewDeck;