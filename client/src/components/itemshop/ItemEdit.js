import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import {editItem} from '../../actions/itemShop'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';



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
  edit: {
    color: '#4db6ac'
  },
}));

const TransitionsModal = ({editItem,item,user}) =>{
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    ...item
  })

  const { _id, name, species, picture, price, description } = state

  const onChange = e =>
    setState({ ...state, [e.target.name]: e.target.value })

 

  const [edit, setedit] = React.useState(false);
//   const handleeditClick = () => {
//     setedit(!edit);
//   };
   const handleOpen = () => {
    setOpen(true);
    setedit(!edit);
  };

  const onSubmit = async e => {
      e.preventDefault();
      setOpen(false)
      await editItem(_id,state);
      document.location.reload();
    }
    const handleCancel = e => {
        setOpen(false)
        setedit(!edit);
      }

  const handleClose = () => {
    setOpen(false);
    setedit(!edit);
  };

  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
        Edit Post
      </button> */}
      {user.type==="admin"&&
      <IconButton
            aria-label={edit}
            onClick={handleOpen}
            className={clsx(classes.dislike, {
              [classes.edit]: edit
            })}
          >
        <EditOutlinedIcon />
        </IconButton>
      }
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
        <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Nom"
                name="name"
                value={name}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Espèce"
                name="species"
                value={species}
                onChange={e => onChange(e)}
              />
              {/* <small className='form-text'>
            Ce cite utilise Gravatar. Si vous souhaitiez avoir une photo, utilisez un mail qui utilise Gravatar
          </small> */}
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="src"
                name="picture"
                value={picture}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="prix"
                name="price"
                value={price}
                onChange={e => onChange(e)}
              />
            </div>
            <input type="submit" className="btn btn-primary" value="Créer" />
            <input
              onClick={() => handleCancel()}
              className="btn btn-primary"
              defaultValue="Annuler"
            />
          </form>
        </Fade>
      </Modal>
    </div>
  );
}

TransitionsModal.propTypes = {
    setAlert: PropTypes.func.isRequired,
    editItem: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    user: state.auth.user
  });
  
  export default connect(
    mapStateToProps,
    { setAlert, editItem, TransitionsModal }
  )(TransitionsModal);