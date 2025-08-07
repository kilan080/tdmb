'use client'
import React, { useEffect, useState } from 'react';
import tmdbApi, { config } from '@/service/service_2';
import { useParams } from 'next/navigation';
import { FaHeart } from 'react-icons/fa';
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoIosMenu, IoIosPlay } from "react-icons/io";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoCalendarSharp } from "react-icons/io5";
import './tvshow[id].css';

export default function Page() {
  const { id } = useParams();
  const [tvShowDetails, setTvShowDetails] = useState(null);

  const getTvShowDetails = async () => {
    try {
      const res = await tmdbApi.get(`${config.subUrl.tv}/${id}?append_to_response=credits,recommendations`);
      setTvShowDetails(res.data);
      console.log('TV Show Details:', res.data);
    } catch (error) {
      console.error('error fetching details ', error);
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

  useEffect(() => {
    if (id) getTvShowDetails();
  }, [id]);

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
            <img className='tv-show-backdrop'
                src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${tvShowDetails.poster_path || tvShowDetails.backdrop_path}`}
                alt={tvShowDetails.name}
                style={{ backgroundImage: tvShowDetails?.backdrop_path
                    ? `url(https://image.tmdb.org/t/p/original${tvShowDetails.backdrop_path})`
                    : 'none',}}
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
                            <h5>What's your <span className='und'>vibe</span>?<IoInformationCircleOutline /></h5>
                        </div>
                </div>

                <div className='menu-love-mark'>
                    <div className='all'><IoIosMenu /></div>
                    <div className='all'><FaHeart /></div>
                    <div className='all'><IoBookmarkOutline /></div>
                    <button className='play-button'><IoIosPlay /> Play Trailer</button>
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
                {tvShowDetails?.credits?.cast?.map((person) => (
                    <div key={person.id} className='cast'>
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
                {tvShowDetails?.recommendations?.results?.map((movie) => (
                    <div key={movie.id} className='mendation'>
                        <div className='image-wrapper'>
                            <img
                            src={`https://image.tmdb.org/t/p/w250_and_h141_face/${movie.poster_path}`}
                            alt={movie.name || movie.title}
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
    </div>
  )
}
