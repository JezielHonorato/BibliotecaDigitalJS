var express = require('express');
var router = express.Router();
let db = require('../utils/db');

function executarComandoSQL(sql, params, res) {
  db.query(sql, params, (err, listagem) => {
    if (err) {
      res.status(500).json({ erro: "Erro no sql", detalhes: err });
    } else {
      res.status(200).json({resultado: listagem});
    }
  });
}

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/livros', function(req, res) {
  res.render('livros');
});

router.get('/livros?titulo&categoria&pais&range_menor&range_maior', async function(req, res) {
  const { titulo, categoria, pais, range_menor, range_maior } = req.params;

  const sqlWhere = [];

  if (titulo) {
    sqlWhere.push(`(l.titulo LIKE '%${titulo}%' OR a.autor LIKE '%${titulo}%')`);
  }
  if (categoria) {
    sqlWhere.push(`l.idCategoria = ${categoria}`);
  }
  if (pais) {
    sqlWhere.push(`l.idPais = ${pais}`);
  }
  if (range_menor && range_maior) {
    sqlWhere.push(`l.data BETWEEN ${range_menor} AND ${range_maior}`);
  }

  const sql = `SELECT idLivro, titulo, autor, data FROM tblivro AS l INNER JOIN tbautor AS a ON a.idAutor = l.idAutor` + (sqlWhere.length > 0 ? ' WHERE ' + sqlWhere.join(' AND ') : '') + ' ORDER BY titulo';

  executarComandoSQL(sql, [], res);
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

// json

router.get('/jsonCategoria', function(req, res) {
  let cmd = 'SELECT idCategoria, categoria FROM tbcategoria ORDER BY categoria';
  db.query(cmd, [], function(erro, listagem){
    if (erro){
      res.send(erro);
    }
    res.json({resultado: listagem});
  });
});

router.get('/jsonPais', function(req, res) {
  let cmd = 'SELECT idPais, pais FROM tbpais ORDER BY pais';
  db.query(cmd, [], function(erro, listagem){
    if (erro){
      res.send(erro);
    }
    res.json({resultado: listagem});
  });
});

module.exports = router;
