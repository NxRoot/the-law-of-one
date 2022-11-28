export const ReducerWords = {
  name: 'words',
  initialValue: [],
  reducers: {
    set(props){
      return props
    },
    add(props, state?){
      return [...state, ...props]
    }
  }
}