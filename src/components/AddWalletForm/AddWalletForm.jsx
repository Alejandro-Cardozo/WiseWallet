// Hooks
import { useState } from 'react'
import { useDispatch } from 'react-redux'
// Helpers
import { addWallet } from '../../store/slices/walletsSlice'
// Components
import Button from '../UI/Button'
// Styles
import classes from './AddWalletForm.module.css'

const AddWalletForm = ({ onClose }) => {
  const [newWalletName, setNewWalletName] = useState('')
  const dispatch = useDispatch()

  const handleNewWalletName = (e) => {
    setNewWalletName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newWalletName && newWalletName.length >= 3 && newWalletName.length <= 25) {
      dispatch(addWallet(newWalletName))
      setNewWalletName('')
      onClose()
    }
  }

  return (
    <div className={classes['form-container']}>
      <h4>New Wallet</h4>
      <form className={classes.form} onSubmit={handleSubmit}>
        <input
          className={classes['form-control']}
          type='text'
          name='name'
          id='name'
          minLength={3}
          maxLength={25}
          placeholder='My Awesome Wallet'
          required
          autoFocus
          value={newWalletName}
          onChange={handleNewWalletName}
        />
        <Button disabled={!newWalletName}>Create</Button>
      </form>
      <button onClick={onClose} className={classes.close}>
        X
      </button>
    </div>
  )
}

export default AddWalletForm
