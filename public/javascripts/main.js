function mudarPeriodo() {
  let rangeMenorV = parseInt(document.getElementById('range_menor').value);
  let rangeMaiorV = parseInt(document.getElementById('range_maior').value);

  if (rangeMenorV > rangeMaiorV) {
    [rangeMenorV, rangeMaiorV] = [rangeMaiorV, rangeMenorV];
  }

  document.getElementById('range_menor').value = rangeMenorV;
  document.getElementById('range_maior').value = rangeMaiorV;

  const inputRangeMenor = document.getElementById('range_menor');
  const inputRangeMaior = document.getElementById('range_maior');

  const total = inputRangeMaior.max - inputRangeMenor.min;
  const pMaior = ((rangeMaiorV - inputRangeMenor.min) / total) * 100;
  const pMenor = ((rangeMenorV - inputRangeMenor.min) / total) * 100;

  document.getElementById('progresso').style.cssText = `background: linear-gradient(to right, var(--CorPrimaria) ${pMenor}% ${pMenor}%, var(--CorTerciaria) ${pMenor}% ${pMaior}%, var(--CorPrimaria) ${pMaior}%);`;
}
document.getElementById('range_menor').addEventListener('input', mudarPeriodo);
document.getElementById('range_maior').addEventListener('input', mudarPeriodo);
document.getElementById('input_menor_valor').addEventListener('click', mudarPeriodo);
document.getElementById('input_maior_valor').addEventListener('click', mudarPeriodo);


function Ordenar(id) {
  const elementos = ["ordenar_titulo", "ordenar_autor", "ordenar_data"];
  const elementoClicado = document.getElementById(id);

  elementos.forEach((elementoID) => {
    const elemento = document.getElementById(elementoID);
    elemento.innerHTML = (elemento === elementoClicado)
      ? proximoTexto(elemento.innerHTML)
      : "swap_vert";
  });

  Ordem = elementos.indexOf(id) + 1;
  PesquisarLivro();

}function proximoTexto(textoAtual) {
  return textoAtual === "swap_vert"
    ? "expand_more"
    : textoAtual === "expand_more"
    ? "expand_less"
    : "expand_more";
}

function  PesquisarLivro(){
  const Livro = {
    titulo:     document.getElementById('titulo').value,
    categoria:  document.getElementById('categoria').value,
    pais:       document.getElementById('pais').value,
    rangeMenor: document.getElementById('rangeMenor').value,
    rangeMaior: document.getElementById('rangeMaior').value
  }

  const sqlCode = [];

  if (titulo) {
    sqlCode.push("(l.titulo LIKE '%$titulo%' OR a.autor LIKE '%$titulo%')");
  }
  if (categoria) {
    sqlCode.push("l.idcategoria = $categoria");
  }
  if (pais) {
    sqlCode.push("l.idpais = $pais");
  }
  if (rangeMenor && rangeMaior) {
    sqlCode.push("l.publicadodata BETWEEN $rangeMenor AND $rangeMaior");
  }

  const sql = `SELECT idlivro, titulo, data, autor FROM tblivro AS l INNER JOIN tbautor AS a ON a.idautor = l.idautor` +
    (sqlCode.length > 0 ? " WHERE " + sqlCode.join(" AND ") : "") +
    " ORDER BY titulo";

  db.query(sqlCode, function(erro, livros){
    if (erro){
      res.send(erro);
    }
    res.render('livros', {resultado: livros});
  })
}