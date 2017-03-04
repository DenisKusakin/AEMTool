import React from 'react'
import { Field, Form } from 'redux-form'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

var renderTextField = props => (
  <TextField hintText={props.label}
    floatingLabelText={props.label}
    errorText={props.touched && props.error}
    {...props}
  />
)
//TODO: Fix
renderTextField = "input"

export default (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  
  return (
    <Form onSubmit={handleSubmit((data) => props.add(data))}>
        <div>
          <div>
            <Field name="name" component={renderTextField} type="text" placeholder="Name"/>
          </div>
          <div>
            <Field name="host" component={renderTextField} type="text" placeholder="Host"/>
          </div>
          <div>
            <Field name="login" component={renderTextField} type="text" placeholder="Login"/>
          </div>
          <div>
            <Field name="password" component={renderTextField} type="password" placeholder="Password"/>
          </div>
          <div>
            <button type="submit" disabled={false}>Save</button>
          </div>
        </div>
    </Form>
  )
}