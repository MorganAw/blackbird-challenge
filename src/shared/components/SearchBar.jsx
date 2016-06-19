import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { Link }               from 'react-router';
import { engine }             from 'merlin.js'
import { showTypeahead,
         newSearchResults }   from '../redux/actions';

const merlin = engine({
  company: 'blackbird',
  environment: 'dev',
  instance: 'magento_test_aakash'
});

const mapStateToProps = (state) => {
  return {
    predictive: state.typeahead.show,
    searchQuery: state.searchResults
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    showTypeahead: (bool) => {
      dispatch(showTypeahead(bool));
    },
    updateSearchResults: (results) => {
      dispatch(newSearchResults(results));
    }
  }
}

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeahead: [],
      searching: false
    }
    this._onKeyPress = this._onKeyPress.bind(this);
    this._futureText = this._futureText.bind(this);
    this._filterSearch = this._filterSearch.bind(this);
    this._onTypeaheadClick = this._onTypeaheadClick.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener("mouseup", (evt) => {
      let isTypeahead = evt.target.classList.contains('typeahead_entry');
      if (!isTypeahead && this.props.predictive) {
        this.props.showTypeahead(false);
      }
    });
    window.addEventListener("scroll", () => {
      let screenBot = window.scrollY + document.body.clientHeight;
      let totHeight = document.body.scrollHeight;
      if (this.props.searchQuery && screenBot > (totHeight - 1000) && !this.state.searching) {
        let term = document.getElementById('textbox').value;
        setTimeout(this.setState({ searching: true }), 0)
        merlin.search({ q: term,
                        start: this.props.searchQuery.results.length,
                        num: 20 })
              .then((res) =>  {
                setTimeout(this.setState({ searching: false }), 0);
                this._filterSearch(res)
              });
      }
    });
  }

  _onKeyPress(evt) {
    let term = document.getElementById('textbox').value;
    if (evt.keyCode === 13 && term !== '') {
      this.props.predictive
        ? setTimeout(this.props.showTypeahead(false), 0)
        : null;
      if (!this.props.searchQuery || this.props.searchQuery.query !== term) {
        merlin.search({ q: term, num: 20 }).then(this._filterSearch);
      } else {
        merlin.search({ q: term,
                        start: this.props.searchQuery.results.length,
                        num: 20 })
              .then(this._filterSearch);
      }
    } else if (evt.keyCode === 27) {
      this.props.predictive
        ? this.props.showTypeahead(false)
        : null;
    } else if (this.state.typeahead.length > 0 && evt.keyCode === 40) {
      this.props.showTypeahead(true);
    } else {
      setTimeout(this.props.showTypeahead(true), 0);
      merlin.typeahead({ q: term }).then(this._futureText);
    }
    
  }

  _filterSearch(rawResponse) {
    let results = JSON.parse(rawResponse.text);
    let newData;
    if (results.start === 0) {
      newData = {
        query: results.q,
        results: results.results.hits,
      };
    } else {
      newData = results.results.hits;
    }
    this.props.updateSearchResults(newData);
  }

  _futureText(res) {
    if (res.ok && !res.error) {
      let nextValues = [];
      let text       = JSON.parse(res.text);
      let results    = text.results.hits;
      let query      = text.q;
      for (let entry of results) {
        if (nextValues.length < 10) {
          nextValues.push(
            <div className="typeahead_entry"
                 key={ entry.value }
                 onClick={ this._onTypeaheadClick.bind(null, entry.value) }>
              <span className="searchterm">{ query }</span>
              { entry.value.substring(query.length) }
            </div>
          );
        } else {
          break;
        }
      }
      this.setState({ typeahead: nextValues });
    }
  }

  _onTypeaheadClick(query) {
    let textbox = document.getElementById('textbox');
    textbox.value = query;

    this.props.predictive
      ? setTimeout(this.props.showTypeahead(false), 0)
      : null;
    if (!this.props.searchQuery || this.props.searchQuery.query !== query) {
      merlin.search({ q: query, num: 20 }).then(this._filterSearch);
    } else {
      merlin.search({ q: query,
                      start: this.props.searchQuery.results.length,
                      num: 20 })
            .then(this._filterSearch);
    }
  }

  render() {
    return(
      <div id="search_container" className="search_container">
          <input type="text"
                 id="textbox"
                 placeholder="Ask away!"
                 onKeyUp={ this._onKeyPress } />
        { 
          this.props.predictive
            ? <div className="typeahead">
                { this.state.typeahead }
              </div>
            : null
        }
      </div>
    );
  }
}

SearchBar = connect(mapStateToProps, mapDispatchToProps)(SearchBar);

export default SearchBar;