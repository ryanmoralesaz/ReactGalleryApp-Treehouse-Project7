import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiKey from './config';
import './App.css';

// Component Imports
import PhotoList from './components/PhotoList';
import Search from './components/Search';
import Nav from './components/Nav';
import NotFound from './components/NotFound';

function App() {
  const [photos, setPhotos] = useState({
    cats: [],
    dogs: [],
    computers: []
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [topic, setTopic] = useState('cats');

  const fetchData = async (query) => {
    setLoading(true);
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`;

    try {
      const response = await axios.get(url);
      setPhotos((prevPhotos) => ({
        ...prevPhotos,
        [query]: response.data.photos.photo
      }));
      setTopic(query);
    } catch (error) {
      console.error('Error fetching and parsing data', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const preloadTopics = async () => {
      await fetchData('cats');
      await fetchData('dogs');
      await fetchData('computers');
    };
    preloadTopics();
  }, []);

  const handleSearch = (query) => {
    if (photos[query]) {
      setTopic(query);
      navigate(`/search/${query}`);
    } else { 

      fetchData(query);
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className='App'>
      <Nav />
      <Search onSearch={handleSearch} />
      <Routes>
        <Route path='/' element={<Navigate replace to='/cats' />} />
        <Route
          path='/cats'
          element={
            <PhotoList
              topic='cats'
              photos={photos}
              loading={loading}
              fetchData={fetchData}
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
              fetchData={fetchData}
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
              fetchData={fetchData}
            />
          }
        />
        <Route
          path='/search/:query'
          element={
            <PhotoList
              photos={photos}
              loading={loading}
              fetchData={fetchData}
            />
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
