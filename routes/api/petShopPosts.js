const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const PetShopPosts = require('../../models/PetShopPosts');
const User = require('../../models/User');

// *********************************   PUTS   **********************************//
// @route    PUT api/petshopposts
// @desc     modify a sel pet post
// @access   Private
router.put( // tested the poster user: (200) ok / tested with non poster user: (401)ok
    '/:id',
    [
      auth,
      [
        check('text', 'La description est obligatoire')
          .not()
          .isEmpty(),
          check('species', `L'espèce de votre pet est obligatoire`)
          .not()
          .isEmpty(),
          check('price', 'Le prix de votre pet est obligatoir')
          .not()
          .isEmpty()
      ]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const petShopPost = await PetShopPosts.findById(req.params.id);
      // Check for ObjectId format and post
      if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !petShopPost) {
        return res.status(404).json({ msg: 'Post not found' });
      }
      // Check user 
      if (petShopPost.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      try {  
        const newPetShopPost = {
          text: req.body.text,
          petName: req.body.petName,
          picture: req.body.picture,
          race: req.body.race,
          species: req.body.species,
          dateBirth: req.body.dateBirth,
          price: req.body.price,
          sexe: req.body.sexe
        };
        const petpost = await PetShopPosts.findOneAndUpdate({ _id: req.params.id }, {$set:{...newPetShopPost}}, {new: true});
        await petpost.save();
        res.json(petpost);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

// @route    PUT api/petshopposts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', auth, async (req, res) => {// tested: (200)ok
  try {
    const post = await PetShopPosts.findById(req.params.id);

    // Check if the post has already been liked
    if ( post.likes.filter(like => like.user.toString() === req.user.id).length > 0 ) 
    {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/petshopposts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put('/unlike/:id', auth, async (req, res) => {// tested: (200)ok
  try {
    const post = await PetShopPosts.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // Get remove index
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



// *********************************   POSTS   **********************************//
// @route    POST api/petshopposts
// @desc     Create a sel pet post
// @access   Private
router.post( //  tested: (200)ok 
'/',
[
  auth,
  [
    check('text', 'La description est obligatoire')
      .not()
      .isEmpty(),
      check('species', `L'espèce de votre animal est obligatoire`)
      .not()
      .isEmpty(),
      check('price', 'Le prix de votre animal est obligatoir')
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

  try {
    const user = await User.findById(req.user.id).select('-password');

    const newPetShopPost = new PetShopPosts({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
      petName: req.body.petName,
      picture: req.body.picture,
      race: req.body.race,
      species: req.body.species,
      dateBirth: req.body.dateBirth,
      price: req.body.price,
      sexe: req.body.sexe
    });

    const petpost = await newPetShopPost.save();

    res.json(petpost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
);

// @route    POST api/posts/comment/:id
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
      const post = await PetShopPosts.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// *********************************   GETS   **********************************//
// @route    GET api/petshopposts
// @desc     Get all petshopposts
// @access   Public
router.get('/', async (req, res) => {// tested: (200)ok
    try {
      const posts = await PetShopPosts.find().sort({ date: -1 });
      res.json(posts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route    GET api/petshopposts/:id
// @desc     Get one petshopposts by id
// @access   Public
router.get('/:id', async (req, res) => {// tested: noooooooooooooooo
    try {
      const post = await PetShopPosts.findById(req.params.id);
      if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// *********************************   DELETES   **********************************//
// @route    DELETE api/petshopposts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', auth, async (req, res) => {// tested with poster user (200)ok / tested with admin (200)ok / tested with non poster user (401)ok
    try {
      const post = await PetShopPosts.findById(req.params.id);
  
      // Check for ObjectId format and post
      if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
  
      // Check user (chaging condition to test on the type admin too)
      if ((post.user.toString() !== req.user.id)&&(req.user.type !== "admin")) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      await post.remove();
  
      res.json({ msg: 'Post removed' });
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  });

  // @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await PetShopPosts.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Get remove index
    const removeIndex = post.comments
      .map(comment => comment.id)
      .indexOf(req.params.comment_id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

  module.exports = router;