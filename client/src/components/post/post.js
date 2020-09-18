import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
// import PostItem from '../posts/PostItem';
import AdoptPost from '../adoption/AdoptPost';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { getPost } from '../../actions/adoptPosts';

const Post = ({ getPost, adoptpostState, loading, match, type }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);
  console.log('adoptpost', adoptpostState.adoptpost);
  return loading || adoptpostState.adoptpost === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/posts' className='btn'>
        Back To Posts
      </Link>
      <AdoptPost
        post={adoptpostState.adoptpost}
        postId={adoptpostState.adoptpost._id}
        showActions={false}
        show={true}
      />
      {type === 'visitor' ? null : (
        <CommentForm postId={adoptpostState.adoptpost._id} />
      )}
      <div className='comments'>
        {adoptpostState.adoptpost.comments &&
          adoptpostState.adoptpost.comments.map(comment => (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={adoptpostState.adoptpost._id}
            />
          ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  adoptpostState: PropTypes.object.isRequired,
  type: PropTypes.bool
};

const mapStateToProps = state => ({
  adoptpostState: state.adoptPosts,
  type: state.auth.user.type
});

export default connect(mapStateToProps, { getPost })(Post);
