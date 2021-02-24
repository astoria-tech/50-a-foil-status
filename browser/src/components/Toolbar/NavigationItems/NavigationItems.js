import React from 'react';
import { pure } from 'recompose';

const NavigationItems = (props) => {

	return (
		<div  className="navigation_items">
			<ul>
        <li><a href="#">About These Requests</a></li>
        <li><a href="#">Muckrock</a></li>
        <li><a href="#">All Requests</a></li>
        <li><a href="#">Materials and Articles</a></li>
        <li><a href="#">Astoria Digital</a></li>
        <li><a href="#">Github for this project</a></li>
        <li><a href="#">FOIL Requests in New York State</a></li>
			</ul>
		</div>
	);
};


export default NavigationItems
