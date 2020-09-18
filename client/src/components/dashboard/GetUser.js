import React, { useEffect, useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import UserCard from './UserCard';
import { getUser } from '../../actions/adminAct';
import Spinner from '../layout/Spinner';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center',
        width: '100%',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const GetUser = ({user, loading, getUser }) => {
    const getUserClass = useStyles();
    // useEffect(()=>{
    //     getUser()
    // },[])
    const [formData, setFormData] = useState({
        id: '',
        submitted:false,
      });
      const { id, submitted } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        setFormData({ ...formData, submitted: true });
        getUser(id);
      };
    return (
        <div className={getUserClass.root}>
            <form className='form-group' onSubmit={onSubmit}>
                <input type='text' placeholder="precisez l'identifiant de l'utilisateur" onChange={e=>onChange(e)} value={id} name='id'/>
                
            </form>
            {submitted?(loading?(<Spinner/>):(<UserCard user={user}/>)):''}
        </div>
    )
}

GetUser.propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.array
}
const mapStateToProps = state => {
    return {
        loading: state.admin.loading,
        user: state.admin.user
    }
}

export default connect(mapStateToProps, { getUser })(GetUser)
