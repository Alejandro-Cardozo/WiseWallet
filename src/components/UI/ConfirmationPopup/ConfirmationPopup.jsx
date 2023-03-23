// Components
import Button from '../Button'

const ConfirmationPopup = (props) => {
  return (
    <div style={{ textAlign: 'center', paddingBottom: '1rem' }}>
      <h3>{props.title}</h3>
      <div style={{ margin: '2rem' }}>{props.children}</div>
      <div style={{ display: 'flex', gap: '1rem', margin: '0 auto', width: 'max-content' }}>
        <Button onClick={props.onConfirm}>{props.confirmText || 'Do it'}</Button>
        <Button styled={['outlined']} onClick={props.onCancel}>Cancel</Button>
      </div>
    </div>
  )
}

export default ConfirmationPopup
