import React from 'react';
import store from '../../store';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CheckForAdmin = props => {

  return (
    <div>
      
    </div>
  )
}

CheckForAdmin.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
}
const mapStateToProps = store => ({
  isAuthenticated: store.auth.isAuthenticated,
  user: store.auth.user
})

export default connect(mapStateToProps)(CheckForAdmin)