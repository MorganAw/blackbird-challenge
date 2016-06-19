import React from 'react';

let Base = ({ children, location }) => (
  <div id="base">
    <div id="navbar" className="navbar">
      <div className="navbar_left">
        <h1><a className="brand" href="/">
          Black<span className="gray">bird</span>
        </a></h1>
      </div>
      <div className="navbar_right">
        <a className="flex_block" href="http://www.blackbird.am/technology">
          Technology
        </a>
        <a className="flex_block" href="http://www.blackbird.am/resources">
          Resources
        </a>
        <a className="flex_block" href="http://www.blackbird.am/plans">
          Plans
        </a>
        <a className="flex_block" href="http://blackbird.am/docs/">
          Docs
        </a>
        <div className="flex_block gray_button">
          <a className="gray button"
             href="http://www.blackbird.am/sign-up/demo">
                Request Demo
          </a>
        </div>
        <div className="flex_block blue_button">
          <a className="blue button"
              href="http://www.blackbird.am/sign-up/trial">
                Free Trial
          </a>
          </div>
        <div className="flex_block"></div>
      </div>
    </div>
    { children }
  </div>
);



export default Base;