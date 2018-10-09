var express = require('express');
var router = express.Router();
var notes = require('../models/notes');
 

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Notes', notes: notes });
});
 
module.exports = router;