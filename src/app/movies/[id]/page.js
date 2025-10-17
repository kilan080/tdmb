
'use client'
import React, { useEffect, useState, useCallback } from 'react';
import tmdbApi, { config } from '@/service/service_2';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import Modal from 'react-modal';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoIosMenu, IoIosPlay } from "react-icons/io";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoCalendarSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { CiPlay1 } from "react-icons/ci";
import './movies.css';


// Only set this if Modal hasn't been initialized yet
if (typeof window !== 'undefined' && Modal.setAppElement) {
    Modal.setAppElement('body');
}

export default function Page() {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Most Popular');
    const [isOpen, setIsOpen] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getMovieDetails = useCallback(async () => {
        if (!id) return;
        
        try {
            setLoading(true);
            setError(null);
            const res = await tmdbApi.get(`${config.subUrl.movieDetails}/${id}?append_to_response=credits,recommendations,videos,images`);
            setMovieDetails(res.data);
            console.log('movie Details:', res.data);
        } catch (error) {
            console.error('error fetching movie details', error);
            setError('Failed to load movie details');
        } finally {
            setLoading(false);
        }
    }, [id]);

    const fetchTrailer = async (movieId, type = 'movie') => {
        if (!movieId) return;
        
        try {
            const res = await tmdbApi.get(`/3/${type}/${movieId}/videos`);
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
            alert('Error loading trailer');
        }
    };

    function getEmojiSetByScore(score) {
        if (score >= 80) return ["😍", "😊", "🔥"];
        if (score >= 60) return ["😊", "😐", "🤔"];
        if (score >= 40) return ["😐", "😕", "🙄"];
        return ["😕", "😡", "💩"];
    }

    const minutesToHours = (mins) => {
        if (!mins) return '';
        const hours = Math.floor(mins / 60);
        const minutes = mins % 60;
        return `${hours}h ${minutes}m`;
    };

    const galleryItems = movieDetails?.images?.posters?.slice(0, 6).map((image) => ({
        original: `https://image.tmdb.org/t/p/w300${image.file_path}`,
        thumbnail: `https://image.tmdb.org/t/p/w200${image.file_path}`,
    })) || [];

    const handlePosterClick = (index) => {
        setStartIndex(index);
        setIsOpen(true);
    };

    const handleVideoClick = (video) => {
        const trailerUrl = `https://www.youtube.com/watch?v=${video.key}`;
        setVideoUrl(trailerUrl);
        setIsModalOpen(true);
    };

    const handleRecommendationClick = (movie) => {
        window.location.href = `/movie/${movie.id}`;
    };

    useEffect(() => {
        getMovieDetails();
    }, [getMovieDetails]);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!movieDetails) return <div className="no-data">No movie data found</div>;

    return (
        <div className='june'>
            <div>
                <div className="im-back" style={{
                    backgroundImage: movieDetails?.backdrop_path
                        ? `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.3)), url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`
                        : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}>
                    {movieDetails.poster_path && (
                        <div className='tv-show-backdrop-container'>
                            <Image 
                                className='tv-show-backdrop'
                                src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movieDetails.poster_path}`}
                                alt={movieDetails?.title || ''}
                                width={300}
                                height={450}
                                onClick={() => fetchTrailer(movieDetails.id, 'movie')}
                            />
                        </div>
                    )}
                    
                    <div className='tv-show-details'>
                        <h1>{movieDetails?.title} {movieDetails?.release_date && `(${movieDetails.release_date.slice(0, 4)})`}</h1>

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
                                <h5>What&apos;s your <span className='und'>vibe</span>? <IoInformationCircleOutline className='con'/></h5>
                            </div>
                        </div>

                        <div className='menu-love-mark'>
                            <div className='all'><IoIosMenu /></div>
                            <div className='all'><FaHeart /></div>
                            <div className='all'><IoBookmarkOutline /></div>
                            <button 
                                onClick={() => fetchTrailer(movieDetails.id, 'movie')} 
                                className='play-button'
                            >
                                <IoIosPlay /> Play Trailer
                            </button>
                        </div>

                        {movieDetails.tagline && (
                            <p className='tagline'>{movieDetails.tagline}</p>
                        )}

                        <div className='overview-section'>
                            <h3>Overview</h3>
                            <p>{movieDetails.overview}</p>
                        </div>

                        {movieDetails.created_by?.[0] && (
                            <div className='profile'>
                                <p className='character'>{movieDetails.created_by[0].name}</p>
                                <p>Creator</p>
                            </div>
                        )}
                    </div>
                </div>

                {movieDetails?.credits?.cast?.length > 0 && (
                    <div className='series-info'>
                        <h3>Cast</h3>
                        <div className='people-scroller'>
                            {movieDetails.credits.cast.slice(0, 10).map((person) => (
                                <div key={person.id} className='cast'>
                                    {person.profile_path ? (
                                        <Image 
                                            className='cast-image'
                                            src={`https://media.themoviedb.org/t/p/w138_and_h175_face/${person.profile_path}`}
                                            alt={person.name}
                                            width={138}
                                            height={175}
                                        />
                                    ) : (
                                        <div className="cast-image placeholder">No Image</div>
                                    )}
                                    <div className='cast-epi'>
                                        <p className='cast-name'>{person.name}</p>
                                        <p className='char'>{person.character}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className='media'>
                    <div className='media-tab'>
                        <h3>Media</h3>
                        <nav>
                            <button 
                                className={activeTab === 'Most Popular' ? 'active' : ''} 
                                onClick={() => setActiveTab('Most Popular')}
                            >
                                Most Popular ({movieDetails?.images?.backdrops?.length || 0})
                            </button>
                            <button 
                                className={activeTab === 'Videos' ? 'active' : ''} 
                                onClick={() => setActiveTab('Videos')}
                            >
                                Videos ({movieDetails?.videos?.results?.length || 0})
                            </button>
                            <button 
                                className={activeTab === 'Backdrops' ? 'active' : ''} 
                                onClick={() => setActiveTab('Backdrops')}
                            >
                                Backdrops ({movieDetails?.images?.backdrops?.length || 0})
                            </button>
                            <button 
                                className={activeTab === 'Posters' ? 'active' : ''} 
                                onClick={() => setActiveTab('Posters')}
                            >
                                Posters ({movieDetails?.images?.posters?.length || 0})
                            </button>
                        </nav>
                    </div>

                    <div className='media-content'>
                        {activeTab === 'Most Popular' && (
                            <div className='media-images'>
                                {movieDetails?.images?.backdrops?.slice(0, 6).map((image) => (
                                    <Image 
                                        key={image.file_path}
                                        src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                                        alt="Movie backdrop"
                                        width={500}
                                        height={141}
                                        className='media-image'
                                    />
                                ))}
                            </div>
                        )}

                        {activeTab === 'Videos' && (
                            <div className='media-videos'>
                                {movieDetails?.videos?.results?.slice(0, 6).map((video) => (
                                    <div 
                                        key={video.key} 
                                        className='video-thumb' 
                                        onClick={() => handleVideoClick(video)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <Image 
                                            src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                                            alt={video.name}
                                            width={250}
                                            height={141}
                                        />
                                        <CiPlay1 className='play-icon' />
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'Backdrops' && (
                            <div className='media-images'>
                                {movieDetails?.images?.backdrops?.slice(0, 6).map((image) => (
                                    <Image
                                        key={image.file_path}
                                        src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                                        alt="Movie backdrop"
                                        width={500}
                                        height={141}
                                        className='media-image'
                                    />
                                ))}
                            </div>
                        )}

                        {activeTab === 'Posters' && (
                            <div className="media-images">
                                {galleryItems.map((item, index) => (
                                    <Image
                                        key={index}
                                        src={item.thumbnail}
                                        alt={`Poster ${index + 1}`}
                                        width={200}
                                        height={300}
                                        className="media-image"
                                        onClick={handlePosterClick(index)}
                                    />
                                ))}
                                
                                {isOpen && (
                                    <div className="moda-overlay" onClick={() => setIsOpen(false)}>
                                        <div className="moda-content" onClick={(e) => e.stopPropagation()}>
                                            <button className="clos-btn" onClick={() => setIsOpen(false)}>
                                                ✖
                                            </button>
                                            <ImageGallery
                                                items={galleryItems}
                                                startIndex={startIndex}
                                                showThumbnails={false}
                                                showFullscreenButton={false}
                                                showPlayButton={false}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {movieDetails?.recommendations?.results?.length > 0 && (
                    <div className='rec'>
                        <h3>Recommendations</h3>
                        <div className='sho'>
                            {movieDetails.recommendations.results.slice(0, 10).map((movie) => (
                                <div 
                                    key={movie.id} 
                                    onClick={() => fetchTrailer(movie.id, movie.media_type || 'movie')} 
                                    className='mendation'
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className='image-wrapper'>
                                        {movie.poster_path ? (
                                            <Image
                                                src={`https://image.tmdb.org/t/p/w250_and_h141_face${movie.poster_path}`}
                                                alt={movie.name || movie.title}
                                                width={350}
                                                height={141}
                                            />
                                        ) : (
                                            <div className="placeholder-image">No Image</div>
                                        )}
                                        {(movie.first_air_date || movie.release_date) && (
                                            <div className="air-date-overlay">
                                                <IoCalendarSharp /> {movie.first_air_date || movie.release_date}
                                            </div>
                                        )}
                                    </div>
                                    <div className='two-rec'>
                                        <p className='rec-1'>{movie.name || movie.title}</p>
                                        <p className='rec-2'>{Math.round(movie.vote_average * 10)}%</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <Modal 
                    isOpen={isModalOpen} 
                    onRequestClose={() => setIsModalOpen(false)} 
                    overlayClassName="custom-modal-overlay"
                    className="custom-modal-content"
                >
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
        </div>
    );
}
