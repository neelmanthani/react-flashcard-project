import React from "react";
import {listDecks, deleteDeck} from "../utils/api"
import {useState, useEffect} from "react"
import Deck from "./Deck"
import {Link} from "react-router-dom"

function DeckList() {
    const [decks, setDecks] = useState([]);

    const handleDelete = (index, id) => {
        const abortController = new AbortController();

        deleteDeck(id, abortController.signal);
        setDecks([...decks.slice(0, index), ...decks.slice(index+1)]);

        return () => abortController.abort();
    }

    useEffect(() => {
        const abortController = new AbortController();

        listDecks(abortController.signal)
        .then(setDecks)
        .catch((error) => { throw(error) });

        return () => abortController.abort();
    }, [])

    console.log(decks);

    return (
        <div>
            <Link to="/decks/new"><button className="btn btn-secondary m-2">Create Deck</button></Link>
            {decks.map((deck, index) => {
               return <Deck 
                key={index} 
                index={index} 
                name={deck.name} 
                desc={deck.description} 
                id={deck.id} 
                numCards={deck.cards.length}
                handleDelete={handleDelete}
                />
            })}
        </div>
    )
}

export default DeckList;