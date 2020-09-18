import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import {putProfile} from '../../actions/profile'
import './Modalprofile.css'

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const TransitionsModal = ({putProfile,user}) =>{
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    ...user
  })

  const { name, adress, phone } = state

  const onChange = e =>
    setState({ ...state, [e.target.name]: e.target.value })

  const handleOpen = () => {
    setOpen(true);
  };

  const onSubmit = async e => {
      e.preventDefault();
      setOpen(false)
      await putProfile(state);
      document.location.reload();
    }
    const handleCancel = e => {
        setOpen(false)
      }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="container">
      <button className="button-edit-profile" type="button" onClick={handleOpen}>
        Edit profile
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
          <input
            type='text'
            placeholder='Nom'
            name='name'
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        {/* <div className='form-group'>
          <input
            type='email'
            placeholder='Adresse Email'
            name='email'
            value={email}
            onChange={e => onChange(e)}
          /> */}
          {/* <small className='form-text'>
            Ce cite utilise Gravatar. Si vous souhaitiez avoir une photo, utilisez un mail qui utilise Gravatar
          </small> 
        </div>*/}
        {/* <div className='form-group'>
          <input
            type='password'
            placeholder='Mot de passe'
            name='password'
            value={"123456"}
            onChange={e => onChange(e)}
            autoComplete='cc-number'
          />
        </div> */}
        <div className='form-group'>
          <input
            type='text'
            placeholder='adresse'
            name='adress'
            value={adress}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='téléphone'
            name='phone'
            value={phone}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value="Modifier" />
        <input onClick={()=>handleCancel()} className='btn btn-primary' value="Annuler" />
        </form>
        </Fade>
      </Modal>
    </div>
  );
}

TransitionsModal.propTypes = {
    setAlert: PropTypes.func.isRequired,
    putProfile: PropTypes.func.isRequired,
    user: PropTypes.object
  };
  
  const mapStateToProps = state => ({
    user: state.auth.user
  });
  
  export default connect(
    mapStateToProps,
    { setAlert, putProfile, TransitionsModal }
  )(TransitionsModal);