import React from "react";
import {Link, useParams} from "react-router-dom";

function CardForm({formData, setFormData, handleSubmit}) {

    const {deckId} = useParams()

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        })
    }


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div>Name</div>
                <textarea 
                    id="front" 
                    className="w-100" 
                    type="text"
                    value={formData.front}
                    onChange={handleChange}
                />
            </div>

            <div>
                <div>Description</div>
                <textarea 
                id="back"
                className="w-100" 
                value={formData.back}
                onChange={handleChange}
                />
            </div>

            <Link to={`/decks/${deckId}`}><button className="btn-secondary text-white">Done</button></Link>
            <button type="submit" className="btn-primary">Submit</button>
        </form>)
}

export default CardForm;