import React, { Fragment,useEffect } from "react";
import Moment from 'react-moment';
import { connect } from "react-redux";
import { getPets } from "../../actions/petProfile";
import PropTypes from 'prop-types';
import Modalprofile from './Modalprofile';
import Card from './Card'
import PetModal from './ModalPetAdd'
import './Profile.css'

const Profile = ({ getPets, auth, user, pets }) => {
    useEffect(()=>{
    getPets(user._id)},[user])
  return !auth.token ? (
      <span>login to continue</span>
    ) : (
    <div className="profile-container">
    <div className="profile">
    <Modalprofile/>
    {/* <SimpleModal/> */}
      <h1>{user.name}</h1>
      <img src={user?user.avatar:""} height="100%" width="auto" alt="img error"/>
      <p>E-mail : {user.email}</p>
      <p>Adresse : {user.adress}</p>
      <p>N° de téléphone : {user.phone}</p>
      <p>Date d'inscription : <Moment format='DD/MM/YYYY'>{user.date}</Moment></p>
      </div>
      <div className="card-container">
      <PetModal/>
      <div className="card-container2">
      {pets.map((el,i)=>
      <Card key={i} pet={el}/>)}
      </div>
      </div>
      {/* <div key={i}>
      <h1>{el?el.name:""}</h1>
      <img width="200px" height="auto" src={el?el.picture[0]:""} alt="img error"/>
      <p>species : {el&&el.species}</p>
      <p>Adresse : {el&&el.address}</p>
      <p>race : {el.race}</p>
      <p>{`dateBirth : ${el.dateBirth.split('T')[0]}`}</p>
      </div>
      </div> 
      )} */}
      </div>
    )
   }

   Profile.propTypes = {
    getPets: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    pets: PropTypes.array
  };

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user,
  pets: state.petProfile
});

export default connect(mapStateToProps, {getPets})(Profile);
