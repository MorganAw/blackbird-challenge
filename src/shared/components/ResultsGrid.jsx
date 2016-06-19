import React, { Component } from 'react';
import { connect }          from 'react-redux';

import { setActiveCell }    from '../redux/actions';

const mapStateToProps = (state) => {
  if (state.searchResults && state.searchResults.results.length > 0) {
    return {
      results: state.searchResults.results
    }
  }
  return {
    results: null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActive: (cell) => {
      console.log('cell clicked:', cell);
      dispatch(setActiveCell(cell));
    }
  }
}

class ResultsGrid extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let cells = [];
    if (this.props.results) {
      for (let value of this.props.results) {
        cells.push(
          <div key={ String(Date.now() - Math.floor(Math.random() * 1000000)) }
               className="result_cell"
               onClick={ this.props.setActive.bind(null, value) }>
            <img src={ value.images[0] } alt={ value.description }/>
            <div className="result_text">
              <h3 className="result_title">{ value.title}</h3>
              <p className="result_description">{ value.description }</p>
            </div>
          </div>
        );
      }
      for (let i = 0; i < 6; ++i) {
        cells.push(<div className="result_cell" key={ 'empty_' + String(i) } />);
      }
    }
    return(
      this.props.results
        ? <div id="results_container" className="results_container">
            { cells }
          </div>
        : null
    );
  }
}

ResultsGrid = connect(mapStateToProps, mapDispatchToProps)(ResultsGrid);

export default ResultsGrid;