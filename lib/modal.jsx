import { createSignal } from 'solid-js'

const createModal = () => {
  const [visible, setVisible] = createSignal(false)
  const modal = (
    <div hidden={visible === false} className={styles.modal}>
      <h1>Hej där</h1>
    </div>
  )
  return [modal, setVisible]
}

export default ModalProvider
