// import React,{useEffect} from 'react'
// import { getItems } from "../../actions/itemShop";
// import { connect } from "react-redux";
// import PropTypes from 'prop-types';

// const Itemshop = ({getItems,auth,itemShop}) => {
//   useEffect(()=>{
//   getItems()},[])
//   return (
//     <div>
//       <h1>Itemshop</h1>
//       {
//         itemShop.map(el=>
//           <ItemCard item={el}/>
//         )
//       }
//       </div>
//   )
// };
// Itemshop.propTypes = {
//   getItems: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   itemShop: PropTypes.array
// };

// const mapStateToProps = state => ({
// auth: state.auth,
// itemShop: state.itemShop
// });

// export default connect(mapStateToProps,{getItems})(Itemshop);