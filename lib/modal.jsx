'use strict'
import { createSignal, For, Show, Switch, Match } from 'solid-js'
import styles from './modal.module.css'

const [modal, setModal] = createSignal(null)

/**
 * Returns the jsx-element holding a modal. Can be used as a provider. The container hides when no active modal.
 * @returns {JSX.Element} A jsx-element which holds a modal
 */

export const ModalContainer = ({ children, withOpacity }) => {
  return (
    <>
      <Show when={modal() !== null}>
        <div id={styles.modalContainer} classList={{ [styles.withOpacity]: withOpacity !== false }}>{modal() !== null && modal}</div>
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
  hideCloseButton,
  centerTitle,
  className,
  large
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
    <div id={styles.modal} classList={{ [styles.large]: large === true }}>
      <div
        classList={{ [styles.centerTitle]: centerTitle === true }}
        id={styles.modalHeader}>
        {(typeof title === "string" && title !== "") ? <h2>{title}</h2> : null}
        <Show when={hideCloseButton !== true}>
          <button id={styles.closeModal} onClick={close}>
            &#10006;
          </button>
        </Show>
      </div>
      <div
        id={styles.modalElements}
        classList={{ [className]: typeof className === 'string' }}>
        <Show when={element}>{element}</Show>
        <Show
          when={elements !== [] || elements !== null || elements !== undefined}>
          <For each={elements}>{(elem) => elem}</For>
        </Show>
      </div>
    </div>
  )

  return [show, close]
}

export const createConfirmModal = ({
  title,
  elements,
  element,
  onConfirm,
  onCancel,
}) => {
  const [show, close] = createModal({
    title: title,
    elements: [
      ...(Array.isArray(elements) ? elements : []),
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
      </div>,
    ],
    element,
    hideCloseButton: true,
    centerTitle: true,
  })

  return [show, close]
}

export const createInformationModal = ({
  title,
  text,
  elements,
  closeButtonText,
  onClose,
}) => {
  const [show, close] = createModal({
    title: title,
    elements: [
      ...(Array.isArray(elements) ? elements : []),
      <p id={styles.infoText}>{text || ''}</p>,
      <button
        className={styles.modalButton}
        onClick={() => {
          if (typeof onClose === 'function') onClose()
          close()
        }}>
        {closeButtonText || 'I understand'}
      </button>,
    ],
  })

  return [show, close]
}
