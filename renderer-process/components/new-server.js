import React from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'

var SimpleForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  
  return (
    <form onSubmit={handleSubmit(data => props.add(data))}>
      <div>
        <label>Name</label>
        <div>
          <Field name="name" component="input" type="text" placeholder="Name"/>
        </div>
      </div>
      <div>
        <label>Host</label>
        <div>
          <Field name="host" component="input" type="text" placeholder="Host"/>
        </div>
      </div>
      <div>
        <label>Login</label>
        <div>
          <Field name="login" component="input" type="text" placeholder="Login"/>
        </div>
      </div>
      <div>
        <label>Password</label>
        <div>
          <Field name="password" component="input" type="password" placeholder="Password"/>
        </div>
      </div>
      
      <div>
        <button type="submit" disabled={false}>Submit</button>
      </div>
    </form>
  )
}

SimpleForm = reduxForm({
    form: 'newServer'  // a unique identifier for this form
})(SimpleForm)

//const selector = formValueSelector('newServer');

SimpleForm = connect(
  state => ({}),
  // dispatch => {
  //   return {
  //     add: ({name, host, login, password}) => {
  //       dispatch(addServer(name, host, login, password));
  //     }
  //   }
  // }
)(SimpleForm)
// SimpleForm = connect(
//     state => {
        
//         let name = selector(state, "name");
//         let host = selector(state, "host");
//         let login = selector(state, "login");
//         let password = selector(state, "password");

//         return {
//             name,
//             host,
//             login,
//             password    
//         }
//     }
// )(SimpleForm)

module.exports = SimpleForm;