// Hooks
import { useNavigate, useRouteError } from 'react-router-dom'
// Components
import Button from '../../components/UI/Button'

export default function ErrorPage () {
  const navigate = useNavigate()
  const error = useRouteError()

  return (
    <div
      id='error-page'
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem'
      }}
    >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Button styled={['lg']} onClick={() => navigate('/')}>
        Go Back to the Home
      </Button>
    </div>
  )
}
