'use client'
import React, { useEffect, useState } from 'react';
import tmdbApi, { config } from '@/service/service_2';
import { useParams } from 'next/navigation';
import ReactPlayer from 'react-player';
import Modal from 'react-modal';
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoIosMenu, IoIosPlay } from "react-icons/io";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoCalendarSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import './movies.css';

Modal.setAppElement('body');

export default function Page() {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState([]);
    const [videoUrl, setVideoUrl] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getMovieDetails = async () => {
        try {
            const res = await tmdbApi.get(`${config.subUrl.movieDetails}/${id}?append_to_response=credits,recommendations`);
            setMovieDetails(res.data);
            console.log('movie Details:', res.data);
        } catch (error) {
            console.error('error fetching movie details', error);
        }
    }
    const fetchTrailer = async (id, type = 'movie') => {
        try {
            const res = await tmdbApi.get(`/3/${type}/${id}/videos`);
            console.log('Video API response:', res.data);
            
            const trailer = res.data.results.find(
                (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
            );

            if (trailer) {
                const trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
                console.log('Trailer URL:', trailerUrl);
                setVideoUrl(trailerUrl);
                setIsModalOpen(true);
            } else {
                alert('No trailer found for this movie');
            }
        } catch (error) {
            console.error('Error fetching trailer:', error);
        }
    }

    function getEmojiSetByScore(score) {
        if (score >= 80) return ["😍", "😊", "🔥"];
        if (score >= 60) return ["😊", "😐", "🤔"];
        if (score >= 40) return ["😐", "😕", "🙄"];
        return ["😕", "😡", "💩"];
    }

    const minutesToHours = (mins) => {
        const hours = Math.floor(mins / 60);
        const minutes = mins % 60;
        return `${hours}h ${minutes}m`;
    };

    if (!movieDetails) return <p>Loading...</p>;

    useEffect(() => {
        if (id) getMovieDetails();
    }, [id]);


  return (
    <div>
      <div className="im-back" style={{
                backgroundImage: movieDetails?.backdrop_path
                ? `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.3)), url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`
                : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                
            }}>
            <img className='tv-show-backdrop'
                src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movieDetails.poster_path || movieDetails.backdrop_path}`}
                alt={movieDetails?.name || movieDetails?.title || ''}
                onClick={() => fetchTrailer(movieDetails.id, 'movie')}
                style={{ backgroundImage: movieDetails?.backdrop_path
                    ? `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`
                    : 'none',}}
            />
            <div className='tv-show-details'>
                <h1>{movieDetails?.title} ({movieDetails?.release_date?.slice(0, 4)})</h1>

                <div className='under-details'>
                    <p className='facts'>TV-MA</p>
                    <p className='genres'>{movieDetails.genres?.map(g => g.name).join(', ')}</p>
                    {movieDetails.runtime && (
                    <p className='runtime'>{minutesToHours(movieDetails.runtime)}</p>
                    )}
                </div>

                <div className='user-vibe'>
                    <div className="undo">
                        {movieDetails.vote_average && (
                        <span className='badge'>
                            {Math.round(movieDetails.vote_average * 10)}%
                        </span>
                        )}
                            
                        <div className="emoji-set">
                            {getEmojiSetByScore(movieDetails.vote_average * 10).map((emoji, index) => (
                                <span key={index} className="emoji" style={{ left: `${index * 14}px` }}>
                                    {emoji}
                                </span>
                            ))}
                        </div>
                    </div>
                    
                    <div className='vibe'>
                        <h5>What's your <span className='und'>vibe</span>?<IoInformationCircleOutline /></h5>
                    </div>
                </div>
                <div className='menu-love-mark'>
                    <div className='all'><IoIosMenu /></div>
                    <div className='all'><FaHeart /></div>
                    <div className='all'><IoBookmarkOutline /></div>
                    <button onClick={() => fetchTrailer(movieDetails.id, 'movie')} className='play-button'><IoIosPlay /> Play Trailer</button>
                </div>

                <p className='tagline'>{movieDetails.tagline}</p>

                <div className='overview-section'>
                    <h3>Overview</h3>
                    <p>{movieDetails.overview}</p>
                </div>

                <div className='profile'>
                    <p className='character'>{movieDetails.created_by?.[0]?.name}</p>
                    <p>Creator</p>
                </div>

            </div>
      </div>
        <div className='series-info'>
            <h3>Series Cast</h3>
            <div className='people-scroller'>
                {movieDetails?.credits?.cast?.map((person) => (
                    <div key={person.id}  className='cast'>
                        <img className='cast-image'
                            src={`https://media.themoviedb.org/t/p/w138_and_h175_face/${person.profile_path}`}
                            alt={person.name}
                        />
                        <div className='cast-epi'>
                            <p className='cast-name'>{person.name}</p>
                            <p className='char'>{person.character}</p>
                            <p className='episodes'>Episodes: {person.total_episode_count || person.episode_count}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className='rec'>
            <h3>Recommendations</h3>
            <div className='sho'>
                {movieDetails?.recommendations?.results?.map((movie) => (
                    <div key={movie.id} onClick={() => fetchTrailer(movie.id, movie.media_type || 'movie')} className='mendation'>
                        <div className='image-wrapper'>
                            <img
                            src={`https://image.tmdb.org/t/p/w250_and_h141_face/${movie.poster_path}`}
                            alt={movieDetails?.name || movieDetails?.title || ''}
                            />
                            <div className="air-date-overlay">
                                <IoCalendarSharp /> {movie.first_air_date || movie.release_date}
                            </div>
                        </div>
                        <div className='two-rec'>
                            <p className='rec-1'>{movie.name || movie.title}</p>
                            <p className='rec-2'>{Math.round(movie.vote_average * 10)}%</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} overlayClassName="custom-modal-overlay"
            className="custom-modal-content" >
       
            <div className="react-player-wrapper">
                <ReactPlayer
                src={videoUrl}
                playing={false}
                controls
                width="100%"
                height="100%"
                className="react-player"
                />
            </div>

            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                ✖
            </button>
        </Modal>
    </div>
  )
}
