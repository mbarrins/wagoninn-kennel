import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Spinner from 'react-bootstrap/Spinner';
import FieldInput from '../formComponents/FieldInput'
import SelectInput from '../formComponents/SelectInput'
import { postPet, updatePet, clearPet, getPet, submitUpdatePet } from '../../actions/petActions'
import moment from 'moment'

class PetDisplay extends React.Component {

  componentDidMount() {
    this.props.getPet(this.props.match.params.id)
  }

  render() {
    const { lookups, lookups: { errors }, pet: { id, name, pet_type_id, dob, sex_id, breed_id, color_id, size_id, spayed_neutered, immunisations,
      foods, health_details, special_needs, medications, sociabilities, issues } } = this.props

    if (this.props.lookups.loading || this.props.pet.loading || lookups.petTypes.length === 0) return (
      <Row className='justify-content-center'>
        <Spinner animation="border" role="status" />
      </Row>
    )

    const pet_type = lookups.petTypes.find(type => type.id === pet_type_id).name
    const sex = lookups.sexes.find(sex => sex.id === sex_id).name
    const desc = pet_type === 'Dog' ? lookups.breeds.find(breed => breed.id === breed_id).name : lookups.colors.find(color => color.id === color_id).name
    const size = lookups.sizes.find(size => size.id === size_id).name

    return (
      <Container className='mt-5' fluid={true}>
        <Row className='justify-content-center'>
          <Col className='col-9 text-center center-block'>
            <h1 className='text-center'>{pet_type} Details</h1>
            {errors.map((error, i) => <p key={`error${i}`} style={{ color: 'red' }}>{error}</p>)}
            <Row>
              <Col className='text-center my-auto'>
                <Row>
                  <Col className='text-center' ><h5>{name} - {desc} ({size}, {sex})</h5></Col>
                  <Col className='text-center' ><h5>{moment().diff(dob, 'years')} years old  ({moment(dob).format('MM/DD/YYYY')})</h5></Col>
                </Row>
              </Col>
            </Row>

            <Row>
              <Col className='text-center my-auto'>
                <Row>
                  <Col className={`text-center${spayed_neutered ? '' : ' text-danger'}`} ><h5>{name} has {spayed_neutered ? '' : 'NOT '}been spayed or neutered.</h5></Col>
                </Row>
              </Col>
            </Row>

            {immunisations.length > 0 && <><hr /><h3 className='text-center'>Immunisations</h3></>}
            {immunisations.map((shot, index) => (
              <Row key={`shot${index}`}>
                <Col>
                  <SelectInput
                    disabled={true}
                    field={`immunisation-${index}`}
                    label=''
                    labelSize={0}
                    selectSize={10}
                    value={shot.immunisation_id}
                    section='immunisations'
                    options={(parseInt(pet_type_id, 10) === lookups.petTypes.find(pet_type_id => pet_type_id.name === 'Dog').id) ? lookups.immunisations.dog : lookups.immunisations.cat}
                  />
                </Col>
                <Col>
                  <SelectInput
                    field='validity_id'
                    label='Validity'
                    index={index}
                    labelSize={5}
                    selectSize={7}
                    value={shot.validity_id}
                    options={lookups.validity}
                    section='immunisations'
                    handleChange={this.handleNestedChange}
                  />
                </Col>
                <Col className='col-4'>
                  <FieldInput
                    inputType='date'
                    field='effective_date'
                    label='Effective Date'
                    index={index}
                    labelSize={5}
                    inputSize={7}
                    value={shot.effective_date}
                    section='immunisations'
                    handleChange={this.handleNestedChange}
                  />
                </Col>
                <Col className='col-4'>
                  <FieldInput
                    inputType='date'
                    field='expiry_date'
                    label='Expiry Date'
                    index={index}
                    labelSize={5}
                    inputSize={7}
                    section='immunisations'
                    value={shot.expiry_date}
                    disabled={true}
                    handleChange={this.handleNestedChange}
                  />
                </Col>
                {/* Button to show Update when immunisation expired */}
                {/* <div className='text-center'>
                <Button variant='outline-dark' onClick={this.removeItem}>delete</Button>
              </div> */}
              </Row>
            ))}

            <hr />



            <Row className='mb-3'>
              <Col className='align-center'>
                <h5 className='text-center'>{foods.length > 0 ? '' : 'No '}Food Requirements</h5>
              </Col>
            </Row>

            {foods.map((food, index) => (
              <Row key={`food${index}`}>
                <Col>
                  <SelectInput
                    field='food_id'
                    label='Food'
                    index={index}
                    labelSize={5}
                    selectSize={7}
                    value={food.food_id}
                    options={lookups.foods}
                    section='foods'
                    handleChange={this.handleNestedChange}
                  />
                </Col>
                <Col>
                  <FieldInput
                    type='number'
                    field='quantity'
                    label='Quantity'
                    index={index}
                    labelSize={5}
                    selectSize={7}
                    value={food.quantity}
                    section='foods'
                    handleChange={this.handleNestedChange}
                  />
                </Col>
                <Col>
                  <SelectInput
                    field='measure_id'
                    label='Measure'
                    index={index}
                    labelSize={5}
                    selectSize={7}
                    value={food.measure_id}
                    options={lookups.measures}
                    section='foods'
                    handleChange={this.handleNestedChange}
                  />
                </Col>
                <Col>
                  <SelectInput
                    field='schedule_id'
                    label='Schedule'
                    index={index}
                    labelSize={5}
                    selectSize={7}
                    value={food.schedule_id}
                    options={lookups.schedules}
                    section='foods'
                    handleChange={this.handleNestedChange}
                  />
                </Col>
              </Row>
            ))}

            <hr />

            <Row className='mb-3'>
              <Col className='align-center'>
                <h5 className='text-center'>{health_details.length > 0 ? '' : 'No '}Health Details</h5>
              </Col>
            </Row>

            {health_details.map((health_detail, index) => (
              <Row key={`health_detail${index}`}>
                <Col className='col-5'>
                  <SelectInput
                    field='health_detail_id'
                    label=''
                    index={index}
                    labelSize={0}
                    selectSize={10}
                    value={health_detail.health_detail_id}
                    options={lookups.healthDetails}
                    section='health_details'
                    handleChange={this.handleNestedChange}
                  />
                </Col>
                <Col>
                  <div className='text-center'>
                    <Button variant='outline-dark' data-toggle='button' active={!health_detail.inactive} onClick={e => this.handleNestedChange('inactive', !health_detail.inactive, index, 'health_details')} >{health_detail.inactive ? 'Inactive' : 'Active'}</Button>
                  </div>
                </Col>
                <Col>
                  <FieldInput
                    inputType='text'
                    diabled={true}
                    field='alert'
                    label=''
                    index={index}
                    labelSize={2}
                    inputSize={10}
                    value={health_detail.health_detail_id === '' ? '' : lookups.healthDetails.find(need => need.id === parseInt(health_detail.health_detail_id, 10)).alert}
                    handleChange={e => e}
                    section='health_details'
                  />
                </Col>
              </Row>
            ))}

            <hr />

            <Row className='mb-3'>
              <Col className='align-center'>
                <h5 className='text-center'>{special_needs.length > 0 ? '' : 'No '}Special Needs</h5>
              </Col>
            </Row>

            {special_needs.map((special_need, index) => (
              < React.Fragment key={`special_need${index}`} >
                <Row>
                  <Col className='col-5'>
                    <SelectInput
                      field='special_need_id'
                      label=''
                      index={index}
                      labelSize={0}
                      selectSize={10}
                      value={special_need.special_need_id}
                      options={lookups.specialNeeds}
                      section='special_needs'
                      handleChange={this.handleNestedChange}
                    />
                  </Col>
                  <Col>
                    <div className='text-center'>
                      <Button variant='outline-dark' data-toggle='button' active={!special_need.inactive} onClick={e => this.handleNestedChange('inactive', !special_need.inactive, index, 'special_needs')} >{special_need.inactive ? 'Inactive' : 'Active'}</Button>
                    </div>
                  </Col>
                  <Col>
                    <FieldInput
                      inputType='text'
                      diabled={true}
                      field='alert'
                      label=''
                      index={index}
                      labelSize={2}
                      inputSize={10}
                      value={special_need.special_need_id === '' ? '' : lookups.specialNeeds.find(need => need.id === parseInt(special_need.special_need_id, 10)).alert}
                      handleChange={e => e}
                      section='special_needs'
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FieldInput
                      inputType='text'
                      diabled={true}
                      field='action_needed'
                      label='Action needed'
                      index={index}
                      labelSize={2}
                      inputSize={10}
                      value={special_need.special_need_id === '' ? '' : lookups.specialNeeds.find(need => need.id === parseInt(special_need.special_need_id, 10)).action_needed}
                      handleChange={e => e}
                      section='special_needs'
                    />
                  </Col>
                </Row>
              </ React.Fragment>
            ))}

            <hr />

            <Row className='mb-3'>
              <Col className='align-center'>
                <h5 className='text-center'>{medications.length > 0 ? '' : 'No '}Medications</h5>
              </Col>
            </Row>

            {medications.map((medication, index) => (
              <Row key={`medication${index}`}>
                <Col>
                  <SelectInput
                    field='medication_id'
                    label=''
                    index={index}
                    labelSize={0}
                    selectSize={10}
                    value={medication.medication_id}
                    options={lookups.medications}
                    section='medications'
                    handleChange={this.handleNestedChange}
                  />
                </Col>
                <Col>
                  <FieldInput
                    type='number'
                    field='dose_quantity'
                    label='Quantity'
                    index={index}
                    labelSize={5}
                    selectSize={7}
                    value={medication.dose_quantity}
                    section='medications'
                    handleChange={this.handleNestedChange}
                  />
                </Col>
                <Col>
                  <SelectInput
                    field='dose_id'
                    label='Dose'
                    index={index}
                    labelSize={5}
                    selectSize={7}
                    value={medication.dose_id}
                    options={lookups.doses}
                    section='medications'
                    handleChange={this.handleNestedChange}
                  />
                </Col>
                <Col>
                  <SelectInput
                    field='schedule_id'
                    label='Schedule'
                    index={index}
                    labelSize={5}
                    selectSize={7}
                    value={medication.schedule_id}
                    options={lookups.schedules}
                    section='medications'
                    handleChange={this.handleNestedChange}
                  />
                </Col>
              </Row>
            ))}

            <hr />

            <Row className='mb-3'>
              <Col className='align-center'>
                <h5 className='text-center'>{sociabilities.length > 0 ? '' : 'No '}Sociabilities</h5>
              </Col>
            </Row>

            {sociabilities.map((sociability, index) => (
              <Row key={`sociability${index}`}>
                <Col className='col-5'>
                  <SelectInput
                    field='sociability_id'
                    label=''
                    index={index}
                    labelSize={0}
                    selectSize={10}
                    value={sociability.sociability_id}
                    options={lookups.sociabilities}
                    section='sociabilities'
                    handleChange={this.handleNestedChange}
                  />
                </Col>
                <Col>
                  <div className='text-center'>
                    <Button variant='outline-dark' data-toggle='button' active={!sociability.inactive} onClick={e => this.handleNestedChange('inactive', !sociability.inactive, index, 'sociabilities')} >{sociability.inactive ? 'Inactive' : 'Active'}</Button>
                  </div>
                </Col>
                <Col>
                  <FieldInput
                    inputType='text'
                    diabled={true}
                    field='alert'
                    label=''
                    index={index}
                    labelSize={2}
                    inputSize={10}
                    value={sociability.sociability_id === '' ? '' : lookups.sociabilities.find(need => need.id === parseInt(sociability.sociability_id, 10)).alert}
                    handleChange={e => e}
                    section='sociabilities'
                  />
                </Col>
              </Row>
            ))}

            <hr />

            <Row className='mb-3'>
              <Col className='align-center'>
                <h5 className='text-center'>{issues.length > 0 ? '' : 'No '}Issues</h5>
              </Col>
            </Row>

            {issues.map((issue, index) => (
              <Row key={`issue${index}`}>
                <Col className='col-5'>
                  <SelectInput
                    field='issue_id'
                    label=''
                    index={index}
                    labelSize={0}
                    selectSize={10}
                    value={issue.issue_id}
                    options={lookups.issues}
                    section='issues'
                    handleChange={this.handleNestedChange}
                  />
                </Col>
                <Col>
                  <div className='text-center'>
                    <Button variant='outline-dark' data-toggle='button' active={!issue.inactive} onClick={e => this.handleNestedChange('inactive', !issue.inactive, index, 'issues')} >{issue.inactive ? 'Inactive' : 'Active'}</Button>
                  </div>
                </Col>
                <Col>
                  <FieldInput
                    inputType='text'
                    diabled={true}
                    field='alert'
                    label=''
                    index={index}
                    labelSize={2}
                    inputSize={10}
                    value={issue.issue_id === '' ? '' : lookups.issues.find(need => need.id === parseInt(issue.issue_id, 10)).alert}
                    handleChange={e => e}
                    section='issues'
                  />
                </Col>
              </Row>
            ))}

            <hr />

            <ButtonToolbar className='justify-content-center mt-3'>
              <Link to={`/pets/${id}/edit`} >
                <Button variant='secondary' >Edit Pet</Button>
              </Link>
            </ButtonToolbar>

          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    lookups: state.lookups,
    pet: state.pet,
    owner: state.owner
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postPet: props => dispatch(postPet(props)),
    updatePet: props => dispatch(updatePet(props)),
    submitUpdatePet: props => dispatch(submitUpdatePet(props)),
    getPet: props => dispatch(getPet(props)),
    clearPet: () => dispatch(clearPet())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PetDisplay);