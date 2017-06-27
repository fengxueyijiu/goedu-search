function categories(state=[], action) {
  switch(action.type) {
    case 'GET_COURSE_CATS':
      return [...action.payload]
    case 'ADD_COURSE_CAT':
      return [...state, action.payload]
    case 'UPDATE_COURSE_CAT':
      const id = action.payload.id
      const name = action.payload.name
      return state.map((item, i) => {
        if(item._id === id) {
          item.name = name
          return item
        } else if(item.ancestors.filter( a => a._id === id).length !== 0) {
          item.ancestors = item.ancestors.map(a => {
            if(a._id === id) {
              a.name = name
              return a
            } else {
              return a
            }
          })
          return item
        } else {
          return item
        }
      })
      case 'DELETE_COURSE_CAT':
        return state.filter(item => item._id !== action.payload)
    default:
      return state
  }
}

export default categories
