import styles from './App.module.css'
import { ModalContainer, createModal } from '../../../lib/modal'

function App() {
  const [show, close] = createModal({
    title: 'Example Modal',
    element: (
      <button onClick={() => close()} className='button stretch'>
        close
      </button>
    ),
  })

  return (
    <div class={styles.App}>
      <ModalContainer />
      <h1>An example-modal using solid-modal</h1>
      <button className='button' onClick={show}>
        click me
      </button>
    </div>
  )
}

export default App
