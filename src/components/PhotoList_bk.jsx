import React, { useEffect } from 'react';

const PhotoList = ({ topic, photos, loading, setTopic }) => {
  useEffect(() => {
    setTopic(topic);
  }, [topic, setTopic]);

  return (
    <div>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <ul>
          {photos.map((photo) => (
            <li key={photo.id}>
              <img
                src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
                alt={photo.title}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PhotoList;