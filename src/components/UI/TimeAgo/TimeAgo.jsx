// Utilities
import parseISO from 'date-fns/parseISO'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
// Styles
import classes from './TimeAgo.module.css'

const TimeAgo = ({ timestamp }) => {
  let timeAgo = ''
  let date = ''
  if (timestamp) {
    date = parseISO(timestamp)
    const timePeriod = formatDistanceToNow(date)
    timeAgo = `${timePeriod} ago`
  }
  return (
    <span className={classes['time-ago']} title={date}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  )
}

export default TimeAgo
