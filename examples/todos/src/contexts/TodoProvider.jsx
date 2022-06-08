import { createSignal, createContext, useContext } from 'solid-js'

const TodoContext = createContext()

export function TodoProvider(props) {
  const [todos, setTodos] = createSignal([]),
    store = [
      todos,
      {
        addTodo(todo) {
          setTodos((t) => [...t, todo])
        },
        deleteTodo(id) {
          setTodos((t) => t.filter((t) => t.id !== id))
        },
      },
    ]

  return (
    <TodoContext.Provider value={store}>{props.children}</TodoContext.Provider>
  )
}

export function useTodo() {
  return useContext(TodoContext)
}
