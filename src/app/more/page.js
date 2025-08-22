'use client';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import Image from "next/image";
import Modal from 'react-modal';
import tmdbApi, { config } from '@/service/service_2';
import './default.css';


Modal.setAppElement('body');

export default function Page() {
  const [movies, setMovies] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  const fetchMovies = async () => {
    try {
      const res = await tmdbApi.get(config.subUrl.popularMovies);
      setMovies(res.data.results || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

 
  const fetchTrailer = async (movieId) => {
    try {
      const res = await tmdbApi.get(`/3/movie/${movieId}/videos`);
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
  };
    

  useEffect(() => {
    fetchMovies();
  }, []);

  console.log('Movies trailer url', videoUrl);

  return (
    <div>
      <h1 className="text-2xl text-black pl-3">Popular Movies</h1>
      <div className="mov-list">
        {movies.map((movie, index) => {
          const imagePath =
            movie.poster_path ||
            movie.backdrop_path ||
            movie.profile_path;

          return (
            <div
              className="movie-card"
              key={movie.id || index}
              onClick={() => fetchTrailer(movie.id)}
            >
              <div className="movi-image-container">
                <Image
                  src={
                    imagePath
                      ? `https://image.tmdb.org/t/p/w500${imagePath}`
                      : 'https://via.placeholder.com/500x750?text=No+Image'
                  }
                  width={500}
                  height={750}
                  alt={movie.title || movie.name || 'Untitled'}
                />
              </div>
            </div>
          );
        })}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            zIndex: 1000,
          },
          content: {
            // backgroundCol: 'transparent',
            border: 'none',
            width: '80%',
            maxWidth: '900px',
            margin: 'auto',
            padding: 0,
            overflow: 'hidden',
            position: 'relative',
          },
        }}
      >
        <div className='react-player-wrapper'>
          <ReactPlayer
            src={videoUrl}
            playing
            controls
            width="100%"
            height="100%"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
          
        </div>

        <button onClick={() => setIsModalOpen(false)} >
          ✖
        </button>
      </Modal>
    </div>
  );
}
