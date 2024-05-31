import React, { useState, useEffect, useCallback, useRef } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import apiKey from "./config";
import "./App.css";

// Component Imports
import PhotoList from "./components/PhotoList";
import Search from "./components/Search";
import Nav from "./components/Nav";
import NotFound from "./components/NotFound";

function App() {
  // initialize the state with empty arrays to hold the prefetched data for the default 3 topics
  const [photos, setPhotos] = useState({
    cats: [],
    dogs: [],
    computers: [],
  });
  // initialize the state for tracking loading attempts
  // const [loading, setLoading] = useState(true);
  const [loadingCount, setLoadingCount] = useState(0);
  // initialize the default search topic as 'cats'
  const [topic, setTopic] = useState("cats");
  // initialize the searchQuery term to reset the search bar
  const [searchQuery, setSearchQuery] = useState("");
  // instantiate the useNavigate() hook for tracking route navigation history
  const navigate = useNavigate();

  // make an asynchronous function for utilizing axios to fetch the query parameter from flickr
  // utilize the useCallback hook to memoize the function to avoid reloads on every render to avoid fetch loops and rate limiting
  const fetchData = useCallback(
    async (query) => {
      // kill the search if the search term and photos have already been added to the state
      if (photos[query] && photos[query].length > 0) {
        return;
      }
      // increment the loading count on search start
      setLoadingCount((prevCount) => prevCount + 1);

      // initialize the url for the axios API call
      // ensure the json call is not signed.
      // ensure there are 24 items returned per_page
      // ensure json is the returned format
      const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`;
      // attempt the axios fetch using a try...catch...finally block
      try {
        // initialize the response to an asynchronous awaited promise using the axios get method
        const response = await axios.get(url);
        // check if a response was returned with no photos and end the search
        if (!response.data.photos.photo.length) {
          throw new Error("no photos found");
        }
        // set photos to the response
        const newPhotos = response.data.photos.photo;
        // use a state setter function to update the photos state
        // prevPhotos represents the current state of photos
        setPhotos((prevPhotos) => ({
          // copy all of the current state of photos into the new photos object using the spread operator
          ...prevPhotos,
          // dynamically set the key to the current query argument using the ES6 computed property names square bracket syntax
          // set the value of the query key pair to the response from the axios request
          [query]: newPhotos,
        }));
      } catch (error) {
        // log to the console if there is an error in the request
        console.error("Error fetching and parsing data", error);
      } finally {
        // decrement the loading count at end of search
        setLoadingCount((prevCount) => prevCount - 1);
        // set the search input text to an empty string
        setSearchQuery("");
      }
    },
    // the photos will be the dependency for the callBack memo
    [photos]
  );
  // utilize the useRef hook to memoize the default preloaded photos
  const preloadTopics = useRef(async () => {
    const defaultTopics = ["cats", "dogs", "computers"];
    for (const topic of defaultTopics) {
      await fetchData(topic);
    }
  }).current;

  // call the use effect hook on the preloadTopics function to load the default three categories
  // listen for changes in the preloadTopics ref to fire hook
  useEffect(() => {
    preloadTopics();
  }, [preloadTopics]);

  // create a handler for the search action to update the topic state and navigate to the appropriate search route
  const handleSearch = (query) => {
    // check if the photos for that query exist and isn't an empty value
    if (!photos[query] || photos[query].length === 0) {
      fetchData(query);
    }
    setTopic(query);
    setSearchQuery("");
    navigate(`/search/${query}`);
  };
  // create a handler for the nav button clicks
  const handleNavClick = (query) => {
    // reset the search query
    setSearchQuery("");
    navigate(`/search/${query}`);
  };
  // set the isLoading boolean to true if the loading count is greater than zero meaning the axios request is in process
  const isLoading = loadingCount > 0;
  return (
    <div className="App">
      {/* utilize the imported components and pass the state as props */}
      <Nav onClick={handleNavClick} />
      <Search
        onSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Routes>
        <Route path="/" element={<Navigate replace to="/search/cats" />} />
        {/* provide the preloaded photos state keys to the default search paths */}
        <Route
          path="/cats"
          element={
            <PhotoList
              topic="cats"
              photos={photos.cats}
              loading={isLoading && topic === "cats"}
              fetchData={fetchData}
            />
          }
        />
        <Route
          path="/dogs"
          element={
            <PhotoList
              topic="dogs"
              photos={photos.dogs}
              loading={isLoading && topic === "dogs"}
              fetchData={fetchData}
            />
          }
        />
        <Route
          path="/computers"
          element={
            <PhotoList
              topic="computers"
              photos={photos.computers}
              loading={isLoading && topic === "computers"}
              fetchData={fetchData}
            />
          }
        />
        {/* provide the dynamic query path as a route with the colon syntax :query */}
        <Route
          path="/search/:query"
          element={
            <PhotoList
              photos={photos}
              loading={isLoading}
              topic={topic}
              fetchData={fetchData}
            />
          }
        />
        {/* provide the not found component when a url endpoint is non existent utilizing the path=star catch all syntax */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

// export the app for use in main.jsx
export default App;
