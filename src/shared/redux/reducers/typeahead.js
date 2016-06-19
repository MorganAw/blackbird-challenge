const typeahead = (state = { show: false }, action) => {
  switch (action.type) {
    case 'SHOW':
      return Object.assign({}, state, { show: true });
      break;
    case 'HIDE':
      return Object.assign({}, state, { show: false });
      break;
    default:
      return state;
  }
};

export default typeahead;