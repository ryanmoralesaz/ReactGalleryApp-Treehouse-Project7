// src/components/PhotoList.jsx
import React, { useEffect } from 'react';
import Photo from './Photo';
import { useParams } from 'react-router-dom';
const PhotoList = ({ photos, loading, topic, fetchData }) => {
  const { query } = useParams();

  useEffect(() => {
    if (query && (!photos[query] || !photos[query].length)) {
      fetchData(query);
    }
  }, [query, photos, fetchData]);
  const currentPhotos = photos[query] || [];
  return (
    <>
      <h2>
        {loading
          ? 'Loading...' :
         query ? query.charAt(0).toUpperCase() + query.slice(1) : 'Photos'}
      </h2>
      <div className='photo-container'>
        {loading ? (
          <ul>
            {Array.from({ length: 24 }).map((_, index) => (
              <li key={index} className='skeleton'></li>
            ))}
          </ul>
        ) : currentPhotos.length > 0 ? (
          <ul>
            {currentPhotos.map((photo) => (
              <Photo key={photo.id} photo={photo} />
            ))}
          </ul>
        ) : (
          <div className='not-found'>
            <h2>No Results Found</h2>
            <h3>That search did not return any results, please try again.</h3>
          </div>
        )}
      </div>
    </>
  );
};
export default PhotoList;
