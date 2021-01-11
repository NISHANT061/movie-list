import React, { useRef, useState } from 'react';
import './TypeHead.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import useOutsideDetect from '../../utils/detectClick';
import { Link } from 'react-router-dom';

const TypeHead = (props) => {
	const [value, setValue] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const clickref = useRef(null);
	useOutsideDetect(clickref, setSearchResults);
	const getSearchResults = (value) => {
		if (value !== '') {
			axios
				.get(`${process.env.REACT_APP_API_REQUEST}search/movie`, {
					params: {
						api_key: process.env.REACT_APP_API_key,
						query: value,
					},
				})
				.then((res) => {
					setSearchResults(res.data.results);
				});
		}
	};
	return (
		<div className="type-head">
			<input
				placeholder="Search for movies..."
				onChange={(e) => {
					const event = e.target;
					setValue(event.value);
					getSearchResults(event.value);
				}}
				value={value}
			/>
			<div className="clear-search">
				<FontAwesomeIcon
					icon={faTimesCircle}
					style={{ color: '#000000', cursor: 'pointer' }}
					onClick={() => {
						setValue('');
						setSearchResults([]);
					}}
				/>
			</div>
			{searchResults.length ? (
				<div className="search-result-holder" ref={clickref}>
					{searchResults.length &&
						searchResults.map((movie) => (
							<Link
								className="search-result-item"
								to={{ pathname: '/movie-detail', state: { movie: movie } }}
							>
								{movie.title}
							</Link>
						))}
				</div>
			) : null}
		</div>
	);
};

export default TypeHead;
