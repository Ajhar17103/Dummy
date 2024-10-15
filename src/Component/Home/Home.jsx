import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from '../../Shade/NavBar/NavigationBar';

function Home({ effect }) {
	return (
		<div className="horizontalMenucontainer">
			<div className="page">
				<NavigationBar effect={effect} />
				<div className="main-container container">
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default Home;
