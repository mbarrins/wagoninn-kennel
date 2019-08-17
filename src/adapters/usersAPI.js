import { loginUrl, validateUrl } from '../constants'

const jsonify = res => {
  return res.json()
}

const handleServerError = response => {
  console.log('handle error: ', response)
  return { errors: response.errors }
}

const constructHeaders = (moreHeaders = {}) => (
  {
    'Authorization': localStorage.getItem('token'),
    ...moreHeaders
  }
)

const logIn = (user) => {
  return fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user })
  }).then(jsonify)
    .then(data => {
      if (data.errors) {
        return { errors: data.errors }
      } else {
        localStorage.setItem('token', data.token)
        return { user: data.user }
      }
    })
    .catch(handleServerError)
}

const validateUser = () => {
  if (!localStorage.getItem('token')) return Promise.resolve({ error: 'no token' })

  return fetch(validateUrl, {
    headers: constructHeaders()
  }).then(jsonify)
    .then(data => {
      localStorage.setItem('token', data.token)
      return data.user
    })
    .catch(handleServerError)
}

const clearToken = () => localStorage.removeItem('token')


export default {
  logIn,
  validateUser,
  clearToken
}