const express = require('express');
const router = express.Router();
const userService = require('./user.service');
//https://express-validator.github.io/docs/
const { check, validationResult } = require('express-validator/check');

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then((user) => user ? res.json(user) : res.status(401).json({status:'Error', message: 'INCORRECT_USERNAME_OR_PASSWORD' }))
        .catch((err) => next(err));
}

function register(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
    }
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then((user) => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then((users) => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.params.sub)
        .then((user) => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
    }
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _deleteByUsername(req, res, next) {
    userService.deleteByUsername(req.params.username)
        .then(() => res.json({}))
        .catch(err => next(err));
}

// routes
router.post('/authenticate', authenticate);
router.post('/register',[
    // username must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 5 })
  ], register);
router.get('/', getAll);
router.get('/:id', getById);
router.get('/current', getCurrent);
router.put('/:id',[
    // username must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 5 })
  ], update);
//router.delete('/:id', _delete);
router.delete('/:username', _deleteByUsername);
module.exports = router;