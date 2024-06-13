import React from "react";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {createDeck} from "../utils/api"

function CreateDeck() {
    const initialFormState = {
        name: "",
        description: ""
    }
    const [formData, setFormData] = useState(initialFormState);

    const navigate = useNavigate();

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const abortController = new AbortController();

        createDeck(formData, abortController.signal)
        .then((deck) => navigate(`/decks/${deck.id}`))

        return () => abortController.abort();
    }


    return (<>
        <div className="bg-light text-primary">
            <p><Link to="/">Home</Link> / <span className="text-secondary">Create Deck</span></p>
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

            <button className="btn-secondary text-white">Cancel</button>
            <button type="submit" className="btn-primary">Submit</button>
        </form>

    </>)
}

export default CreateDeck;