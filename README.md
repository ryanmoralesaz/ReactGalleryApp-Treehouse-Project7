# Treehouse Project 7 - Full Stack Degree - React Gallery App

> Built using VITE.
> Dev run command `npm run dev`

## Project Diary

1. Created components folder with 
- Nav.jsx
- Photo.jsx
- PhotoList.jsx
- Search.jsx

2. Installed React router
`npm install react-router-dom`

3. Imported Browser router in main.jsx and I wrapped the App component in `<BrowserRouter>`

4. imported Routes, Route and Navigate in App.jsx

5. Imported my future components from the components folder

6. Wrapped my app div, nav component, search component, and routes components in the browser router. 

7. Added route paths for home, cats, dogs, computers, search query, and a catch all for erroroneous endpoints

8. Installed axios

9. Imported useEffect and axios into App.jsx

10. Set up a photos state array with useState

11. Created a fetchData async function to use my apiKey and set the photosState with the returned data.

12. Got the animal search terms working with use Effects and passing the photo state as props to the PhotoList component
