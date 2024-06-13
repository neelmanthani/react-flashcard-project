import React from "react";
import {useState, useEffect} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import {readDeck} from "../utils/api"

function Study(){
    const [side, setSide] = useState("front");
    const [cardIndex, setCardIndex] = useState(0);
    const [deck, setDeck] = useState([]);
    const [text, setText] = useState("");

    const {deckId} = useParams();
    
    const navigate = useNavigate();


    useEffect(() => {
        //retrieve card from deck and display front or back appropriately

        const abortController = new AbortController();

        readDeck(deckId, abortController.signal)
        .then((deck) => {
            setDeck(deck);
            
            if (deck.cards.length > 0) {
            if (side === "front"){
                setText(deck.cards[cardIndex].front)
            } else {
                setText(deck.cards[cardIndex].back)
            }
            }
        })
        .catch((error) => { throw(error) });

    }, [side, cardIndex, deckId])

    const handleFlip = () => {
        if (side === "front"){
            setSide("back");
        }else{
            setSide("front");
        }
    }

    const handleNext = () => {
        if (cardIndex !== deck.cards.length-1) {
            setCardIndex(cardIndex+1);
            setSide("front");
        } else {
            if (window.confirm("Restart cards?\n\nClick 'cancel' to return to the homepage.")) {
                setCardIndex(0);
                setSide("front");
            } else {
                navigate("/");
            }
        }
    }

    if (!deck.cards) {
        return <p>Loading...</p>;
      }

    if (deck.cards.length < 3) {
        return (
        <div>
            <div className="bg-light text-primary">
            <p><Link to="/">Home</Link> / <Link to={`/decks/${deckId}`}>{deck.name}</Link> / <span className="text-secondary">Study</span></p>
            </div>
            <h1>{deck.name}: Study</h1>
            <h2>Not enough cards.</h2>
            <div>You need at least 3 cards to study. There are {deck.cards.length} in this deck.</div>
            <Link to={`/decks/${deckId}/cards/new`}><button className="btn btn-primary">Add Cards</button></Link>
        </div>
        )
    }


    return (<>
        <div className="bg-light text-primary">
            <p><Link to="/">Home</Link> / <Link to={`/decks/${deckId}`}>{deck.name}</Link> / <span className="text-secondary">Study</span></p>
        </div>
        <h1>{deck.name}: Study</h1>
        <div className="border p-3 pl-4 container">
            <div className="row">
                <h4>Card {cardIndex+1} of {deck.cards.length}</h4>
            </div>
            <div className="row">
                <p>{text}</p>
            </div>
            <div className="row">
                <div className="col-1">
                    <button className="btn btn-secondary w-100" onClick={handleFlip}>Flip</button>
                </div>
                {side === "back" && (
                    <div className="col-1">
                        <button className="btn btn-secondary w-100" onClick={handleNext}>Next</button>
                    </div>
                )}
            </div>

        </div>
        </>)
}

export default Study;