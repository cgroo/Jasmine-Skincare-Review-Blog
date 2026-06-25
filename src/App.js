import { useState, useEffect } from "react";
import { CATEGORIES } from "./data";
import { supabase } from './supabase';
import ReviewCard from "./ReviewCard";
import NewReviewModal from "./NewReviewModal";
import DetailModal from "./DetailModal";

export default function App() {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    loadReviews();
  }, [])

  const visible = reviews.filter(r => {
    const matchCat = filter === "All" || r.cat === filter;
    const matchQuery = r.name.toLowerCase().includes(query.toLowerCase()) ||
                       r.brand.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  const trending = [...reviews].sort((a, b) => b.rating - a.rating).slice(0, 3);

  async function handlePublish(newReview) {
    await supabase.from('reviews').insert([newReview]);
    await loadReviews();
    setShowNew(false);
  }

  function handleAdminClick() {
    let password = prompt("Please enter your password");
    if (password === process.env.REACT_APP_UPLOAD_PASSWORD) {
      setShowNew(true)
    } else {
      alert("Incorrect Password!");
    }
  }

  async function loadReviews() {
    const { data, error } = await supabase.from('reviews').select('*');
    if (data) setReviews(data);
    }


  return (
    <div className="app">

      {/* Nav */}
      <nav className="nav">
        <h1 className="blogName">Jasmine's Reviews 🌸</h1>
        <button className="openButton" onClick={() => handleAdminClick()}>
          + New Review
        </button>
      </nav>

      {/* Hero */}
      <section className="hero">
        <h2>Honest skincare reviews,<br/>by Jasmine</h2>
        <p>FILLER</p>
        <div className="stats">
          <div className="stat">
            <span className="statValue">{reviews.length}</span>
            <span className="statLabel">reviews</span>
          </div>
          <div className="stat">
            <span className="statValue">{CATEGORIES.length - 1}</span>
            <span className="statLabel">categories</span>
          </div>
        </div>
      </section>

      {/* Trending */}
      {trending.length > 0 && (
        <section className="trending">
          <h3 className="trendingTitle">✨ Trending Reviews</h3>
          <div className="trendingGrid">
            {trending.map(r => (
              <ReviewCard
                key={r.id}
                review={r}
                onClick={() => setDetail(r)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Search and filters */}
      <div className="controls">
        <input
          className="searchBar"
          type="text"
          placeholder="Search by product or brand..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <div className="chips">
          {CATEGORIES.map(c => (
            <button
              key={c}
              className={filter === c ? "chip active" : "chip"}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Review grid */}
      <div className="grid">
        {visible.map(r => (
          <ReviewCard
            key={r.id}
            review={r}
            onClick={() => setDetail(r)}
          />
        ))}
      </div>

      {/* Modals */}
      {showNew && <NewReviewModal onClose={() => setShowNew(false)} onPublish={handlePublish}/>}
      {detail && <DetailModal review={detail} onClose={() => setDetail(null)}/>}

    </div>
  );
}