  
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from '../layout/Spinner';
import ModalItemAdd from './ModalItemAdd'
// import ItemForm from './ItemForm';
import Item from './Item'
import { getItems } from '../../actions/itemShop';
import SideBarFiltreSearch from './filterSearchComp/SideBarFiltreSearch';


const useStyles = makeStyles(theme => ({
  posts:{
    display:"flex",
    width:"100%",
    flexWrap: "wrap"
  }
}));

const Items = ({ getItems, items, type, loading }) => {
  useEffect(() => {getItems()}, [getItems]);
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
   
      <h1 className='large text-primary'>Items</h1>
      <SideBarFiltreSearch filterBy={filterBy} priceRange={priceRange}/>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome to the community
      </p>
     {type==="admin"&&
      <ModalItemAdd />}
       <div className={classes.posts}>
        {items.filter(el=> minMax.length === 2 ? el.price > minMax[0] && el.price < minMax[1] : true)
        .filter(el => fltrOption === 'species' ? el.species.includes(fltrValue) : fltrOption ? el[fltrOption] === fltrValue : true )
        .map(item => (
          <Item key={item._id} item={item} />
        ))}
      </div> 
    
    </Fragment>
  );
};

Items.propTypes = {
  getItems: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    items: state.itemShop.items,
    type:state.auth.user.type
});

export default connect(
  mapStateToProps,
  { getItems }
)(Items);