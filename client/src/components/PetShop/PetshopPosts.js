import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost, addComment } from '../../actions/petShopPosts';
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
import PetShopPostEdit from '../PetShop/PetShopPostEdit'
import '../adoption/AdoptPost.css';
import CallIcon from '@material-ui/icons/Call';


const useStyles = makeStyles(theme => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
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
  space: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  media: {
    width: '100%',
    // padding: '0px 10px',
    justifyContent: 'center',
    height: '350px'
  },
  card: {
    padding: '5px 10px',
    width: '30%',
    height: '480px',
    margin: '20px',
    boxShadow: '5px 10px 18px #888888'
  },
  icons: {
    display: 'flex'
  },
  contact: {
    display: 'flex',
    // border: 'solid 1px #486D84',
    // borderRadius: '5px'
    // alignContent:"center",
    // justifyContent:"baseline"
  },
  phone: {
    fill: '#486D84',
    width: '20px'
  },
  head: {
    marginTop: "4%",
    display:"flex",
    alignItems: 'center',
    justifyContent:"space-between"
  },
  UserInfos:{
    display:"flex",
    flexDirection:"column",
    lineHeight: 1.2,
    fontSize:"14px",
    margin: "0 10px",
    },
    petName:{
      fontFamily:'"Apple Color Emoji"',
      color:'#ED6436',
      fontWeight:"bold"
    },
    Namephone:{
      display:"flex",
    flexDirection:"column",
    textAlign:"end"
    }
}));

function PetShopPost({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date, picture, petName, species, price, race, dateBirth, sexe },
  showActions,
  show
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  const isliked=auth.user?(likes.filter((el)=>el.user===auth.user._id).length>0):false
  const [Text, setText] = React.useState('');
  const [count, setCount] = React.useState(0);
  const [liked, setliked] = React.useState(isliked);
  

  const handlelikeClick = () => {
    if (auth.user){
    if(liked) {removeLike(_id); setliked(false)}
    else {addLike(_id); setliked(true)}}
  };
  const [supp, setsupp] = React.useState(false);
  
  const handledeleteClick = () => {
    setsupp(!supp);
  };

  const [edit, setedit] = React.useState(false);

  return (
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
            {<Link to={`/profile/${user}`}><Typography color='textSecondary'>{name}</Typography></Link>}
            <p className='post-date'>
              <Moment format='YYYY/MM/DD'><Typography color='textSecondary'>{date}</Typography></Moment>
            </p>
          </div>
          </div>

          <div className={classes.Namephone}>
          <Typography variant='body2' className='text'>
            {auth.user.phone !== '' ? (
              <div className={classes.contact}>
                <CallIcon className={classes.phone} />
                <Typography color='textSecondary'>{auth.user.phone}</Typography>
              </div>
            ) : null}
          </Typography>
          <Typography variant='body2' color='textPrimary' className={classes.petName}>
            {petName}
          </Typography>
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
          <Typography variant='body2' color='textSecondary' className='text'>
           Prix de l'animal : {price}
          </Typography>
        </CardContent> )}

        {(picture !== '') ? (
        <img 
          className={classes.media}
          src={picture}
        />):<span></span>}

        
      {showActions && (
      <CardActions disableSpacing className={classes.space}>
        <div className={classes.icons}>
        {auth.user.type === "visitor" ? null :
        <IconButton
        onClick={()=>{ 
         handlelikeClick();
        }}
        style={liked ? {color:"#d32f2f"}:{color:"grey"}}
        >
          <FavoriteIcon />
          <span>{likes.length > 0 && <span className={classes.Number}>{likes.length}</span>}</span>
        </IconButton>}


            {((!auth.loading && user === auth.user._id )|| (auth.user.type==="admin" && user === auth.user._id)|| (auth.user.type==="admin")) && (
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

            <PetShopPostEdit Description={{text, picture, petName, price, species, race, dateBirth, sexe}} PostId={_id} />
            </div>
          )}
        </div>
        <Typography color='textSecondary' className={classes.petName}> <span> {price} TND</span></Typography>
        <Link to={`/petShopPost/${_id}`} className='btn btn-secondary'>
        {'+'}
            {comments.length > 0 && (
              <span className='comment-count'>{comments.length}</span>
            )}
          </Link>

      </CardActions>
      )}
    </Card>
  );
}

PetShopPost.defaultProps = {
  showActions: true
};

PetShopPost.propTypes = {
  addComment:PropTypes.func.isRequired,
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
  petShopPosts: state.petShopPosts
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost, addComment })(PetShopPost);