// const apiEndpoint = 'http://localhost:3000/api/v1'
const apiEndpoint = 'https://wagoninn.herokuapp.com/api/v1'
const bookingsUrl = `${apiEndpoint}/bookings`

const jsonify = res => {
  return res.json()     
}

const handleServerError = response => {
  
  return {errors: response.errors}
}

const constructHeaders = (moreHeaders = {}) => (
  {
      'Authorization': localStorage.getItem('token'),
      ...moreHeaders
  } 
)

const getBooking = id => {
  return fetch(`${bookingsUrl}/${id}`, {
    headers: constructHeaders()
  }).then(jsonify)
  .then(data => {
    if (data.errors) {
      return {errors: data}
    } else {
      return {booking: data}
    }
  })
  .catch(handleServerError)
}

const postBooking = booking => {
  return fetch(bookingsUrl, {
    method: 'POST',
    headers: constructHeaders({'Content-Type': 'application/json'}),
    body: JSON.stringify({ booking })
  }).then(jsonify)
  .then(data => {
    if (data.errors) {
      return {errors: data}
    } else {
      return {booking: data}
    }
  })
  .catch(handleServerError)
}

export default {
  getBooking,
  postBooking
}