'use strict'
import { createSignal, For, Show, Switch, Match } from 'solid-js'
import styles from './modal.module.css'

const [modal, setModal] = createSignal(null)

/**
 * Returns the jsx-element holding a modal. Can be used as a provider. The container hides when no active modal.
 * @returns {JSX.Element} A jsx-element which holds a modal
 */

export const ModalContainer = ({ children }) => {
  return (
    <>
      <Show when={modal() !== null}>
        <div id={styles.modalContainer}>{modal() !== null && modal}</div>
      </Show>
      {children}
    </>
  )
}

/**
 * Creates a modal that can be shown and hidden with functions returned
 * @returns {Array} Array consisting of the functions show and close
 */

export const createModal = ({
  title,
  elements,
  element,
  type,
  onConfirm,
  onCancel,
  hideCloseButton,
  centerTitle,
}) => {
  // Close this modal
  const close = () => {
    setModal(null)
  }

  // Show this modal
  const show = () => {
    setModal(Modal)
  }

  // Modal component
  const Modal = (
    <div className={styles.modal}>
      <div
        classList={{ [styles.centerTitle]: centerTitle === true }}
        id={styles.modalHeader}>
        <h2>{title || 'Title'}</h2>
        <Show when={hideCloseButton !== true}>
          <button id={styles.closeModal} onClick={close}>
            &#10006;
          </button>
        </Show>
      </div>
      <Show when={element}>{element}</Show>
      <Show
        when={elements !== [] || elements !== null || elements !== undefined}>
        <For each={elements}>{(elem) => elem}</For>
      </Show>
      <Switch>
        <Match when={type === 'yesno'}>
          <div id={styles.modalButtons}>
            <button
              className={styles.modalButton}
              id={styles.confirm}
              onClick={() => {
                console.log(typeof onConfirm)
                if (typeof onConfirm === 'function') onConfirm()
                close()
              }}>
              Confirm
            </button>
            <button
              className={styles.modalButton}
              id={styles.cancel}
              onClick={() => {
                if (typeof onCancel === 'function') onCancel()
                close()
              }}>
              Cancel
            </button>
          </div>
        </Match>
      </Switch>
    </div>
  )

  return [show, close]
}
