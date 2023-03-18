// Utilities
import ReactDOM from 'react-dom'
// Components
import ModalOverlay from './ModalOverlay'
import Backdrop from './Backdrop'
// Helpers
const portalElement = document.getElementById('portal-root')

const Modal = ({ onClose, children }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
    </>
  )
}

export default Modal
