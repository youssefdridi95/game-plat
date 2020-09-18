import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import UserCard from './UserCard';
import { getAllUsers } from '../../actions/adminAct';
import Spinner from '../layout/Spinner';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const GetUsers = ({getAllUsers, loading, list}) => {
    const getUserClass = useStyles();
    useEffect(()=>{
        getAllUsers()
    },[])
    return (
        <div className={getUserClass.root}>
            {loading?(<Spinner/>):list.map((el, index) => <UserCard user={el} key={index} />)}
        </div>
    )
}

GetUsers.propTypes = {
    loading: PropTypes.bool.isRequired,
    list: PropTypes.array,
    getAllUsers:PropTypes.func.isRequired
}
const mapStateToProps = state => {
    return {
        loading: state.admin.loading,
        list: state.admin.users
    }
}

export default connect(mapStateToProps, { getAllUsers })(GetUsers)
