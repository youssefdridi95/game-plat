const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const AdoptPost = require('../../models/AdoptPost');
const User = require('../../models/User');

// @route    GET api/adoptposts
// @desc     Get all adopt posts
// @access   Public
router.get('/', async (req, res) => {
  try {
    const Adoptposts = await AdoptPost.find().sort({ date: -1 });
    res.json(Adoptposts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/adoptposts
// @desc     Create a adopt post
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty(),
      check('species', `L' espèce de votre animal est obligatoire`)
        .not()
        .isEmpty(),
      check('sexe', 'Le sexe de votre animal est obligatoir')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
   
    

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newAdoptPost = new AdoptPost({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        picture: req.body.picture,
        petName: req.body.petName,
        race: req.body.race,
        species: req.body.species,
        dateBirth: req.body.dateBirth,
        sexe: req.body.sexe,
        user: req.user.id
      });

      const Adoptpost = await newAdoptPost.save();

      res.json(Adoptpost);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/posts/:id
// @desc     Get adopt post by ID
// @access   Public
router.get('/:id', async (req, res) => {
    try {
      const adoptPost = await AdoptPost.findById(req.params.id);
      if(!adoptPost){
          return res.status(404).json({msg:"Post not found"})
        }
  
      res.json(adoptPost);
    } catch (err) {
      console.error(err.message);
    if(err.kind==="ObjectID"){
        return res.status(404).json({ msg: 'Post not found' });
    }
      res.status(500).send('Server Error');
    }
  });
// @route    DELETE api/adoptposts/:id
// @desc     Delete adopt post
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
      const adoptpost = await AdoptPost.findById(req.params.id);

      if(!adoptpost){
        return res.status(404).json({msg:"Post not found"})
      }
  
      // Check user
      if ((adoptpost.user.toString() !== req.user.id) && (req.user.type!=="admin")) {     ///important
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      await adoptpost.remove();
  
      res.json({ msg: 'Post removed' });
    } catch (err) {
      console.error(err.message);
      if(err.kind==="ObjectID"){
        return res.status(404).json({ msg: 'Post not found' });
    }
      res.status(500).send('Server Error');
    }
  });
  
// @route    PUT api/adoptposts/modify/:id    
// @desc     modify a sel pet post
// @access   Private
router.put(   
  '/modify/:id',
  [
    auth,
    [
      check('text', 'La description est obligatoire')
        .not()
        .isEmpty(),
      check('species', `L' espèce de votre animal est obligatoire`)
        .not()
        .isEmpty(),
      check('sexe', 'Le sexe de votre animal est obligatoir')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const adoptpost = await AdoptPost.findById(req.params.id);

    if(!adoptpost){
      return res.status(404).json({msg:"Post not found"})
    }

    // Check user
    if (adoptpost.user.toString() !== req.user.id){   
      return res.status(401).json({ msg: 'User not authorized' });
    }

    try {  
      const newAdoptPost = ({
        text: req.body.text,
        picture: req.body.picture,
        petName: req.body.petName,
        race: req.body.race,
        species: req.body.species,
        dateBirth: req.body.dateBirth,
        sexe: req.body.sexe,
      });

      const adoptpost = await AdoptPost.findOneAndUpdate({ _id: req.params.id }, {$set:{...newAdoptPost}}, {new: true});
      await adoptpost.save();
      res.json(adoptpost);
    } catch (err) {
      console.error(err.message);
      if(err.kind==="ObjectID"){
        return res.status(404).json({ msg: 'Post not found' });
    }
      res.status(500).send('Server Error');
    }
  }
);
// @route    PUT api/adoptposts/like/:id
// @desc     Like a adopt post
// @access   Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const adoptpost = await AdoptPost.findById(req.params.id);

    // Check if the post has already been liked
    if (
      adoptpost.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    adoptpost.likes.unshift({ user: req.user.id });

    await adoptpost.save();

    res.json(adoptpost.likes);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/adoptposts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
      const adoptpost = await AdoptPost.findById(req.params.id);
  
      // Check if the post has already been liked
      if (
        adoptpost.likes.filter(like => like.user.toString() === req.user.id).length ===0) {
        return res.status(400).json({ msg: 'Post has not yet been liked' });
      }
  
      // Get remove index
      const removeIndex = adoptpost.likes
        .map(like => like.user.toString())
        .indexOf(req.user.id);
  
        adoptpost.likes.splice(removeIndex, 1);
  
      await adoptpost.save();
  
      res.json(adoptpost.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  // @route    POST api/adoptposts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
    '/comment/:id',
    [
      auth,
      [
        check('text', 'Text is required')
          .not()
          .isEmpty()
      ]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  

      try {
        const user = await User.findById(req.user.id).select('-password');
        const adoptpost = await AdoptPost.findById(req.params.id);
  
        const newComment = {
          text: req.body.text,
          name: user.name,
          avatar: user.avatar,
          user: req.user.id
        };
  
        adoptpost.comments.unshift(newComment);
  
        await adoptpost.save();
  
        res.json(adoptpost.comments);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
  // @route    DELETE api/adoptposts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
      const adoptpost = await AdoptPost.findById(req.params.id);
  
      // Pull out comment
      const comment = adoptpost.comments.find(
        comment => comment.id === req.params.comment_id
      );
  
      // Make sure comment exists
      if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exist' });
      }
  
      // Check user
      if ((comment.user.toString() !== req.user.id)&&(req.user.type !== "admin")) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      // Get remove index
      const removeIndex = adoptpost.comments
        .map(comment => comment.id)
        .indexOf(req.params.comment_id);
  
        adoptpost.comments.splice(removeIndex, 1);
  
      await adoptpost.save();
  
      res.json(adoptpost.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;