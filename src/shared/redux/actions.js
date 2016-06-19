export function showTypeahead(show) {
  return {
    type: show ? 'SHOW' : 'HIDE'
  }
}

export function newSearchResults(results) {
  if (Array.isArray(results)) {
    return {
      type: 'ADD_RESULTS',
      results
    }
  }
  return {
    type: 'NEW_RESULTS',
    newSearch: results
  }
}

export function setActiveCell(cell) {
  if (cell) {
    return {
      type: 'SET',
      cell
    }
  }
  return {
    type: 'REMOVE'
  }
}