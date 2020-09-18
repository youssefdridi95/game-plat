import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addLike, removeLike, deleteItem, addComment } from '../../actions/itemShop';
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
import ItemEdit from './ItemEdit'
import './Item.css';
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
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignsItems: "center",
    maxHeight:"4em"
  },
  media: {
    display: 'block',
    height: '100%',
    width:'auto',
    overflow:'hidden',
    minWidth: '100%',
    maxHeight: '100%',
  },
  imgContainer:{
    display:"flex",
    // border: "solid 1px",
    height: '21.8em',
    width : '100%',
    overflow:'hidden'
  },
  cardFemale: { 
    padding: '5px 10px',
    width: '30%',
    height: '30%',
    margin: '30px',
    boxShadow: '5px 10px 18px #F8C7B8', 
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
    borderRadius: "7%",
    // border: "solid 1px #FFFFFF"
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
    // alignItems: 'center',
    justifyContent:"space-between",
    minWidth:"4em"
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

function Item({
  itemState,
  addComment,
  itemId,
  addLike,
  removeLike,
  deleteItem,
  auth,
  item,
  showActions
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { _id, description, name, picture, price, species, likes, comments, date }=item
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  const isliked=auth.user?(likes.filter((el)=>el.user===auth.user._id).length>0):false
  const [Text, setText] = React.useState('');
  const [count, setCount] = React.useState(0);
  const [liked, setliked] = React.useState(isliked);
  // setliked(
  //   likes.indexOf({_id:auth.user._id})>0
  // )
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

  const handleeditClick = () => {
    setedit(!edit);
  };
  var timeLikeClicked = 1;

  return (
    <Card className={classes.card}>
          
          <div className={classes.head}>
          <div className={classes.icons}>
          

          <div className={classes.UserInfos}>
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
          {name}
          </Typography>
          </div>

        </div>
        
        {picture !== '' ? (
         <div className={
          classes.imgContainer
         }> <img className={classes.media} src={picture} /> </div>
        ) : (
          <span></span>
        )}
        
        {showActions && (
          
      <CardActions disableSpacing className={classes.actions}>
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


            {!auth.loading && auth.user.type==="admin" && (
            <IconButton
              aria-label={supp}
              onClick={() => {
                deleteItem(_id);
              }}
              className={clsx(classes.dislike, {
                [classes.supp]: supp
              })}
            >
              <DeleteIcon />
            </IconButton>
          )}
          <ItemEdit item={item}/>

        </div>
        <Typography color='textSecondary' className={classes.petName}> <span> {price} TND</span></Typography>
        <Link to={`/itemshop/${_id}`} className='btn btn-primary'>
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

Item.defaultProps = {
  showActions: true
};

Item.propTypes = {
  addComment:PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
  islikeclicked: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deleteItem, addComment })(
  Item
);
