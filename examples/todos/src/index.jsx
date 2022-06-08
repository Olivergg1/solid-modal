/* @refresh reload */
import { render } from 'solid-js/web'

import './index.css'
import App from './App'
import { TodoProvider } from './contexts/TodoProvider'
import { ModalContainer } from '../../../lib/modal'

render(
  () => (
    <TodoProvider>
      <ModalContainer />
      <App />
    </TodoProvider>
  ),
  document.getElementById('root')
)
