'use client'
import React, { useEffect, useState, useCallback } from 'react';
import tmdbApi, { config } from '@/service/service_2';
import { useParams } from 'next/navigation';
import ReactPlayer from 'react-player';
import Image from 'next/image';
import Modal from 'react-modal';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { FaHeart } from 'react-icons/fa';
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoIosMenu, IoIosPlay } from "react-icons/io";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoCalendarSharp } from "react-icons/io5";
import './tvshow[id].css';

export default function Page() {
    const { id } = useParams();
    const [tvShowDetails, setTvShowDetails] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Most Popular');

    const [isOpen, setIsOpen] = useState(false);
    const [startIndex, setStartIndex] = useState(0);


    const getTvShowDetails =  useCallback(async () => {
        try {
            const res = await tmdbApi.get(`${config.subUrl.tvDetails}/${id}?append_to_response=credits,recommendations,videos,images`);
            setTvShowDetails(res.data);
            console.log('TV Show Details:', res.data);
        } catch (error) {
        console.error('error fetching details ', error);
        }
    }, [id]);
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

    function PosterGallery({ posters }) {
        const galleryItems = posters?.slice(0, 6).map((image) => ({
            original: `https://image.tmdb.org/t/p/w300${image.file_path}`,
            thumbnail: `https://image.tmdb.org/t/p/w200${image.file_path}`,
        })) || [];
        return (
            <ImageGallery
                items={galleryItems}
                showFullscreenButton={true}
                showPlayButton={false}
            />
            );
        }
        
    const galleryItems =
    tvShowDetails?.images?.posters?.slice(0, 6).map((image) => ({
        original: `https://image.tmdb.org/t/p/w300${image.file_path}`,
        thumbnail: `https://image.tmdb.org/t/p/w200${image.file_path}`,
    })) || [];

    useEffect(() => {
      getTvShowDetails();
    }, [getTvShowDetails]);

    if (!tvShowDetails) return <p>Loading...</p>;

  return (
    <div>
      <div
            className="img-back"
            style={{
                backgroundImage: tvShowDetails?.backdrop_path
                ? `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.3)), url(https://image.tmdb.org/t/p/original${tvShowDetails.backdrop_path})`
                : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
            >
            <Image className='tv-show-backdrop'
                src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${tvShowDetails.poster_path || tvShowDetails.backdrop_path}`}
                alt={tvShowDetails.name}
                onClick={() => fetchTrailer(tvShowDetails.id, 'tv')}
                style={{ backgroundImage: tvShowDetails?.backdrop_path
                    ? `url(https://image.tmdb.org/t/p/original${tvShowDetails.backdrop_path})`
                    : 'none',}}
                width={300}
                height={450}
            />
            <div className='tv-show-details'>
                <h1>{tvShowDetails.name} ({tvShowDetails.first_air_date?.slice(0, 4)})</h1>
                
                <div className='under-details'>
                    <p className='facts'>TV-MA</p>
                    <p className='genres'>{tvShowDetails.genres?.map(g => g.name).join(', ')}</p>
                    {tvShowDetails.runtime && (
                    <p className='runtime'>{minutesToHours(tvShowDetails.runtime)}</p>
                    )}
                </div>

                <div className='user-vibe'>
                        <div className="undo">
                            {tvShowDetails.vote_average && (
                            <span className='badge'>
                                {Math.round(tvShowDetails.vote_average * 10)}%
                            </span>
                            )}
                                

                            <div className="emoji-set">
                                {getEmojiSetByScore(tvShowDetails.vote_average * 10).map((emoji, index) => (
                                    <span key={index} className="emoji" style={{ left: `${index * 14}px` }}>
                                        {emoji}
                                    </span>
                                ))}
                            </div>
                        </div>
                        
                        <div className='vibe'>
                            <h5>What&apos;s your <span className='und'>vibe</span>? <IoInformationCircleOutline className='con' /></h5>
                        </div>
                </div>

                <div className='menu-love-mark'>
                    <div className='all'><IoIosMenu /></div>
                    <div className='all'><FaHeart /></div>
                    <div className='all'><IoBookmarkOutline /></div>
                    <button onClick={() => fetchTrailer(tvShowDetails.id, 'tv')} className='play-button'><IoIosPlay /> Play Trailer</button>
                </div>

                <p className='tagline'>{tvShowDetails.tagline}</p>

                <div className='overview-section'>
                    <h3>Overview</h3>
                    <p>{tvShowDetails.overview}</p>
                </div>
                <div className='profile'>
                    <a
                        // href={
                        // tvShowDetails.created_by?.[0]?.id
                        //     ? `https://www.themoviedb.org/person/${tvShowDetails.created_by[0].id}`
                        //     : '#'
                        // }
                    >
                        <p className='character'>{tvShowDetails.created_by?.[0]?.name}</p>
                    </a>
                    <p>Creator</p>
                </div>
            </div>
      </div>
      <div className='series-info'>
            <h3>Series Cast</h3>
            <div className='people-scroller'>
                {tvShowDetails?.credits?.cast?.map((person, index) => (
                    <div key={`${person.id}-${index}`} className='cast'>
                        <Image className='cast-image'
                            src={`https://media.themoviedb.org/t/p/w138_and_h175_face/${person.profile_path}`}
                            alt={person.name}
                            width={138}
                            height={175}
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
      <div className='media'>
            <div className='media-tab'>
                <h3>Media</h3>
                <nav>
                    <button className={activeTab === 'Most Popular' ? 'active' : ''} onClick={() => setActiveTab('Most Popular')}>
                        Most Popular {tvShowDetails?.images?.backdrops?.length || 0}
                    </button>
                    <button className={activeTab === 'Videos' ? 'active' : ''} onClick={() => setActiveTab('Videos')}>
                        Videos {tvShowDetails?.videos?.results?.length || 0}
                    </button>
                    <button className={activeTab === 'Backdrops' ? 'active' : ''} onClick={() => setActiveTab('Backdrops')}>
                        Backdrops {tvShowDetails?.images?.backdrops?.length || 0}
                    </button>
                    <button className={activeTab === 'Posters' ? 'active' : ''} onClick={() => setActiveTab('Posters')}>
                        Posters {tvShowDetails?.images?.posters?.length || 0}
                    </button>
                </nav>
            </div>
            <div className='media-content'>
                {activeTab === 'Most Popular' && (
                    <div className='media-images'>
                        {tvShowDetails?.images?.backdrops?.slice(0, 6).map((image, index) => (
                            <Image
                                key={`${image.file_path}-${index}`}
                                src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                                alt={image.file_path}
                                className='media-image'
                                width={500}
                                height={281}
                            />
                        ))}
                    </div>
                )}
                {activeTab === 'Videos' && (
                    <div className='media-videos'>
                        {tvShowDetails?.videos?.results?.slice(0, 6).map((video, index) => (
                            <div key={`${video.key}-${index}`} className='video-thumb' onClick={() => fetchTrailer(tvShowDetails.id, 'tv')}>
                                <Image
                                    src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                                    alt={video.name}
                                    className='media-vid'
                                    width={500}
                                    height={281}
                                />
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === 'Backdrops' && (
                    <div className='media-images'>
                        {tvShowDetails?.images?.backdrops?.slice(0, 6).map((image, index) => (
                           <Image
                                key={`${image.file_path}-${index}`}
                                src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                                alt={image.file_path}
                                className='media-image' 
                                width={500}
                                height={281}    
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
                            alt={`Poster ${index}`}
                            className="media-image"
                            onClick={() => {
                            setStartIndex(index);
                            setIsOpen(true);
                            }}
                        />
                        ))}
                        {isOpen && (
                        <div className="moda-overlay" onClick={() => setIsOpen(false)}>
                            <div className="moda-content" onClick={(e) => e.stopPropagation()}>
                                <button className="clos-btn" onClick={() => setIsOpen(false)}>✖</button>
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
      <div className='rec'>
            <h3>Recommendations</h3>
            <div className='sho'>
                {tvShowDetails?.recommendations?.results?.map((movie) => (
                    <div key={movie.id} onClick={() => fetchTrailer(movie.id, movie.media_type || 'movie')} className='mendation'>
                        <div className='image-wrapper'>
                            <Image
                                src={`https://image.tmdb.org/t/p/w250_and_h141_face/${movie.poster_path}`}
                                alt={movie.name || movie.title}
                                width={250}
                                height={141}
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
