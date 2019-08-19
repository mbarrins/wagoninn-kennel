import { bookingPensUrl } from '../constants'

const jsonify = res => {
  return res.json()
}

const handleServerError = response => {

  return { errors: response.errors }
}

const constructHeaders = (moreHeaders = {}) => (
  {
    'Authorization': localStorage.getItem('token'),
    ...moreHeaders
  }
)

const patchBookingPen = ({ booking_pen, id }) => {
  return fetch(`${bookingPensUrl}/${id}`, {
    method: 'PATCH',
    headers: constructHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ booking_pen })
  }).then(jsonify)
    .then(data => {
      if (data.errors) {
        return { errors: data }
      } else {
        return { pen: data }
      }
    })
    .catch(handleServerError)
}

export default patchBookingPen;