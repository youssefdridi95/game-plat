import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Spinner from '../layout/Spinner';
// import PostItem from './postItem';

import PetshopForm from './PetshopForm';
import PetshopPosts from './PetshopPosts'
import { getPosts } from '../../actions/petShopPosts';
import SideBarFiltreSearch from './filterSearchComp/SideBarFiltreSearch';

const useStyles = makeStyles(theme => ({
  posts:{
    display:"flex",
    width:"100%",
    flexWrap: "wrap"
  }
}));

const PetSopPosts = ({ getPosts, petShopPosts, loading, type }) => {
  useEffect(() => {getPosts()}, [getPosts]);

  const classes = useStyles();
  // search filter config
  const [myFilter, setFilter] = useState({
    fltrOption:"", fltrValue:null
  });
  const filterBy = (fltrOption, fltrValue) => {
    if (fltrOption===''||fltrValue===''){
      setFilter({fltrOption:"", fltrValue:null})
    }else{ setFilter({fltrOption, fltrValue}) }
  }
  const { fltrOption, fltrValue } = myFilter;
  // price filer config
  const [minMax, setMinMax] = useState([]);
  const priceRange = arr => setMinMax(arr);
  return (
loading ? 
<Spinner />:
<Fragment>
   
      <h1 className='large text-primary'>Posts</h1>
      <SideBarFiltreSearch filterBy={filterBy} priceRange={priceRange}/>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome Pet Shop
      </p>
     
      {type === "visitor" ? null : <PetshopForm />}

       <div className={classes.posts}>
        {petShopPosts.filter(el=> minMax.length === 2 ? el.price > minMax[0] && el.price < minMax[1] : true)
        .filter(el => fltrOption ? el[fltrOption] === fltrValue : true )
        .map(post => (
          <PetshopPosts key={post._id} post={post} />
        ))}
      </div> 
    
    </Fragment>
  );
};

PetSopPosts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  petShopPosts: PropTypes.array.isRequired,
  type: PropTypes.bool
};

const mapStateToProps = state => ({
    petShopPosts: state.petShopPosts.petShopPosts,
    type:state.auth.user.type
});

export default connect(
  mapStateToProps,
  { getPosts }
)(PetSopPosts);