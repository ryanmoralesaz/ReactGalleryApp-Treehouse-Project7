// src/components/PhotoList.jsx
import React, { useEffect } from 'react';
import Photo from './Photo';
import { useParams } from 'react-router-dom';
const PhotoList = ({ photos, loading, topic, fetchData }) => {
  const { query } = useParams();

  useEffect(() => {
    if (!photos.length && fetchData) {
      fetchData(query);
    } 
  }, [query, photos.length, fetchData]);

  return (
    <>
      <h2>
        {topic ? topic.charAt(0).toUpperCase() + topic.slice(1) : 'Photos'}
      </h2>
      <div className='photo-container'>
        {loading ? (
          <h2>Loading...</h2>
        ) : photos.length > 0 ? (
          <ul>
            {photos.map((photo) => (
              <Photo key={photo.id} photo={photo} />
            ))}
          </ul>
        ) : (
          <>
            <h2>No Results Found</h2>
            <h3>That search did not return any results, please try again.</h3>
          </>
        )}
      </div>
    </>
  );
};
export default PhotoList;
