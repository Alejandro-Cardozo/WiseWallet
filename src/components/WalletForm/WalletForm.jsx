// Hooks
import { useState } from 'react'
import { useDispatch } from 'react-redux'
// Actions
import { addWallet, editWallet } from '../../store/slices/walletsSlice'
// Components
import Button from '../UI/Button'
// Styles
import classes from './WalletForm.module.css'

const WalletForm = ({ onClose, isNew = false, walletName = '', walletId }) => {
  const [walletNewName, setWalletNewName] = useState(walletName)
  const dispatch = useDispatch()

  const handleWalletNewName = (e) => {
    setWalletNewName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formattedWalletName = walletNewName.trim().replace(/\s\s+/g, ' ')
    if (
      formattedWalletName &&
      formattedWalletName.length >= 3 &&
      formattedWalletName.length <= 25
    ) {
      if (isNew) {
        dispatch(addWallet(walletNewName))
      } else {
        dispatch(editWallet({ walletId, walletNewName: formattedWalletName }))
      }
      setWalletNewName('')
      onClose()
    }
  }

  return (
    <div className={classes['form-container']}>
      <h4>{isNew ? 'New Wallet' : 'Edit Wallet Name'}</h4>
      <form className={classes.form} onSubmit={handleSubmit}>
        <input
          className={classes['form-control']}
          type='text'
          name='name'
          id='name'
          minLength={3}
          maxLength={25}
          pattern='[a-zA-Z0-9\s]+'
          title='Alphanumeric with Spaces'
          placeholder='My Awesome Wallet'
          required
          autoFocus
          value={walletNewName}
          onChange={handleWalletNewName}
        />
        <Button disabled={!walletNewName}>{isNew ? 'Create' : 'Save'}</Button>
      </form>
      <button onClick={onClose} className={classes.close}>
        X
      </button>
    </div>
  )
}

export default WalletForm
