import { useState, useEffect } from "react";
import { CATEGORIES } from "./data";
import { supabase } from './supabase';
import LoginModal from "./LoginModal";
import ReviewCard from "./ReviewCard";
import NewReviewModal from "./NewReviewModal";
import DetailModal from "./DetailModal";

export default function App() {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [detail, setDetail] = useState(null);
  const [allComments, setAllComments] = useState([]);
  const [allClicks, setAllClicks] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    loadReviews();
    loadComments();
    loadClicks();
  }, [])

  const visible = reviews.filter(r => {
    const matchCat = filter === "All" || r.cat === filter;
    const matchQuery = r.name.toLowerCase().includes(query.toLowerCase()) ||
                       r.brand.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  const aWeekAgo = new Date();
  aWeekAgo.setDate(aWeekAgo.getDate()-7);
  const recentComments = allComments.filter(c => new Date(c.created_at) > aWeekAgo);
  const recentClicks = allClicks.filter(c => new Date(c.created_at) > aWeekAgo);
  const trending = [...reviews].map(r => {
    const commentCount = recentComments.filter(c => c.review_id === r.id).length;
    const clickCount = recentClicks.filter(c => c.review_id === r.id).length;
    return { ...r, score: commentCount + clickCount };
  }).sort((a,b) => b.score - a.score).slice(0,3);

    useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % trending.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [trending.length])


  async function handlePublish(newReview) {
    await supabase.from('reviews').insert([newReview]);
    await loadReviews();
    setShowNew(false);
  }

  function handleAdminClick() {
    setShowLogin(true);
  }

  async function loadReviews() {
    const { data, error } = await supabase.from('reviews').select('*');
    if (data) setReviews(data);
    }

  async function loadComments() {
    const { data } = await supabase.from('comments').select('*');
    if (data) setAllComments(data);
  }
  
  async function loadClicks() {
    const { data } = await supabase.from('clicks').select('*');
    if (data) setAllClicks(data);
  }


  return (
    <div className="app">

      {/* Nav */}
      <nav className="nav">
        <h1 className="blogName">Jasmine Tries Everything 🌸</h1>
        <button className="openButton" onClick={() => handleAdminClick()}>
          + New Review
        </button>
      </nav>

      {/* Hero */}
      <section className="hero">
        <h2>No fluff skincare reviews,<br/>real results from me!</h2>
        <p>Are you a chud? Chud no longer using my honest takes, zero sponsorships, all vibes.</p>
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
      <div className="carousel">
          {trending.map((r, i) => {
              const offset = (i - activeIndex + trending.length) % trending.length;
              return (
                  <div 
                      key={r.id} 
                      className={`carouselCard offset-${offset}`}
                      onClick={() => setDetail(r)}
                  >
                      <ReviewCard review={r} onClick={() => setDetail(r)} />
                  </div>
              );
          })}
      </div>

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

      {/* Footer */}
      <footer className = "footer">
        <p>Made with 💕 by Angelo, for Jasmine (you should change this to your socials xdd, maybe with a little container, we can make a cute lil logo or smn and spam it around the page HEHE)</p>
      </footer>
      {/* Modals */}
      {showNew && <NewReviewModal onClose={() => setShowNew(false)} onPublish={handlePublish}/>}
      {detail && <DetailModal review={detail} onClose={() => setDetail(null)}/>}
      {showLogin && (
        <LoginModal 
          onClose={() => setShowLogin(false)} 
          onSuccess={() => { setShowLogin(false); setShowNew(true); }}
      />)}
    </div>
  );
}