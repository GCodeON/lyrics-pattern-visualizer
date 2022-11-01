import { Routes, Route } from 'react-router-dom';

import Dashboard from './layouts/dashboard';
import './App.scss';

import Home from './pages/index';
import Artists from './pages/artists/artists';
import Songs from './pages/songs/songs';
import Lyrics from './pages/songs/lyrics/';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index  element={<Home />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/songs" element={<Songs />} />
          <Route exact path="/songs/:id" element={<Lyrics />} />
        </Route>
      </Routes>
  );
}

export default App;
