const initialState = {
  notification: {
    text: null,
    color: null
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      const notification = { text: null, color: null }
      return { notification: { ...notification, ...action.payload } }
    default:
      return state
  }
}