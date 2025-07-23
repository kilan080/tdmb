'use client';

import React from 'react';

import './page.css';
import SearchBar from '@/components/search_bar/Search_bar';
import Trending from '@/components/trending/Trending';
import Opra from '@/components/latest_thriller/latest_thriller';
import Popular from '@/components/whats_popular/whats_popular';
import Free from '@/components/free_watch/free_watch';
import Join from '@/components/join/join';
import Board from '@/components/board/board';


export default function Page() {
  return (
      <div className="page">
          <SearchBar />
          <Trending />
          <Opra />
          <Popular />
          <Free />
          <Join />
          <Board />
      </div>
  );
}
