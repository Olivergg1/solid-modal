import { useTodo } from './contexts/TodoProvider'
import { createEffect, createSignal, For, Show } from 'solid-js'
import { createConfirmModal, createModal } from '../../../lib/modal'

const Todo = ({ title, id, editing, deleteTodo }) => {
  const [completed, setCompleted] = createSignal(false)

  const [show, close] = createConfirmModal({
    title: 'Delete task?',
    onConfirm: () => deleteTodo(id),
    hideCloseButton: true,
    centerTitle: true,
  })

  return (
    <div
      key={id}
      classList={{ 'todo-item': true, completed: completed() === true }}>
      <input
        type='text'
        name='title'
        value={title}
        disabled={editing() !== true}
      />
      <div className='todo-item-right'>
        <button
          className='small-button checkbox'
          classList={{
            checked: completed() === true,
          }}
          onClick={() => setCompleted((c) => !c)}>
          <Show when={completed() === true}>
            <p>&#128504;</p>
          </Show>
        </button>
        <button
          className='small-button delete'
          classList={{ hide: editing() !== true }}
          onClick={() => show()}>
          &times;
        </button>
      </div>
    </div>
  )
}

function App() {
  const [todos, { addTodo, deleteTodo }] = useTodo()
  const [edit, setEdit] = createSignal(false)

  const CreateTodoForm = () => {
    const [title, setTitle] = createSignal('')
    return (
      <form className='createTodoForm'>
        <input
          type='text'
          placeholder='What are you up to?'
          value={title()}
          onInput={(e) => setTitle(e.target.value)}
        />
        <button
          className='modal-button'
          disabled={title() === ''}
          type='submit'
          onClick={(e) => createTodo(e, title())}>
          add
        </button>
      </form>
    )
  }

  const [show, close] = createModal({
    title: 'Add todo',
    element: <CreateTodoForm />,
  })

  const createTodo = (e, title) => {
    e.preventDefault()
    if (title === undefined || title === '') return close()
    addTodo({
      id: todos().length,
      title: title,
      editing: edit,
      deleteTodo,
    })
    close()
  }

  createEffect(() => {
    if (todos().length === 0) setEdit(false)
  })

  return (
    <div id='todo' classList={{ editing: edit() === true }}>
      <div id='todo-header'>
        <h2>Todos</h2>
        <div id='todo-header-buttons'>
          <button
            disabled={edit() === true}
            id='add-todo'
            className='small-button'
            onClick={() => show()}>
            &plus;
          </button>

          <button
            id='edit-todo'
            className='small-button'
            classList={{ editing: edit() === true }}
            onClick={() => setEdit((e) => !e)}
            disabled={todos().length === 0}>
            &#9998;
          </button>
        </div>
      </div>

      <div id='todos'>
        <For each={todos()} fallback={<p>No todos, take a break☕</p>}>
          {(todo, i) => {
            return <Todo {...todo} />
          }}
        </For>
      </div>
    </div>
  )
}

export default App
