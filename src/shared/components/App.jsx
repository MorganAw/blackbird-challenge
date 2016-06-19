import React         from 'react';
import { connect }   from 'react-redux';
import ActiveOverlay from './ActiveOverlay';
import SearchBar     from './SearchBar';
import ResultsGrid   from './ResultsGrid';

const mapStateToProps = (state) => {
  return {
    active: state.activeCell
  }
}

let App = ({ active }) => (
  <div id="app_wrapper"
       className="app_wrapper" >
    <SearchBar />
    <ResultsGrid />
    { active ? <ActiveOverlay /> : null}
  </div>
)

App = connect(mapStateToProps)(App);

export default App;