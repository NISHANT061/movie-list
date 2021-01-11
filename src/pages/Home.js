import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from '../components/Banner/Banner';
import MovieCard from '../components/MovieCard/MovieCard';

const Home = () => {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		axios
			.get(
				`
      ${process.env.REACT_APP_API_REQUEST}movie/now_playing?api_key=${process.env.REACT_APP_API_key}`
			)
			.then((res) => {
                localStorage.setItem("movies",JSON.stringify(res.data.results.map(movie=>movie.id)))
                const tmpMovie = [...res.data.results]
                if(localStorage.getItem("add-movie")){
               
                    const AddMovie = JSON.parse(localStorage.getItem("add-movie"))
                    
                    tmpMovie.push(...AddMovie)
                }
               
                setMovies(tmpMovie);
				setLoading(false);
			});
    }, []);

    //work around to  emulate the add to watched list behaviour
    
	return (
		<>
			<Banner />
			{loading && movies.length ? (
				'Loading'
			) : (
				<div className="movie-container">
					{movies && movies.map((movie) => <MovieCard detail={movie} key={movie.id} />)}
				</div>
			)}
		</>
	);
};

export default Home;
