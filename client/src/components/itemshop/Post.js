import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
// import PostItem from '../posts/PostItem';
import Item from './Item';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { getItem } from '../../actions/itemShop';

const ItemPost = ({ getItem, item, match, type }) => {
  useEffect(() => {
    getItem(match.params.id);
  }, [match.params.id]);
  console.log('item', item)
  return   item === null ? (
    <Spinner />
  ) :
  (
    <Fragment>
      <Link to="/itemshop" className="btn">
        Back To Itemshop
      </Link> 
      <Item item={item} itemId={item._id} showActions={false} />
       {type === "visitor" ? null : <CommentForm itemId={item._id} />}
       <div className="comments">
        {item.comments.map(comment => (
           <CommentItem key={comment._id} comment={comment} itemId={item._id} />
        ))}
      </div>
    </Fragment>
  );
};

ItemPost.propTypes = {
  getItem: PropTypes.func.isRequired,
  type: PropTypes.bool
  // item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.itemShop.item,
  type:state.auth.user.type
});

export default connect(mapStateToProps, { getItem })(ItemPost);