var notes = require('../models/notes');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/test';

exports.add = function(req, res, next) {
    res.render('noteedit', {
        title: "Add a note",
        docreate: true,
        notekey: "",
        note: undefined
    });
}

exports.save = function(req, res, next) {
    if(req.body.docreate == undefined){
        console.log(res.body.docreate)
        return;
    }else{
        console.log(req.body.docreate)
        if (req.body.docreate === 'create') {
            notes.create(req.body.notekey,
                        req.body.title,
                        req.body.body);
                        connect();
        } else {
            notes.update(req.body.notekey,
                        req.body.title,
                        req.body.body);
        }
    }
    res.redirect('/noteview?key='+req.body.notekey);
}

exports.destroy = function(req, res, next) {
    var note = undefined;
    if(req.query.key) {
        note = notes.read(req.query.key);
    }
    res.render('notedestroy', {
        title: note ? note.title : "",
        notekey: req.query.key,
        note: note
    });
}

exports.dodestroy = function(req, res, next) {
    notes.destroy(req.body.notekey);
    res.redirect('/');
 }

exports.edit = function(req, res, next) {
    var note = undefined;
    if(req.query.key) {
        note = notes.read(req.query.key);
    }
    res.render('noteedit', {
        title: note ? ("Edit " + note.title) : "Add a Note",
        docreate: note ? false : true,
        notekey: req.query.key,
        note: note
    });
}

exports.view = function(req, res, next) {
    var note = undefined;
    if(req.query.key) {
        note = notes.read(req.query.key);
    }
    res.render('noteview', {
        title: note ? note.title : "",
        notekey: req.query.key,
        note: note
    });
}















function connect (){
    MongoClient.connect(url, function (err, db) {
        if (err) {
          console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
          //HURRAY!! We are connected. :)
          console.log('Connection established to', url);
      
          // Get the documents collection
          var collection = db.collection('users');
      
          //Create some users
          var user1 = {name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user']};
          var user2 = {name: 'modulus user', age: 22, roles: ['user']};
          var user3 = {name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user']};
      
          // Insert some users
          collection.insert([user1, user2, user3], function (err, result) {
            if (err) {
              console.log(err);
            } else {
              console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
            }
            //Close connection
            db.close();
          });
        }
      });
}