const activeCell = (state = null, action) => {
  switch (action.type) {
    case 'SET':
      return Object.assign({}, state, action.cell);
      break;
    case 'REMOVE':
      return null;
      break;
    default:
      return state;
  }
};

export default activeCell;