import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/petShopPosts';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    infos: {
      display: "flex",
    },
    
  }));


const PetshopForm = ({ addPost }) => {

const classes = useStyles();
const [state, setState] = useState('');


const {text, picture, petName, price, species, race, sexe, dateBirth}= state
const onChange = e => setState({ ...state, [e.target.name]: e.target.value });


  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Say Something...</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addPost(state);
          setState('');
         document.location.reload();

        }}>
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={text}
          onChange={e => onChange(e)}
          required
        />
        <textarea
          name='picture'
          cols='30'
          rows='1'
          placeholder='SRC IMG'
          value={picture}
          onChange={e => onChange(e)}
          required
        />
        <div className={classes.infos}>
        <textarea
          name='petName'
          cols='3'
          placeholder='Nom'
          value={petName}
          onChange={e => onChange(e)}
          required
        />
        <textarea
          name='price'
          cols='3'
          placeholder='Prix'
          value={price}
          onChange={e => onChange(e)}
          required
        />
        <textarea
          name='species'
          cols='3'
          placeholder='Espèce'
          value={species}
          onChange={e => onChange(e)}
          required
        />
        <textarea
          name='race'
          cols='3'
          placeholder='Race'
          value={race}
          onChange={e => onChange(e)}
        />
         <textarea
          cols='3'
          placeholder='male/female'
          name='sexe'
          defaultValue={sexe}
          onChange={e => {
            onChange(e);
          }} 
          />
        <input
        type="date"
        placeholder="Date de naissance"
        name="dateBirth"
        value={dateBirth}
        onChange={e => onChange(e)}
        />
        </div>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

PetshopForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(PetshopForm);