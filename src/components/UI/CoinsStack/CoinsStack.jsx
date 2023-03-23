// Styles
import classes from './CoinsStack.module.css'

const CoinsStack = ({ coinsImages }) => {
  return (
    <div className={classes['coins-stack']}>
      <div className={classes['coins-stack__images']}>
        {coinsImages
          .map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              width='30'
              height='30'
              alt='coin'
              className={classes['coins-stack__images-img']}
            />
          ))
          .reverse()
          .slice(-5)}
      </div>
      {(coinsImages.length > 5) === true && <p>{`+${coinsImages.length - 5}`}</p>}
    </div>
  )
}

export default CoinsStack
