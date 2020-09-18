import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  addLike,
  removeLike,
  deletePost,
  addComment
} from '../../actions/adoptPosts';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CallIcon from '@material-ui/icons/Call';
import PetsIcon from '@material-ui/icons/Pets';
import AdoptPostEdit from './AdoptPostEdit';
import './AdoptPost.css';

const useStyles = makeStyles(theme => ({
  // expand: {
  //   transform: 'rotate(0deg)',
  //   marginLeft: 'auto',
  //   transition: theme.transitions.create('transform', {
  //     duration: theme.transitions.duration.shortest
  //   })
  // },
  // expandOpen: {
  //   transform: 'rotate(180deg)'
  // },
  avatar: {
    backgroundColor: blue[500]
  },
  avatarcomment: {
    backgroundColor: blue[500],
    width: 25,
    height: 25
  },
  dislike: {
    color: 'grey'
  },
  like: {
    color: '#d32f2f'
  },
  supp: {
    color: '#d50000'
  },
  edit: {
    color: '#4db6ac'
  },
  Number: {
    color: 'grey',
    fontSize: 15
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignsItems: 'center',
    maxHeight: '4em'
  },
  space: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  media: {
    display: 'block',
    height: '100%',
    width: 'auto',
    overflow: 'hidden',
    minWidth: '100%',
    maxHeight: '100%'
  },
  imgContainer: {
    display: 'flex',
    // border: "solid 1px",
    height: '21.8em',
    width: '100%',
    overflow: 'hidden'
  },
  cardFemale: {
    padding: '5px 10px',
    width: '30%',
    height: '30%',
    margin: '30px',
    boxShadow: '5px 10px 18px #F8C7B8'
  },
  cardMale: {
    padding: '5px 10px',
    width: '30%',
    height: '30%',
    margin: '30px',
    boxShadow: '5px 10px 18px #BEF4F7'
  },
  card: {
    padding: '5px 10px',
    width: '30%',
    height: '30rem',
    margin: '1rem',
    boxShadow: '5px 10px 18px #888888',
    borderRadius: '7%'
    // border: "solid 1px #FFFFFF"
  },
  icons: {
    display: 'flex'
  },
  contact: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  phone: {
    fill: '#486D84',
    width: '20px',
    margin: '0 5px 0 0'
  },
  petsIcon: {
    // fill: '#486D84',
    width: '18px',
    margin: '0 5% 0 0'
  },
  head: {
    marginTop: '4%',
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: '4em'
  },
  UserInfos: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.2,
    fontSize: '14px',
    margin: '0 10px'
  },
  petName: {
    fontFamily: '"Apple Color Emoji"',
    color: '#ED6436',
    fontWeight: 'bold',
    fontSize: 'large',
    textAlign: 'end'
  },
  Namephone: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'end'
  }
}));

function AdoptPost({
  adoptpostState,
  addLike,
  removeLike,
  deletePost,
  auth,
  post: {
    _id,
    text,
    name,
    avatar,
    user,
    likes,
    comments,
    date,
    picture,
    petName,
    species,
    race,
    dateBirth,
    sexe
  },
  showActions,
  show
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  const isliked = auth.user
    ? likes && likes.filter(el => el.user === auth.user._id).length > 0
    : false;

  const [liked, setliked] = React.useState(isliked);

  const handlelikeClick = () => {
    if (auth.user) {
      if (liked) {
        removeLike(_id);
        setliked(false);
      } else {
        addLike(_id);
        setliked(true);
      }
    }
  };
  const [supp, setsupp] = React.useState(false);

  const handledeleteClick = () => {
    setsupp(!supp);
  };

  return (
    !adoptpostState.loading && (
      <Card className={classes.card}>
        <div className={classes.head}>
          <div className={classes.icons}>
            {
              <Link to={`/profile/${user}`}>
                <Avatar
                  className={classes.avatar}
                  aria-label='recipe'
                  src={avatar}
                >
                  M
                </Avatar>
              </Link>
            }

            <div className={classes.UserInfos}>
              {
                <Link to={`/profile/${user}`}>
                  <Typography color='textSecondary'>{name}</Typography>
                </Link>
              }
              <p className='post-date'>
                <Moment format='YYYY/MM/DD'>
                  <Typography color='textSecondary'>{date}</Typography>
                </Moment>
              </p>
            </div>
          </div>

          <div className={classes.Namephone}>
            <Typography variant='body2' className='text'>
              {auth.user.phone !== '' ? (
                <div className={classes.contact}>
                  <CallIcon className={classes.phone} />
                  <Typography color='textSecondary'>
                    <span>{auth.user.phone}</span>
                  </Typography>
                </div>
              ) : null}
            </Typography>

            <div className={classes.contact}>
              <PetsIcon className={classes.petsIcon} />
              <Typography
                variant='body2'
                color='textPrimary'
                className={classes.petName}
              >
                <span> {petName}</span>
              </Typography>
            </div>
          </div>
        </div>
        {show && (
          <CardContent>
            <Typography variant='body2' color='textSecondary' className='text'>
              Description :{text}
            </Typography>
            <Typography variant='body2' color='textSecondary' className='text'>
              Nom de l'animal : {petName}
            </Typography>
            <Typography variant='body2' color='textSecondary' className='text'>
              Espèce : {species}
            </Typography>
            <Typography variant='body2' color='textSecondary' className='text'>
              Race : {race}
            </Typography>
            <Typography variant='body2' color='textSecondary' className='text'>
              Sexe de l'animal : {sexe}
            </Typography>
            <Typography variant='body2' color='textSecondary' className='text'>
              date de naissance de l'animal : {dateBirth}
            </Typography>
          </CardContent>
        )}

        {picture !== '' ? (
          <div className={classes.imgContainer}>
            {' '}
            <img className={classes.media} src={picture} />{' '}
          </div>
        ) : (
          <span></span>
        )}

        {showActions && (
          <CardActions disableSpacing className={classes.actions}>
            <div className={classes.icons}>
              {auth.user.type === 'visitor' ? null : (
                <IconButton
                  onClick={() => {
                    handlelikeClick();
                  }}
                  style={liked ? { color: '#d32f2f' } : { color: 'grey' }}
                >
                  <FavoriteIcon />
                  <span>
                    {likes.length > 0 && (
                      <span className={classes.Number}>{likes.length}</span>
                    )}
                  </span>
                </IconButton>
              )}

              {((!auth.loading && user === auth.user._id) ||
                (auth.user.type === 'admin' && user === auth.user._id) ||
                auth.user.type === 'admin') && (
                <div className={classes.icons}>
                  <IconButton
                    aria-label={supp}
                    onClick={() => {
                      deletePost(_id);
                    }}
                    className={clsx(classes.dislike, {
                      [classes.supp]: supp
                    })}
                  >
                    <DeleteIcon />
                  </IconButton>

                  <AdoptPostEdit
                    Description={{
                      text,
                      picture,
                      petName,
                      race,
                      species,
                      dateBirth,
                      sexe
                    }}
                    PostId={_id}
                  />
                </div>
              )}
            </div>

            <Link to={`/adoptposts/${_id}`} className='btn btn-secondary'>
              {'+'}
              {comments.length > 0 && (
                <span className='comment-count'>{comments.length}</span>
              )}
            </Link>
          </CardActions>
        )}
      </Card>
    )
  );
}

AdoptPost.defaultProps = {
  showActions: true
};

AdoptPost.propTypes = {
  addComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
  islikeclicked: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth,
  adoptpostState: state.adoptPosts
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  deletePost,
  addComment
})(AdoptPost);
