import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Admin from './Admin';
import NotAuthorized from '../layout/NotAuthorized';

const AdminAccessControl = ({user}) => {
    if (user && (user.type === 'admin')){
        return ( <Admin/> )
    }else{
        return ( <NotAuthorized/> )
    }
}

AdminAccessControl.propTypes = {
    user: PropTypes.object.isRequired
}
const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(AdminAccessControl)
