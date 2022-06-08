'use strict'
import { createSignal, For, Show } from 'solid-js'
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

export const createModal = ({ title, elements, element }) => {
  // Close this modal
  const close = () => {
    setModal(null)
  }

  // Show this modal
  const show = () => {
    setModal(Modal)
  }

  // Modal component
  const Modal = () => (
    <div className={styles.modal}>
      <div id={styles.modalHeader}>
        <h2>{title || 'some title'}</h2>
        <button id={styles.closeModal} onClick={close}>
          &#10006;
        </button>
      </div>
      <Show when={element}>{element}</Show>
      <For each={elements !== [] || elements !== null}>{(elem) => elem}</For>
    </div>
  )

  return [show, close]
}
