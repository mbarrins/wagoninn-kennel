const apiEndpoint = 'http://localhost:3000/api/v1'
const lookupsUrl = `${apiEndpoint}/lookups`

const jsonify = res => {
  return res.json()     
}

const handleServerError = response => {
  console.log('handle error: ', response)
  return {errors: response.errors}
}

const constructHeaders = (moreHeaders = {}) => (
  {
      'Authorization': localStorage.getItem('token'),
      ...moreHeaders
  }
)

const getLookups = () => {
  return fetch(lookupsUrl, {
    headers: constructHeaders()
  }).then(jsonify)
  .then(data => {
    if (data.errors) {
      return {errors: data.errors}
    } else {
      return {lookups: data.lookups}
    }
  })
  .catch(handleServerError)
}

export default {
  getLookups
}