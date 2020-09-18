import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { editPost } from '../../actions/adoptPosts';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  edit: {
    color: '#4db6ac'
  }
}));

const TransitionsModal = ({
  user,
  editPost,
  PostId,
  Description
}) => {
  const classes = useStyles();
    
  const [state, setState] = React.useState({...Description});

  const {text, picture, petName, species, race, dateBirth, sexe}= state
  const onChange = e => setState({ ...state, [e.target.name]: e.target.value });


const [open, setOpen] = React.useState(false);

const [edit, setedit] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    setedit(!edit);
  };

  const onSubmit = async e => {   

    e.preventDefault();
    setedit(!edit);
    setOpen(false);
    await editPost(PostId, state);
    // document.location.reload();
  };

  const handleCancel = e => {
    setOpen(false);
    setedit(!edit);
  };

  const handleClose = () => {
    setOpen(false);
    setedit(!edit);
  };

  return (
    <div>
      <IconButton
        aria-label={edit}
        onClick={handleOpen}
        className={clsx(classes.dislike, {
          [classes.edit]: edit
        })}
      >
        <EditOutlinedIcon />
      </IconButton>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          
          <form className='form' onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Description'
                name='text'
                defaultValue={text}
                onChange={e => {
                  onChange(e);
                }} 
                />
                <input
                type='text'
                placeholder='IMG SRC'
                name='picture'
                defaultValue={picture}
                onChange={e => {
                  onChange(e);
                }} 
                />
                <input
                type='text'
                placeholder='Nom'
                name='petName'
                defaultValue={petName}
                onChange={e => {
                  onChange(e);
                }} 
                />
                <input
                type='text'
                placeholder='Espèce'
                name='species'
                defaultValue={species}
                onChange={e => {
                  onChange(e);
                }} 
                />
                <input
                type='text'
                placeholder='Race'
                name='race'
                defaultValue={race}
                onChange={e => {
                  onChange(e);
                }} 
                />
                 <input
                type='text'
                placeholder='male/female'
                name='sexe'
                defaultValue={sexe}
                onChange={e => {
                  onChange(e);
                }} 
                />
                <input
                type='text'
                placeholder='Date de naissance'
                name='dateBirth'
                defaultValue={dateBirth}
                onChange={e => {
                  onChange(e);
                }} 
                />

            </div>

            <input
              type='submit'
              className='btn btn-primary'
              defaultValue='Modifier'
              onClick={(e) => {
                onSubmit(e)
              }}
            />
            <input
              onClick={() => handleCancel()}
              className='btn btn-primary'
              defaultValue='Annuler'
            />
          </form>
        </Fade>
      </Modal>
    </div>
  );
};

TransitionsModal.propTypes = {
  setAlert: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  Description: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, {
  setAlert,
  editPost,
  TransitionsModal
})(TransitionsModal);
