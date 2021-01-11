import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetail from './components/MovieDetail/MovieDetail';

function App() {
	return (
		<div className="App">
			<Router>
				<Route exact path="/" component={Home} />
        <Route exact path="/movie-detail" component={MovieDetail} />
			</Router>
		</div>
	);
}

export default App;
