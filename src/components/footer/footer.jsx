import React from "react";
import './footer.css'

export default function Footer() {

    
    return (
        <div className="section-footer">
                <div className="one">
                    <img src="/movie-logo.svg" alt="" />
                    <button>JOIN THE COMMUNITY</button>
                </div>
                <div className="two">
                    <h3>THE BASICS</h3>
                    <ul>
                        <li><a href="">About TMDB</a></li>
                        <li><a href="">Contact Us </a></li>
                        <li><a href="">Support Forums</a></li>
                        <li><a href="">API Documentation</a></li>
                        <li><a href="">System Status</a></li>
                    </ul>
                </div>
                <div className="three">
                    <h3>GET INVOLVED</h3>
                    <ul>
                        <li><a href="">CContribution Bible</a></li>
                        <li><a href="">Add New Movies</a></li>
                        <li><a href="">Add New TV Shows</a></li>
                    </ul>
                </div>
                <div className="four">
                    <h3>COMMUNITY</h3>
                    <ul>
                        <li><a href="">Guidlines</a></li>
                        <li><a href="">Discussions</a></li>
                        <li><a href="">Leaderboard</a></li>
                    </ul>
                </div>
                <div className="five">
                    <h3>LEGAL</h3>
                    <ul>
                        <li><a href="">Terms of Use</a></li>
                        <li><a href="">API Terms Of Use</a></li>
                        <li><a href="">Privacy Policy</a></li>
                        <li><a href="">DMCA Policy</a></li>
                    </ul>
                </div>
        </div>
    )
}