import Button from '../Button'

const ConfirmationPopup = ({ title, body, onConfirm, onCancel }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h3>{title}</h3>
      <p style={{ margin: '2rem' }}>{body}</p>
      <div style={{ display: 'flex', gap: '1rem', margin: '0 auto', width: 'max-content' }}>
        <Button onClick={onConfirm}>Do it</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  )
}

export default ConfirmationPopup
