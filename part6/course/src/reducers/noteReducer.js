const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      // 不要使用push方法来改变数组，要使用不可变对象
      // state.push(action.data)
      // return state
      // return state.concat(action.data)
      return [...state, action.data]
    case 'TOGGLE_IMPORTANCE':
      const id = action.data.id
      const noteToChange = state.find(item => item.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map(item => item.id === id ? changedNote : item)
    default:
      return state
  }
}

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export const createNote = (content) => ({
  type: 'NEW_NOTE',
  data: {
    content,
    important: false,
    id: generateId()
  }
})

export const toggleImportanceOf = (id) => ({
  type: 'TOGGLE_IMPORTANCE',
  data: {
    id
  }
})

export default noteReducer