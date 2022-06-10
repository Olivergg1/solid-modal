# solid-modal

### Installation

`npm install solid-modal`

### Usage

A **ModalContainer** is essential for displaying a modal. A ModalContainer should only be implemented once, ideally in Root or any other top element.

#### Implementing ModalContainer

```javascript
render(
  () => (
    <ModalContainer>
      <App />
    </ModalContainer>
  ),
  document.getElementById('root')
)
```

#### Creating a modal

Create a modal with the function _createModal()_. An object can be passed as a parameter, manipulating the visuals and behaviour of the modal.

```javascript
const [show, close] = createModal({
  title: 'My Modal',
  element: <button onClick={() => close()}>close me</button>,
})
```

To show a modal, use the show function. This will add the modal to the previously added container, making it appear in the middle of the screen. **NOTE: only one modal can be shown at a time**

### Hooks

```javascript
createModal()

// Modal types (^0.1.3)

createInformationalModal() // Modal with an informational message
createConfirmModal() // Modal with confirm and cancel buttons
```

### Requests

Create an [issue](https://github.com/Olivergg1/solid-modal/issues)

### Examples

See [this page](https://github.com/Olivergg1/solid-modal/tree/master/examples) for examples
