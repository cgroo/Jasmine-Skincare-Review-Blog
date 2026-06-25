import { Stars } from './Stars';
import { motion } from 'framer-motion';

//Interactble product bubbles
export default function ReviewCard({review, onClick}) {
    return(
        <motion.div className = "reviewBox" 
                    onClick = {onClick}
                    whileHover = {{scale: 1.08}}
                    whileTap = {{scale: 0.95}}
        >
            <div className = "photoReviewCircle">
                {review.photo? <img src = {review.photo} alt = {review.name}/> : <span>{review.emoji}</span>}
            </div>
            <div className = "bodyReview">
                <p>{review.name}</p>
                <p>{review.brand}</p>
            </div>
            <div className = "ratingReview">
                <Stars productRating={review.rating} />
            </div>
            
        </motion.div>
    );
}