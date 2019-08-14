const apiEndpoint = 'http://localhost:3000/api/v1'
// const apiEndpoint = 'https://wagoninn.herokuapp.com/api/v1'
const ownersUrl = `${apiEndpoint}/owners`

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

const getOwner = id => {
  return fetch(`${ownersUrl}/${id}`, {
    headers: constructHeaders()
  }).then(jsonify)
  .then(data => {
    if (data.errors) {
      return {errors: data}
    } else {
      return {owner: data}
    }
  })
  .catch(handleServerError)
}

const searchOwners = searchTerm => {
  return fetch(`${ownersUrl}/?q=${searchTerm}`, {
    headers: constructHeaders()
  }).then(jsonify)
  .then(data => {
    if (data.errors) {
      return {errors: data}
    } else {
      return {owners: data}
    }
  })
  .catch(handleServerError)
}

const postOwner = owner => {
  return fetch(ownersUrl, {
    method: 'POST',
    headers: constructHeaders({'Content-Type': 'application/json'}),
    body: JSON.stringify({ owner })
  }).then(jsonify)
  .then(data => {
    if (data.errors) {
      return {errors: data}
    } else {
      return {owner: data}
    }
  })
  .catch(handleServerError)
}

const patchOwner = ({id, owner}) => {
  console.log(`${ownersUrl}/${id}`, {owner})
  return fetch(`${ownersUrl}/${id}`, {
    method: 'PATCH',
    headers: constructHeaders({'Content-Type': 'application/json'}),
    body: JSON.stringify({ owner })
  }).then(jsonify)
  .then(data => {
    if (data.errors) {
      return {errors: data}
    } else {
      return {owner: data}
    }
  })
  .catch(handleServerError)
}

export default {
  getOwner,
  postOwner,
  searchOwners,
  patchOwner
}