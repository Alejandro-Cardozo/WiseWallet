import parseISO from 'date-fns/parseISO'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const TimeAgo = ({ timestamp }) => {
  let timeAgo = ''
  let date = ''
  if (timestamp) {
    date = parseISO(timestamp)
    const timePeriod = formatDistanceToNow(date)
    timeAgo = `${timePeriod} ago`
  }
  return (
    <span title={date} style={{ cursor: 'help' }}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  )
}

export default TimeAgo
