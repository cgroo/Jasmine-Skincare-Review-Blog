import { Stars } from './Stars';

{/*Details of review when clicking review card */}
export default function DetailModal({review, onClose}) {
    if (!review) {
        return null;
    }
    return(
        <div className = "popupBackground" onClick = {onClose}>
            <div className = "modalBox" onClick = {e => e.stopPropagation()}>
                <button className = "closeButton" onClick = {onClose}>
                    X
                </button>
                <div className = "bodyReview">
                    <p>{review.emoji}</p>
                    <p>{review.name}</p>
                    <p>{review.cat}</p>
                    <p>{review.brand}</p>
                    <p>{review.review}</p>
                </div>
                <div className = "ratingReview">
                    <Stars productRating={review.rating} />
                </div>
            </div>
        </div>
    );
}