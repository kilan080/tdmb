'use client'
import React, { useEffect } from 'react';
import { config } from '@/service/service_2';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function Page() {
    const { id } = useParams();
    console.log('getting id ', id);
    

    // const url = `https://www.themoviedb.org/movie/${id}`;
    // const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjQ0YzkzNjk3MzcyYzk5ZDY5YjU5MjYyY2I2NjhkMCIsIm5iZiI6MTc1MTI5Mjg2NC42NTkwMDAyLCJzdWIiOiI2ODYyOWJjMGMwN2QyZTVjZjAzMDQ4MzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZosBHSGmiHBXFEgyml673qLAEg5JbfUXfaiCDZxvjuk';

    const getTvShowDetails = async () => {
        try {
            const res = await axios.get(`${config.baseUrl}${config.subUrl.tvshows}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log('datas>>>', res)
        } catch (error) {
            console.log('error getting datas ', error)
        }
    }
    useEffect(() => {
        getTvShowDetails();
    }, [id])

    return (
        <div>page</div>
    )
}
