import styles from './App.module.css'
import { createInformationModal } from '../../../lib/modal'

function App() {
  const [show, close] = createInformationModal({
    title: 'Example Modal',
    text: 'This is an informational modal.',
    elements: '',
  })

  return (
    <div class={styles.App}>
      <h1>An example-modal using solid-modal</h1>
      <button className='button' onClick={show}>
        click me
      </button>
    </div>
  )
}

export default App
