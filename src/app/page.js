'use client'
import React from 'react';

import './page.css'
import Navbar from '@/components/nav/Navbar';
import SearchBar from '@/components/search_bar/Search_bar';
import Trending from '@/components/trending/Trending'
import Opra from '@/components/latest_thriller/latest_thriller';
import Popular from '@/components/whats_popular/whats_popular';
import Free from '@/components/free_watch/free_watch';
import Join from '@/components/join/join';
import Board from '@/components/board/board';
import Footer from '@/components/footer/footer';


const page = () => {
  return (
    <div className='page'>
      <Navbar />
      <SearchBar />
      <Trending />
      <Opra />
      <Popular />
      <Free />
      <Join />
      <Board />
      <Footer />
        
    </div>
  )
}

export default page
