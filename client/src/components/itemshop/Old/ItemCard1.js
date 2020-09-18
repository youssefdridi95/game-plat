// import React from "react";
// import Moment from "react-moment";
// import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { addLike, removeLike, deletePost } from "../../actions/adoptPosts";
// import { makeStyles } from "@material-ui/core/styles";
// import clsx from "clsx";
// import Card from "@material-ui/core/Card";
// import CardHeader from "@material-ui/core/CardHeader";
// import CardMedia from "@material-ui/core/CardMedia";
// import CardContent from "@material-ui/core/CardContent";
// import CardActions from "@material-ui/core/CardActions";
// import Collapse from "@material-ui/core/Collapse";
// import Avatar from "@material-ui/core/Avatar";
// import IconButton from "@material-ui/core/IconButton";
// import Typography from "@material-ui/core/Typography";
// import { blue } from "@material-ui/core/colors";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import ShareIcon from "@material-ui/icons/Share";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
// import DeleteIcon from "@material-ui/icons/Delete";
// import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
// import "./ItemCard.css";
// // import { delPet } from "../../actions/petProfile";
// // import { editPet } from "../../actions/petProfile";
// // import EditPetModal from "./ModalPetEdit";


// const useStyles = makeStyles(theme => ({
//   expand: {
//     transform: "rotate(0deg)",
//     marginLeft: "auto",
//     transition: theme.transitions.create("transform", {
//       duration: theme.transitions.duration.shortest
//     })
//   },
//   expandOpen: {
//     transform: "rotate(180deg)"
//   },
//   avatar: {
//     backgroundColor: blue[500]
//   },
//   avatarcomment: {
//     backgroundColor: blue[500],
//     width: 25,
//     height: 25
//   },
//   dislike: {
//     color: "grey"
//   },
//   like: {
//     color: "#d32f2f"
//   },
//   supp: {
//     color: "#d50000"
//   },
//   edit: {
//     color: "#4db6ac"
//   },
//   Number: {
//     color: "grey",
//     fontSize: 15
//   }
// }));
// function ItemCard({ auth, item}) {
//   const {
//     name, picture, description, date, price, species, likes, comments} = item;

//   const classes = useStyles();
//   const [expanded, setExpanded] = React.useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   const [supp, setsupp] = React.useState(false);
//   const handledeleteClick = _id => {
//     delPet(_id);
//     document.location.reload();
//   };

//   const [edit, setedit] = React.useState(false);

//   return (
//     <Card className="root">
//       <CardHeader
//         avatar={
//           <Avatar className={classes.avatar} aria-label="recipe" src={picture}>
//             M
//           </Avatar>
//         }
//         title={name}
//         subheader={
//           <p className="post-date">
//             Date d'ajout : <Moment format="DD/MM/YYYY">{date}</Moment>
//           </p>
//         }
//       />
//       <div className="content">
//         <img className="media" src={picture} />
//       </div>

//       <Typography className="text">Animal :</Typography>
//       <Typography variant="body2" color="textSecondary" className="text">
//         {species}
//       </Typography>

//       <Typography className="text">Race :</Typography>
//       <Typography variant="body2" color="textSecondary" className="text">
//         {race}
//       </Typography>

//       <Typography className="text">Date de naissance :</Typography>
//       <Typography variant="body2" color="textSecondary" className="text">
//         {dateBirth}
//       </Typography>
//       <button
//         className="MuiButtonBase-root MuiIconButton-root makeStyles-dislike-181"
//         tabIndex="0"
//         type="button"
//         aria-label="false"
//       >
//         <span className="MuiIconButton-label">
//           <svg
//             className="MuiSvgIcon-root"
//             focusable="false"
//             viewBox="0 0 24 24"
//             aria-hidden="true"
//             role="presentation"
//             onClick={() => handledeleteClick(_id)}
//           >
//             <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
//           </svg>
//         </span>
//         <span className="MuiTouchRipple-root"></span>
//       </button>
//       <EditPetModal item={item}/>
//     </Card>
//   );
// }

// ItemCard.defaultProps = {
//   showActions: true
// };

// ItemCard.propTypes = {
//   item: PropTypes.object.isRequired,
//   auth: PropTypes.object.isRequired,
//   showActions: PropTypes.bool
// };

// const mapStateToProps = state => ({
//   auth: state.auth
// });

// export default connect(mapStateToProps, {
//   ItemCard
// })(ItemCard);
