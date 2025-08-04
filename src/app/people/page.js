'use client';
import React, { useEffect, useState } from 'react';
import tmdbApi, { config } from '@/service/service_2';
import './people.css';

export default function Page() {
   const [people, setPeople] = useState([]);

   useEffect(() => {
      const fetchPeople = async () => {
         try {
            const res = await tmdbApi.get(`${config.subUrl.popularPeople}`);
            setPeople(res.data.results || []);
            console.log('popular people:', data.results);
         } catch (error) {
            console.error('error fetching people:', error);
         }
      };

      fetchPeople();
   }, []);

   return (
      <div className="main-peoples">
         <div className="people-header">
            <h2 className="ple">Popular People</h2>
         </div>
         <div className="people-list">
            {people.map((person, index) => {
               const imagePath = person.profile_path;

               return (
                  <div className="people-card" key={person.id || index}>
                     <div className="image-image-container">
                        <a
                           href={`https://www.themoviedb.org/person/${person.id}`}
                           target="_blank"
                           rel="noopener noreferrer"
                        >
                           <img
                              src={
                                 imagePath
                                    ? `https://image.tmdb.org/t/p/w500${imagePath}`
                                    : 'https://via.placeholder.com/500x750?text=No+Image'
                              }
                              alt={person.name || 'Unnamed'}
                           />
                        </a>
                     </div>
                     <div className="person_info">
                        <p className="person-name">{person.name}</p>
                        <p className="person-movies">
                           {person.known_for
                              ?.slice(0, 3)
                              .map((item) => item.title || item.name)
                              .join(', ') || 'N/A'}
                        </p>
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   );
}
