export const apiEndpoint = 'http://localhost:3000/api/v1'
// export const apiEndpoint = 'https://wagoninn.herokuapp.com/api/v1'

export const loginUrl = `${apiEndpoint}/login`
export const validateUrl = `${apiEndpoint}/validate`
export const bookingsUrl = `${apiEndpoint}/bookings`
export const bookingPensUrl = `${apiEndpoint}/booking_pens`
export const lookupsUrl = `${apiEndpoint}/lookups`
export const petsUrl = `${apiEndpoint}/pets`
export const ownersUrl = `${apiEndpoint}/owners`

export const emptyPetItems = {
  'foods': { food_id: '', quantity: '', measure_id: '', schedule_id: '' },
  'health_details': { health_detail_id: '', inactive: false },
  'special_needs': { special_need_id: '', inactive: false },
  'medications': { medication_id: '', dose_quantity: '', dose_id: '', schedule_id: '' },
  'sociabilities': { sociability_id: '', inactive: false },
  'issues': { issue_id: '', inactive: false }
}

export const petEdit = "/pets/:id/edit"
export const ownerEdit = "/owners/:id/edit"
export const bookingEdit = "/bookings/:id/edit"