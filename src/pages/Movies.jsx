import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { fetchMovies, getGenres } from '../store';
import { firebaseAuth } from '../utils/firebase-config';
import {onAuthStateChanged} from "firebase/auth";
import Navbar from '../components/Navbar';
import NotAvailable from '../components/NotAvailable';
import Slider from '../components/Slider';
import styled from 'styled-components';
import SelectGenre from '../components/SelectGenre';

function Movies() {

  const [isSrcolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

 useEffect(() => {
  dispatch(getGenres());
 }, []);

 useEffect(() => {
  if (genresLoaded) {
     dispatch(fetchMovies({ genres, type: "movies" }));
  }
 }, [genresLoaded]);

 const [user, setUser] = useState(undefined);

 onAuthStateChanged(firebaseAuth, (currentUser) => {
  if (currentUser) setUser(currentUser.uid);
  else navigate("/login");
 });

 window.onscroll = () => {
  setIsScrolled(window.scrollY === 0 ? false : true);
  return () => (window.onscroll = null);
};

  return (
    <Container>
      <div className="navbar">
        <Navbar isSrcolled={isSrcolled}/>
      </div>
      <div className="data">
      <SelectGenre genres={genres} type="movie" />
        {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </Container>
  );
}

const Container = styled.div `
.data {
  margin-top: 8rem;
  .not-available {
    text-align: center;
    color: white;
    margin-top: 4rem;
  }
  }
`;
export default Movies;