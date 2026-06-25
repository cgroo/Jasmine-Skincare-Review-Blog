import { Stars } from './Stars';
import { useState, useEffect } from 'react'
import { supabase } from './supabase';

{/*Details of review when clicking review card */}
export default function DetailModal({review, onClose}) {
    
    const [ author, setAuthor] = useState('');
    const [ commentText, setCommentText] = useState('');
    const [ comments, setComments] = useState([]);


    async function loadComments() {
        const { data } = await supabase.from('comments').select('*').eq('review_id', review.id);
        if (data) {
            setComments(data);
        }
    }

    async function handleAddComment() {
        if (author === '' || commentText === '') {
            alert('Add some context');
            return
        }
        await supabase.from('comments').insert([{
            review_id: review.id,
            author: author,
            body: commentText
        }]);
        setAuthor('');
        setCommentText('');
        loadComments();
    }

    useEffect(() => {
        if (review) loadComments();
    }, [review]);

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
                    {review.photo ? <img src={review.photo} alt={review.name} className="modalPhoto"/> : <p>{review.emoji}</p>}
                </div>
                <div className = "ratingReview">
                    <Stars productRating={review.rating} />
                </div>
                <div className="commentsSection">
                <h3>Comments</h3>
                {comments.map(c => (
                    <div key={c.id} className="comment">
                        <strong>{c.author}</strong>
                        <p>{c.body}</p>
                    </div>
                ))}
                <input 
                    type="text" 
                    placeholder="Your name" 
                    value={author} 
                    onChange={e => setAuthor(e.target.value)}
                />
                <textarea 
                    placeholder="Leave a comment..." 
                    value={commentText} 
                    onChange={e => setCommentText(e.target.value)}
                />
                <button onClick={handleAddComment}>Post comment</button>
            </div>
            </div>
        </div>
    );
}