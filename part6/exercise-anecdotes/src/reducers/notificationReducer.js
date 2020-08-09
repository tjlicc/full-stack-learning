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

let timeout = null
export const setNotification = (notification, wait = 5) => {
  return dispatch => {
    dispatch({
      type: 'NOTIFY',
      notification
    })
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      dispatch({
        type: 'CANCEL_NOTIFY'
      })
    }, wait * 1000)
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