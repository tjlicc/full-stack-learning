const reducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFY':
      return action.notification
    case 'CANCEL_NOTIFY':
      return ''
    default:
      return state
  }
}

export const notify = (notification) => ({
  type: 'NOTIFY',
  notification
})

export const cancelNotify = () => ({
  type: 'CANCEL_NOTIFY',
})

export default reducer