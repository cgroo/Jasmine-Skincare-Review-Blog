import { useState } from 'react';
import {CATEGORIES, INITIAL_REVIEWS } from './data';
import ReviewCard from './ReviewCard';
import NewReviewModal from './NewReviewModal';
import DetailModal from './DetailModal';

export default function App() {
const [reviews, setReviews] = useState(INITIAL_REVIEWS);
const [filter, setFilters] = useState('All');
const [query, setQuery] = useState('');
const [showNew, setShowNew] = useState(false); 
const [detail, setDetail] = useState(null);

const visible = []
handlePublish()
  //add newReview to fron of reviews array
  // close modal
  return(
    
  );
}