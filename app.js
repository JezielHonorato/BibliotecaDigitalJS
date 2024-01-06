// Importar módulos
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { Session } = require('inspector');
const bodyParser = require('body-parser')

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
/*
// Criando o login
app.use(session({secret: 'jbiasbdwudoasdanjdndqiwbfq983h792197rbyeaf07'}))
app.use(bodyParser.urlencoded({extended:true}))

app.post("/login", function (req, res) {
  if(req.body.INPUTDASENHA == senha && req.body.INPUTUSUARIO){
    req.session.login = login;
    res.redirect('/');
  } else{
    //DEPois vejo isso
  }
});
*/

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Se nenhuma rota corresponder à solicitação, cria um erro 404 e passa para o próximo middleware
app.use(function(req, res, next) {
  next(createError(404));
});

// Usa um middleware de tratamento de erros para renderizar a página de erro
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
