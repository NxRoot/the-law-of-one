export const ReducerVoices = {
  name: 'voices',
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