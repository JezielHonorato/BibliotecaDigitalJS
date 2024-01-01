var express = require('express');
var router = express.Router();
let db = require('../utils/db');

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/livros', function(req, res) {
  let cmd = 'SELECT idlivro, titulo, publicadodata, autor, idcategoria, usuario FROM tblivro AS l INNER JOIN tbautor AS a ON a.idautor = l.idautor ORDER BY idlivro';
  db.query(cmd, [], function(erro, listagem){
    if (erro){
      res.send(erro);
    }
    res.render('livros', {resultado: listagem});
  })
});

router.get('/inserir', function(req, res) {
  res.render('inserir', {resultado: {}});
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/editar', function(req, res) {
  res.render('livros', {resultado: listagem[0]});
});

module.exports = router;