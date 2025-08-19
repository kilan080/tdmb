import React from 'react'
import './join.css'
// import { useNavigate } from 'react-router-dom'

export default function Join () {

  return (
    <div className='join'>
      <div className="on-join">
        <h2 className="join-header">Join Today</h2>
        <div className="join-two">
            <p className='p-one'>Get access to maintain your own <span>custom personal lists, track what you've seen</span> and search and filter for <span> what to watch</span> next—regardless if it's in theatres, on TV or available on popular streaming services like Netflix, Amazon Prime Video, FlixOlé, Zee5, and Sun Nxt.</p>
            <ul>
                <li>Enjoy TMDB ad free</li>
                <li><p>Maintain a personal watchlist</p></li>
                <li><p>Filter by your subscribed streaming services and find something to watch</p></li>
                <li><p>Log the movies and TV shows you've seen</p></li>
                <li><p>Build custom lists</p></li>
                <li><p>Contribute to and improve our database</p></li>
            </ul>
        </div>


        <button>Sign Up</button>
      </div>
    </div>
  )
}

