import './index.css'

import { ModalContainer } from '../../../lib/modal'

import { render } from 'solid-js/web'
import App from './App'

render(
  () => (
    <ModalContainer>
      <App />
    </ModalContainer>
  ),
  document.getElementById('root')
)
