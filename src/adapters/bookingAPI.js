import { bookingsUrl } from '../constants'

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

const getBooking = id => {
  return fetch(`${bookingsUrl}/${id}`, {
    headers: constructHeaders()
  }).then(jsonify)
    .then(data => {
      if (data.errors) {
        return { errors: data }
      } else {
        return { booking: data }
      }
    })
    .catch(handleServerError)
}

const getAvailability = ({ dateFrom, dateTo }) => {
  return fetch(`${bookingsUrl}?date_from=${dateFrom}&date_to=${dateTo}`, {
    headers: constructHeaders()
  }).then(jsonify)
    .then(data => {
      if (data.errors) {
        return { errors: data.errors }
      } else {
        return { ...data }
      }
    })
    .catch(handleServerError)
}

const getDashboard = ({ date }) => {
  return fetch(`${bookingsUrl}?detail=${date}`, {
    headers: constructHeaders()
  }).then(jsonify)
    .then(data => {
      if (data.errors) {
        return { errors: data.errors }
      } else {
        return { dashboard: data }
      }
    })
    .catch(handleServerError)
}

const getAnnualIncome = ({ year, type }) => {
  return fetch(`${bookingsUrl}?${type}=${year}`, {
    headers: constructHeaders()
  }).then(jsonify)
    .then(data => {
      if (data.errors) {
        return { errors: data.errors }
      } else {
        return { years: data.years }
      }
    })
    .catch(handleServerError)
}

const postBooking = booking => {
  return fetch(bookingsUrl, {
    method: 'POST',
    headers: constructHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ booking })
  }).then(jsonify)
    .then(data => {
      if (data.errors) {
        return { errors: data }
      } else {
        return { booking: data }
      }
    })
    .catch(handleServerError)
}

const patchBooking = ({ booking, id }) => {
  return fetch(`${bookingsUrl}/${id}`, {
    method: 'PATCH',
    headers: constructHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ booking })
  }).then(jsonify)
    .then(data => {
      if (data.errors) {
        return { errors: data }
      } else {
        return { booking: data }
      }
    })
    .catch(handleServerError)
}

export default {
  getBooking,
  getAvailability,
  getDashboard,
  getAnnualIncome,
  postBooking,
  patchBooking
}