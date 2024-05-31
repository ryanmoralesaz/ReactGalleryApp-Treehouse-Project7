// src/components/PhotoList.jsx
import React, { useEffect } from "react";
import Photo from "./Photo";
import { useParams } from "react-router-dom";

const PhotoList = ({ photos, loading, fetchData }) => {
  // cache the destructured query param from the dynamic route path
  const { query } = useParams();

  // run a useEffect to fetchData when the query is changed or fetchData is called
  useEffect(() => {
    // fetchdata if the query is not null and the photos state doesn't already contain the query term
    // if (query && (!photos[query] || photos[query].length === 0)) {
    if (query && !photos[query]) {
      fetchData(query);
    }
  }, [query, fetchData]);
  const currentPhotos = photos[query] || [];
  return (
    <>
      <h2>
        {/* render a heading of loading if the fetch is in process, otherwise interpolate the query name */}
        {loading
          ? "Loading..."
          : query
          ? query.charAt(0).toUpperCase() + query.slice(1)
          : "Photos"}
      </h2>
      {/* display the photos container no matter what query state */}
      <div className="photo-container">
        {loading ? (
          // if state is loading show the skeleton image cards
          <ul>
            {Array.from({ length: 24 }).map((_, index) => (
              <li key={index} className="skeleton"></li>
            ))}
          </ul>
        ) : currentPhotos.length > 0 ? (
          // if photos are returned map the photos array to the Photo component with a unique key from the api
          <ul>
            {currentPhotos.map((photo) => (
              <Photo key={photo.id} photo={photo} />
            ))}
          </ul>
        ) : (
          // if no photos were returned display a not found message
          <div className="not-found">
            <h2>No Results Found</h2>
            <h3>That search did not return any results, please try again.</h3>
          </div>
        )}
      </div>
    </>
  );
};
export default PhotoList;
