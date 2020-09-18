const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
// const normalize = require('normalize-url');
const Items = require('../../models/Items')

// @route    GET api/itemshop
// @desc     Get current users profile
// @access   Public
router.get('/', async (req, res) => {
  try {
    const items = await Items.find().sort({ date: -1 })
    if (!items) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/itemshop
// @desc     Create or update user profile
// @access   Private
router.post(
  '/',
    [auth,
      [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
      check('price', 'Price is required')
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
      if(req.user.type!=="admin"){
        return res.status(401).json({ msg: 'User not authorized' })
      }
    const {
      name,
      picture,
      description,
      date,
      price,
      species,
      likes
    } = req.body;

    let itemsFields = new Items({
      name,
      picture,
      description,
      date,
      price,
      species,
      likes
    }) ;
     // Using upsert option (creates new doc if no match is found):
      const items= await itemsFields.save()
      res.json(items);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


// @route    GET api/itemshop/:item_id
// @desc     Get profile by user ID
// @access   Public
router.get('/:item_id', async (req, res) => {
  try {
    const items = await Items.findOne({
      _id: req.params.item_id
    });

    if (!items) return res.status(400).json({ msg: 'Item not found' });

    res.json(items);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Item not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/PROFILE
// @desc     Modify user + profile
// @access   Private

router.put(
  '/:item_id',
  [auth,
    [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('price', 'Price is required')
      .not()
      .isEmpty()
  ]
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    if(req.user.type!=="admin"){
      return res.status(401).json({ msg: 'User not authorized' })
    }
    const {
      name,
      picture,
      description,
      price,
      species
    } = req.body;

    const modItem = {
      name,
      picture,
      description,
      price,
      species
    };

    try {
      const item = await Items.findOneAndUpdate({ _id:req.params.item_id }, {$set:{...modItem}}, {new: true});
      await item.save();
      res.json(item);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/itemshop/:item_id
// @desc     Delete profile by user ID
// @access   Private
router.delete('/:item_id',auth, async (req, res) => {
  try {
    if(req.user.type!=="admin"){
      return res.status(401).json({ msg: 'User not authorized' })
    }
    const items = await Items.findOneAndRemove({
      _id: req.params.item_id
    });

    if (!items) return res.status(400).json({ msg: 'Item not found' });
    res.json({msg: "removed"})
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Item not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/items/like/:id
// @desc     Like a adopt post
// @access   Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const items = await Items.findById(req.params.id);

    // Check if the post has already been liked
    if (
      items.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    items.likes.unshift({ user: req.user.id });

    await items.save();

    res.json(items.likes);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/itemss/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
      const items = await Items.findById(req.params.id);
  
      // Check if the post has already been liked
      if (
        items.likes.filter(like => like.user.toString() === req.user.id).length ===0) {
        return res.status(400).json({ msg: 'Post has not yet been liked' });
      }
  
      // Get remove index
      const removeIndex = items.likes
        .map(like => like.user.toString())
        .indexOf(req.user.id);
  
        items.likes.splice(removeIndex, 1);
  
      await items.save();
  
      res.json(items.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  // @route    POST api/itemss/comment/:id
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
        const items = await Items.findById(req.params.id);
  
        const newComment = {
          text: req.body.text,
          name: user.name,
          avatar: user.avatar,
          user: req.user.id
        };
  
        items.comments.unshift(newComment);
  
        await items.save();
  
        res.json(items.comments);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
  // @route    DELETE api/itemss/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
      const items = await Items.findById(req.params.id);
  
      // Pull out comment
      const comment = items.comments.find(
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
      const removeIndex = items.comments
        .map(comment => comment.id)
        .indexOf(req.params.comment_id);
  
        items.comments.splice(removeIndex, 1);
  
      await items.save();
  
      res.json(items.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;
