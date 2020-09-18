import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { addPet } from "../../actions/petProfile";
import './ModalPetAdd.css'

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

const PetModal = ({ addPet, user }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({});

  const { petName, sex, picture, species, race, userId=user._id, dateBirth } = state;

  const onChange = e => setState({ ...state, [e.target.name]: e.target.value });

  const handleOpen = () => {
    setOpen(true);
  };

  const onSubmit = async e => {
    e.preventDefault();
    setOpen(false);
    await addPet(state);
    document.location.reload();
  };
  const handleCancel = e => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="addbutton-container">
      {/* <button className="addbutton" type="button" onClick={handleOpen}>
        Ajouter un pet
      </button> */}
      <Modal className="card-container1"
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
                placeholder="Sexe"
                name="sex"
                value={sex}
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
};

PetModal.propTypes = {
  setAlert: PropTypes.func.isRequired,
  addPet: PropTypes.func.isRequired,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, {
  setAlert,
  addPet,
  PetModal
})(PetModal);
