import React from "react";
import {useState, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {updateDeck, readDeck} from "../utils/api"

function EditDeck() {
    const initialFormState = {
        name: "",
        description: ""
    }
    const [formData, setFormData] = useState(initialFormState);
    const {deckId} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const abortController = new AbortController();

        readDeck(deckId, abortController.signal)
        .then((deck) => setFormData({
            name: deck.name,
            description: deck.description
        }))
        .catch((error) => { throw(error) });

        return () => abortController.abort();
    }, [deckId])

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const abortController = new AbortController();

        updateDeck({...formData, id: deckId}, abortController.signal)
        .then((deck) => navigate(`/decks/${deck.id}`))

        return () => abortController.abort();
    }


    return (<>
        <div className="bg-light text-primary">
            <p><Link to="/">Home</Link> / <span className="text-secondary">Edit Deck</span></p>
        </div>

        <form onSubmit={handleSubmit}>
            <div>
                <div>Name</div>
                <input 
                    id="name" 
                    className="w-100" 
                    type="text" 
                    placeholder="Deck Name" 
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>

            <div>
                <div>Description</div>
                <textarea 
                id="description"
                className="w-100" 
                placeholder="Brief description of deck"
                value={formData.description}
                onChange={handleChange}
                />
            </div>

            <Link to={`/decks/${deckId}`}><button className="btn-secondary text-white">Cancel</button></Link>
            <button type="submit" className="btn-primary">Submit</button>
        </form>

    </>)
}

export default EditDeck;