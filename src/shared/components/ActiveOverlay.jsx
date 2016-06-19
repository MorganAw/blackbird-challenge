import React             from 'react';
import { connect }       from 'react-redux';
import { Link }          from 'react-router';

import { setActiveCell } from '../redux/actions';

const mapStateToProps = (state) => {
  return {
    details: state.activeCell
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeOverlay: () => {
      dispatch(setActiveCell(null));
    }
  }
}

let ActiveOverlay = ({ details, removeOverlay }) => (
  <div className="overlay">
    <div className="overlay_left">
      <img src={ details.images[0] }
           alt={ details.description } />
    </div>
    <div className="overlay_right">
      <div className="close"
           onClick={ removeOverlay }>X</div>
      <div className="overlay_text">
        <h1 className="overlay_title">{ details.title }</h1>
        <h3 className="overlay_price">{ details.price }</h3>
        <p className="overlay_description">{ details.description }</p>
        <a className="overlay_link" href={ details.url }>Visit Site</a>
        <a className="overlay_link" href={ details.images[0] }>View Image</a>
      </div>
    </div>
  </div>
);

ActiveOverlay = connect(mapStateToProps, mapDispatchToProps)(ActiveOverlay);

export default ActiveOverlay;