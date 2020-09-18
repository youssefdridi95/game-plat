import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { editPet } from "../../actions/petProfile";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const PetEditModal = ({ editPet, pet, user }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState(pet);

  const { petName, picture, species, sex, race, dateBirth, UserId } = state;

  const onChange = e => setState({ ...state, [e.target.name]: e.target.value });

  const handleOpen = () => {
    setOpen(true);
  };

  const onSubmit = async e => {
    e.preventDefault();
    setOpen(false);
    await editPet(pet._id,state);
    // document.location.reload();
  };
  const handleCancel = e => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    <button
        className="MuiButtonBase-root MuiIconButton-root makeStyles-dislike-185"
        tabIndex="0"
        type="button"
        aria-label="false"
        onClick={handleOpen}
      >
        <span className="MuiIconButton-label">
          <svg
            className="MuiSvgIcon-root"
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
            role="presentation"
          >
            <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"></path>
          </svg>
        </span>
        <span className="MuiTouchRipple-root"></span>
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
          timeout: 500
        }}
      >
        <Fade in={open}>
          <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Nom"
                name="petName"
                value={petName}
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
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="sexe"
                name="sex"
                value={sex}
                onChange={e => onChange(e)}
              />
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
                placeholder="race"
                name="race"
                value={race}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="date"
                placeholder="Date de naissance"
                name="dateBirth"
                value={dateBirth}
                onChange={e => onChange(e)}
              />
            </div>
            <input type="submit" className="btn btn-primary" value="Enregistrer" />
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
};

PetEditModal.propTypes = {
  setAlert: PropTypes.func.isRequired,
  editPet: PropTypes.func.isRequired,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, {
  setAlert,
  editPet,
  PetEditModal
})(PetEditModal);
