import moment from 'moment'

const tstampToShortStr = timestamp => moment(timestamp).format('MM DD YY, h:mm')

const durationInMinutes = dur => moment.utc(dur * 1000).format('HH:mm:ss')

export { tstampToShortStr, durationInMinutes }