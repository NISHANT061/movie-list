import React from 'react';
import TypeHead from '../TypeHead/TypeHead';
import "./Banner.scss"

const Banner = (props) => {
	return (
		<div className="app-banner">
			<div className="app-name">My WatchList</div>
			<div className="app-subtitle">Search to add Movies to your WatchList</div>
			<TypeHead />
		</div>
	);
};

export default Banner;
