'use client';
import tmdbApi from '@/service/service_2';
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import './people[id].css';

export default function Page() {
  const { id } = useParams();
  const [peopleDetails, setPeopleDetails] = useState(null);

  const getPeopleDetails = useCallback(async () => {
    try {
      const res = await tmdbApi.get(`/3/person/${id}?append_to_response=movie_credits,tv_credits`);
      setPeopleDetails(res.data);
      console.log('people details:', res.data);
    } catch (error) {
      console.error('error fetching person details:', error);
    }
  }, [id]);

  useEffect(() => {
    getPeopleDetails();
  }, [getPeopleDetails]);

  if (!peopleDetails) return <p>Loading...</p>;

  return (
    <div className='people-detail'>
        <div className='head-name'>
            <div className='sec'>
                <Image
                  src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${peopleDetails.profile_path}`}
                  alt={peopleDetails.name}
                  width={300}
                  height={450}
                />
                <div className='pers-info'>
                    <h3>Personal Info</h3>

                    <h5>Known For</h5>
                    <p>{peopleDetails.known_for_department || 'N/A'}</p>

                    <h5>Known Credits</h5>
                    <p>{peopleDetails.known_for || 'N/A'}</p>

                    <h5>Gender</h5>
                    <p>{peopleDetails.gender === 1 ? 'Female' : 'Male'}</p>

                    <h5>Birthday</h5>
                    <p>{peopleDetails.birthday || 'N/A'}</p>

                    <h5>Place of Birth</h5>
                    <p>{peopleDetails.place_of_birth || 'N/A'}</p>

                    <h5>Also Known As</h5>
                    <ul> {peopleDetails.also_known_as?.map((name, idx) => (<li key={idx}>{name}</li> ))}</ul>
                       
                </div>
          </div>
            <div className='info'>
                <h2><a>{peopleDetails.name}</a></h2>
                <h3>Biography</h3>
                {peopleDetails.biography
                    .split('\n')
                    .filter((para) => para.trim() !== '')
                    .map((para, index) => (
                    <p key={index}>{para}</p>
                ))}

                <div className='known'>
                    <h3>Known For</h3>
                    <div className='known-mov'>
                        {peopleDetails?.tv_credits?.cast?.map((show, index) => (
                            <div className='known-mg' key={`${show.id}-${index}`}>
                                <Image
                                  src={`https://media.themoviedb.org/t/p/w150_and_h225_bestv2${show.poster_path}`}
                                  alt={show.name}
                                  width={150}
                                  height={225}
                                />
                                <p>{show.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
