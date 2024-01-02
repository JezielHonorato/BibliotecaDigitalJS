function mudarPeriodo() {
  let rangeMenorV = parseInt(document.getElementById('range_menor').value);
  let rangeMaiorV = parseInt(document.getElementById('range_maior').value);

  if (rangeMenorV > rangeMaiorV) {
    [rangeMenorV, rangeMaiorV] = [rangeMaiorV, rangeMenorV];
  }

  document.getElementById('range_menor').value = rangeMenorV;
  document.getElementById('range_maior').value = rangeMaiorV;

  const total = rangeMaiorV.max - rangeMenorV.min; 
  const pMaior = ((rangeMaiorV - rangeMenorV.min) / total) * 100;
  const pMenor = ((rangeMenorV - rangeMenorV.min) / total) * 100;

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
}

function proximoTexto(textoAtual) {
  return textoAtual === "swap_vert"
    ? "expand_more"
    : textoAtual === "expand_more"
    ? "expand_less"
    : "expand_more";
}

function PesquisarLivro(){
  console.log('oi')
}