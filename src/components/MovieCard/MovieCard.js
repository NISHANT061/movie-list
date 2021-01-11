import React, { useState } from 'react';
import './MovieCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as SolidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

const MovieCard = ({ detail }) => {
	const [status, setStatus] = useState(
		localStorage.getItem('watched') && JSON.parse(localStorage.getItem('watched')).includes(detail.id)
			? true
			: false
    );
    const handleWatchStatus=()=>{
        setStatus(!status);
        if (localStorage.getItem('watched')) {
            const watched = JSON.parse(localStorage.getItem('watched'));
            if (status) {
                const index = watched.findIndex((id) => id === detail.id);
                watched.splice(index, 1);
            } else {
                watched.push(detail.id);
            }
        } else {
            localStorage.setItem('watched', JSON.stringify([detail.id]));
        }
    }
	return (
		<Link className="movie-preview-card" to={{ pathname: '/movie-detail', state: { movie: detail } }}>
			<div className="movie-preview-card-image">
				<img width="300" src={`https://image.tmdb.org/t/p/original/${detail.poster_path}`} alt={detail.title} />
				<div className="moive-detail">
					<div>{detail.title}</div>
					<div>{detail.release_date.substr(0, detail.release_date.indexOf('-'))}</div>
				</div>
				<div className="watch-status">
					<div>{status ? 'Watched' : 'Watch'}</div>
					<div className="watched-icon">
						<FontAwesomeIcon
							icon={!status ? faStar : SolidStar}
							style={{ color: '#000000' }}
							title={'click to add movie to your watchlist'}
							onClick={() => {
							handleWatchStatus()
							}}
						/>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default MovieCard;
