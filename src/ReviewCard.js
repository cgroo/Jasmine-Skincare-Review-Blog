import { Stars } from './Stars';

export default function ReviewCard({review, onClick}) {
    return(
        <div className = "reviewBox" onClick = {onClick}>
            <div className = "topReview">
                <h2>{review.emoji}</h2>
            </div>
            <div className = "bodyReview">
                <p>{review.name}</p>
                <p>{review.cat}</p>
                <p>{review.brand}</p>
            </div>
            <div className = "ratingReview">
                <Stars productRating={review.rating} />
            </div>
            
        </div>
    );
}