import { StarPicker } from './Stars';
import { CATEGORIES, CAT_EMOJI } from './data';
import { useState } from 'react';

{/*Making a new review*/}
export default function NewReviewModal({onClose, onPublish}) {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [cat, setCat] = useState('Moisturiser');
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [photo, setPhoto] = useState(null);

    function handlePublish() {
        if (!name || !brand || !review || rating === 0) {
            alert('Please fill in all fields!')
            return
        }
        onPublish({
            id: Date.now(),
            name: name,
            brand: brand,
            cat: cat,
            rating: rating,
            review: review,
            emoji: CAT_EMOJI[cat]
        })
    }

    return(
        <div className = " newReviewPopup">
            <div className = " newReviewBox" onClick = {e => e.stopPropagation()}>
                <button className = " closeButton" onClick = {onClose}>X</button>
                <label htmlFor = " productName">Product Name:</label>
                <input type = " text" value = {name} onChange = {e => setName(e.target.value)}/>
                <label htmlFor = " brand">Brand:</label>
                <input type = " text" value = {brand} onChange = {e => setBrand(e.target.value)}/>
                <label htmlFor = " category">Category:</label>
                <select value = {cat} onChange = {e => setCat(e.target.value)}>
                    {CATEGORIES.filter(c => c !== 'All')
                    .map(c => (
                        <option key = {c} value = {c}>{c}</option>
                    ))}
                </select>
                <StarPicker value = {rating} onChange={setRating}/>
                <label htmlFor = " review">Review:</label>
                <textarea 
                    id = " review" 
                    value = {review}
                    onChange = {e => setReview(e.target.value)}
                    rows = " 4" 
                    cols = " 50"/>
                <input
                    type = "file"
                    accept = "image/*"
                    onChange = {e => setPhoto(e.target.files[0])}>
                </input>
                <button className = " publishButton" onClick = {handlePublish}>
                    Publish
                </button>
            </div>
        </div>
    );
}