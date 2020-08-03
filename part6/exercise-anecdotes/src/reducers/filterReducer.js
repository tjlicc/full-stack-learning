const reducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER':
      return action.keywords
    default:
      return state
  }
}

export const filter = (keywords) => ({
  type: 'FILTER',
  keywords
})

export default reducer