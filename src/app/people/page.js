'use client'
import React, { useEffect, useState } from 'react'
import './people.css'

export default function Page() {
  const url = 'https://api.themoviedb.org/3/person/popular'
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjQ0YzkzNjk3MzcyYzk5ZDY5YjU5MjYyY2I2NjhkMCIsIm5iZiI6MTc1MTI5Mjg2NC42NTkwMDAyLCJzdWIiOiI2ODYyOWJjMGMwN2QyZTVjZjAzMDQ4MzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZosBHSGmiHBXFEgyml673qLAEg5JbfUXfaiCDZxvjuk'

  const [people, setPeople] = useState([])

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const data = await res.json()
        setPeople(data.results || [])
        console.log('popular people:', data.results)
      } catch (error) {
        console.error('error fetching people:', error)
      }
    }

    fetchPeople()
  }, []);

  return (
    <div className='main-peoples'>
      <div className='people-header'>
        <h2 className="ple">Popular People</h2>
      </div>
      <div className='people-list'>
        {people.map((person, index) => {
          const imagePath = person.profile_path

          return (
            <div className='people-card' key={person.id || index}>
              <div className='image-image-container'>
                <a
                  href={`https://www.themoviedb.org/person/${person.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={
                      imagePath
                        ? `https://image.tmdb.org/t/p/w500${imagePath}`
                        : "https://via.placeholder.com/500x750?text=No+Image"
                    }
                    alt={person.name || "Unnamed"}
                  />
                </a>
              </div>
              <div className="person_info">
                <p className="person-name">{person.name}</p>
                <p className="person-movies">
                  {person.known_for?.slice(0, 3).map(item => item.title || item.name).join(", ") || "N/A"}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
