import { Routes, Route } from 'react-router-dom';

import Dashboard from './layouts/dashboard';
import './App.scss';

import Callback from './pages/callback/';
import Search from './pages/search/';
import Home from './pages/index';
import Auth from './pages/auth';
import Artists from './pages/artists';
import Artist from './pages/artists/artist/';
import Songs from './pages/songs';
import Lyrics from './pages/songs/lyrics/';
import Album from './pages/albums/album/';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index  element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/search" element={<Search />} />
          <Route path="/artists" element={<Artists />} />
          <Route exact  path="/artist/:id" element={<Artist />} />
          <Route path="/songs" element={<Songs />} />
          <Route exact path="/song/:id" element={<Lyrics />} />
          <Route exact path="/album/:id" element={<Album />} />
        </Route>
      </Routes>
  );
}

export default App;
