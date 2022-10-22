import { Routes, Route } from 'react-router-dom';

import Dashboard from './layouts/dashboard';

//Pages
import Home from './pages/home';
import Artists from './pages/artists';
import Songs from './pages/songs';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index  element={<Home />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/songs" element={<Songs />} />
        </Route>
      </Routes>
  );
}

export default App;
