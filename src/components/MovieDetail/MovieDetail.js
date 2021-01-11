import React, {  useState } from 'react';
import { format } from 'date-fns';
import './MovieDetail.scss';
import classnames from 'classnames';

const MovieDetail = (props) => {
	const { movie } = props.location.state;
	const [status, setStatus] = useState(
		localStorage.getItem('watched') && JSON.parse(localStorage.getItem('watched')).includes(movie.id) ? 'yes' : 'no'
	);
	const handleWatchStatus = () => {
        if(status === "no"){
            setStatus("yes")
            if (localStorage.getItem('movies')) {
                const movies = JSON.parse(localStorage.getItem('movies'));
                if (!movies.includes(movie.id)) {
                    if (localStorage.getItem('add-movie')) {
                        const AddMovie = JSON.parse(localStorage.getItem('add-movie'));
                        AddMovie.push(movie);
                        localStorage.setItem('add-movie', JSON.stringify(AddMovie));
                    } else {
                        localStorage.setItem('add-movie', JSON.stringify([movie]));
                    }
                }
            }
            if (localStorage.getItem('watched')) {
                const watched = JSON.parse(localStorage.getItem('watched'));
                if (!watched.includes(movie.id)) {
                    watched.push(movie.id);
                }
                localStorage.setItem('watched', JSON.stringify(watched));
            } else {
                localStorage.setItem('watched', JSON.stringify([movie.id]));
            }
        }
      if(status === "yes"){
        setStatus('no');
        if (localStorage.getItem('watched')) {
            const watched = JSON.parse(localStorage.getItem('watched'));
            const index = watched.findIndex((id) => id === movie.id);

            if (index !== -1) {
                watched.splice(index, 1);
            }
            localStorage.setItem('watched', JSON.stringify(watched));
        }
      }  
		
	}; 

	return (
		<div className="movie-detail-holder">
			<div>
				<h1>{movie.title}</h1>
			</div>
			<div style={{ textAlign: 'center' }}>
				<img src={`${process.env.REACT_APP_IMAGE_URL}${movie.poster_path}`} alt={movie.title} width="300" />
			</div>
			<div className="detail">
				Movie Name: <span>{movie.title}</span>
			</div>
			<div className="detail">
				Release Date : <span>{format(new Date(movie.release_date), 'dd MMM yyyy')}</span>
			</div>
			<div className="detail">
				Overview: <span>{movie.overview}</span>
			</div>
			<div className="detail">
				Popularity : <span>{movie.popularity}</span>
			</div>
			<div className="detail">
				Voting Average : <span>{movie.vote_average}</span>
			</div>
			<div className="detail watch-status ">
				<div>Watch Status: </div>
				<div className="watch-status-button">
					<div
						className={classnames('watch-status-yes', {
							active: status === 'yes',
						})}
						onClick={() => {
							handleWatchStatus(status);
						}}
					>
						Yes
					</div>
					<div
						className={classnames('watch-status-yes', {
							active: status === 'no',
						})}
						onClick={() => {
							handleWatchStatus(status)
						}}
					>
						No
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieDetail;
