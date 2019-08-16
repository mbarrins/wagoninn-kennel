const apiEndpoint = 'http://localhost:3000/api/v1'
// const apiEndpoint = 'https://wagoninn.herokuapp.com/api/v1'
const petsUrl = `${apiEndpoint}/pets`

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

const getPet = id => {
  return fetch(`${petsUrl}/${id}`, {
    headers: constructHeaders()
  }).then(jsonify)
    .then(data => {
      if (data.errors) {
        return { errors: data }
      } else {
        return { pet: data }
      }
    })
    .catch(handleServerError)
}

const postPet = pet => {
  return fetch(petsUrl, {
    method: 'POST',
    headers: constructHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ pet })
  }).then(jsonify)
    .then(data => {
      if (data.errors) {
        return { errors: data }
      } else {
        return { pet: data }
      }
    })
    .catch(handleServerError)
}

const patchPet = ({ id, pet }) => {

  return fetch(`${petsUrl}/${id}`, {
    method: 'PATCH',
    headers: constructHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ pet })
  }).then(jsonify)
    .then(data => {
      if (data.errors) {
        return { errors: data }
      } else {
        return { pet: data }
      }
    })
    .catch(handleServerError)
}

export default {
  getPet,
  postPet,
  patchPet
}