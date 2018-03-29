/**
 * 
 * expresspugbootstrap
 * -----------------------------------------------
 * An Node.JS template with
 *   — Express
 *   — Pug (formerly Jade) 
 *   — Bootstrap (pug-bootstrap)
 *
 * https://github.com/JANQLIANGTSAI/expresspugbootstrap
 * Copyright 2016-present, Max J. Tsai
 * All rights reserved.
 * -----------------------------------------------
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('foodtrucks.db');

router.get('/', function(req, res, next) {
  res.send('This is Index.html!');
});

router.get('/aloha', function(req, res, next) {
  res.send('This is aloha.html!');
});

router.get('/foodtrucks', function(req, res, next) {
  db.all("SELECT * from foodtruck;", function(err,rows){
    res.send(rows);
  });
});

router.post('/foodtrucks/favorite/:id', function(req, res, next) {
  db.run("UPDATE foodtruck SET numyums = numyums+1 where foodtruckID = "+req.params.id+";", function(err,rows){
    res.send();
  });
});

router.get('/test', function(req, res, next) {

  res.send(JSON.stringify(
    {
    "glossary": {
        "title": "example glossary",
		"GlossDiv": {
            "title": "S",
			"GlossList": {
                "GlossEntry": {
                    "ID": "SGML",
					"SortAs": "SGML",
					"GlossTerm": "Standard Generalized Markup Language",
					"Acronym": "SGML",
					"Abbrev": "ISO 8879:1986",
					"GlossDef": {
                        "para": "A meta-markup language, used to create markup languages such as DocBook.",
						"GlossSeeAlso": ["GML", "XML"]
                    },
					"GlossSee": "markup"
                }
            }
        }
    }
}
  ));
})

router.get('/pug', function(req, res, next) {
  res.render('default', { title: 'PUG-Bootstrap' });
});

module.exports = router;
