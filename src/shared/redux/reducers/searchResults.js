const searchResults = (state = null, action) => {
  switch (action.type) {
    case 'NEW_RESULTS':
      return Object.assign({}, state, action.newSearch);
      break;
    case 'ADD_RESULTS':
      return Object.assign({}, state, {
        results: state.results.concat(action.results)
      });
      break;
    default:
      return state;
  }
};

export default searchResults;