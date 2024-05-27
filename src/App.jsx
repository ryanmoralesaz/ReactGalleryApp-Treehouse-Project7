import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import apiKey from './config';

import './App.css';

// Component Imports
import PhotoList from './components/PhotoList';
import Search from './components/Search';
import Nav from './components/Nav';
import NotFound from './components/NotFound';

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState('cats');

  const fetchData = async (query) => {
    setLoading(true);
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`;

    try {
      const response = await axios.get(url);
      setPhotos(response.data.photos.photo);
    } catch (error) {
      console.error('Error fetching and parsing data', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(topic); // Default fetch for the initial load
  }, [topic]);

  return (
    <div className='App'>
      <Nav />
      <Search />
      <Routes>
        <Route path='/' element={<Navigate replace to='/cats' />} />
        <Route
          path='/cats'
          element={
            <PhotoList
              topic='cats'
              photos={photos}
              loading={loading}
              setTopic={setTopic}
            />
          }
        />
        <Route
          path='/dogs'
          element={
            <PhotoList
              topic='dogs'
              photos={photos}
              loading={loading}
              setTopic={setTopic}
            />
          }
        />
        <Route
          path='/computers'
          element={
            <PhotoList
              topic='computers'
              photos={photos}
              loading={loading}
              setTopic={setTopic}
            />
          }
        />
        <Route
          path='/search/:query'
          element={
            <PhotoList
              photos={photos}
              loading={loading}
              setTopic={setTopic}
            />
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
