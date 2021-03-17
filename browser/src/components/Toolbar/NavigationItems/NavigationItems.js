import React from 'react';

const NavigationItems = () => {
  return (
    <div  className="navigation_items">
      <ul>
        <li><a href="#about_these_requests">About These Requests</a></li>
        <li><a href="http://www.muckrock.com/">Muckrock</a></li>
        <li><a href="https://www.muckrock.com/foi/list/?projects=778">All Requests</a></li>
        <li><a href="https://www.muckrock.com/project/new-york-officer-misconduct-and-disciplinary-materials-778/">Materials and Articles</a></li>
        <li><a href="https://astoria.digital/">Astoria Digital</a></li>
        <li><a href="https://github.com/astoria-tech/50-a-foil-status">Github for this project</a></li>
        <li><a href="https://foil.astoria.digital/">FOIL Requests in New York State</a></li>
        <li><a href="#links_and_references">Links and References</a></li>
      </ul>
    </div>
  );
};

export default NavigationItems
