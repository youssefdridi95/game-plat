const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
// const normalize = require('normalize-url');

const Pet = require('../../models/Pet');
const User = require('../../models/User');

// *********************************   POSTS   **********************************//
// @route    POST api/pets
// @desc     Create a pet
// @access   Private
router.post( //  tested: (200) ok
  '/',
  [
    auth,
    [
      check('petName', 'Le nom de votre pet est obligatoire')
        .not()
        .isEmpty(),
      check('species', 'La nature de votre pet est obligatoire')
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

      const newPet = new Pet({
        userId: req.user.id,
        petName: req.body.petName,
        picture: req.body.picture,
        species: req.body.species,
        race: req.body.race,
        dateBirth: req.body.dateBirth,
        sex: req.body.sex
      });

      const pet = await newPet.save();

      res.json(pet);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// *********************************   GETS   **********************************//
// @route    GET api/pets/byuserid/:userId
// @desc     Get user pets by user id
// @access   Public
router.get('/byuserid/:userId', async (req, res) => {// tested: (200)ok
  try {
    const post = await Pet.find({ userId: req.params.userId });
    if (!req.params.userId.match(/^[0-9a-fA-F]{24}$/) || !post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/pets/bypetid/:petId
// @desc     Get user pets by user id
// @access   Public
router.get('/bypetid/:petId', async (req, res) => {// tested: (200)ok
  try {
    const post = await Pet.find({ _id: req.params.petId });
    if (!req.params.petId.match(/^[0-9a-fA-F]{24}$/) || !post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/pets/
// @desc     Get all pets
// @access   Public
router.get('/', async (req, res) => {// tested: nooooo
  try {
    const post = await Pet.find();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// *********************************   PUTS   **********************************//
// @route    PUT api/pets/:id
// @desc     modify a pet info
// @access   Private
router.put( // tested the poster user: 200 ok / tested with non poster user: (401)ok
  '/:id',
  [
    auth,
    [
      check('petName', 'Le nom de votre pet est obligatoire')
        .not()
        .isEmpty(),
      check('species', 'La nature de votre pet est obligatoire')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const pet = await Pet.findById(req.params.id);
    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !pet) {
      return res.status(404).json({ msg: 'Pet not found' });
    }
    // Check user 
    if (pet.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    try {
      const newPet = {
        petName: req.body.petName,
        picture: req.body.picture,
        species: req.body.species,
        race: req.body.race,
        dateBirth: req.body.dateBirth,
        sex: req.body.sex
      };
      const pet = await Pet.findOneAndUpdate({ _id: req.params.id }, { $set: { ...newPet } }, { new: true });
      await pet.save();
      res.json(pet);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// *********************************   DELETES   **********************************//
// @route    DELETE api/pets/:id
// @desc     Delete a pet by id
// @access   Private
router.delete('/:id', auth, async (req, res) => {// tested with owner user (200)ok /  tested with non owner user (401)ok
  try {
    const post = await Pet.findById(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
      return res.status(404).json({ msg: 'Pet not found' });
    }

    // Check user
    if ((post.userId.toString() !== req.user.id)) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Pet removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});


module.exports = router;