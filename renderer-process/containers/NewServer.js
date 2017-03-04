import { connect } from 'react-redux'
import NewServer from "./../components/new-server.js"
import { reduxForm } from 'redux-form'
import {addServer} from "./../actions";

const mapDispatchToProps = dispatch => {
    return {
        add: ({name, host, login, password}) => dispatch(addServer(name, host, login, password))
    }
}

export default connect( () => ({}), mapDispatchToProps )(reduxForm({form: 'newServer'})(NewServer))