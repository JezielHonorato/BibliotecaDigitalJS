function mudarPeriodo() { //Função para o Range duplo
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

  pesquisarLivro();
}
document.getElementById('range_menor').addEventListener('input', mudarPeriodo);
document.getElementById('range_maior').addEventListener('input', mudarPeriodo);
document.getElementById('input_menor_valor').addEventListener('click', mudarPeriodo);
document.getElementById('input_maior_valor').addEventListener('click', mudarPeriodo);


function Ordenar(id) { //Função para os simbolos de Ordenar
  const elementos = ['ordenar_titulo', 'ordenar_autor', 'ordenar_data'];
  const elementoClicado = document.getElementById(id);

  elementos.forEach((elementoID) => {
    const elemento = document.getElementById(elementoID);
    elemento.innerHTML = (elemento === elementoClicado)
      ? proximoTexto(elemento.innerHTML)
      : 'swap_vert';
  });

  Ordem = elementos.indexOf(id) + 1;
  pesquisarLivro();

}function proximoTexto(textoAtual) {
  return textoAtual === 'swap_vert'
    ? 'expand_more'
    : textoAtual === 'expand_more'
    ? 'expand_less'
    : 'expand_more';
}

async function pesquisarLivro() {
  let titulo = document.getElementById('titulo').value ?? 'N/A';
  let categoria = document.getElementById('categoria').value ?? 'N/A';
  let pais = document.getElementById('pais').value ?? 'N/A';
  const rangeMaior = document.getElementById('range_maior').value
  const rangeMenor = document.getElementById('range_menor').value
  
  try {
    const response = await fetch(`http://localhost:3000/livros/:titulo=${titulo}&categoria=${categoria}&pais=${pais}&range_menor=${rangeMenor}&range_maior=${rangeMaior}`, { method: "GET" });
    const livros = await response.json();
    if (livros.length <= 0) return;

    const livro = livros.map(row => ({
        id: row.id,
        titulo: row.titulo,
        autor: row.autor,
        data: row.data,
    }))[0];

    document.querySelector("#resultado").innerHTML = Renderizar(livro);
  } catch (error) {
    console.error("Erro:", error);
  }
}

function Renderizar(livro) {
  let conteudo = `
      <div class="Livro">
        <div class="Indice"> <h1><span class="Simbolo">download</span></h1></div>
        <div class="Titulo"> <h1>Titulo</h1> <span onclick="Ordenar('ordenar_titulo')" id="ordenar_titulo" class="Simbolo Menor2">swap_vert</span></div>
        <div class="Autor">  <h1>Autor</h1>  <span onclick="Ordenar('ordenar_autor')"  id="ordenar_autor"  class="Simbolo Menor2">swap_vert</span></div>
        <div class="Data">   <h1>Data</h1>   <span onclick="Ordenar('ordenar_data')"   id="ordenar_data"   class="Simbolo Menor2">swap_vert</span></div>
        <div class="Editar"> <span class='Simbolo'>edit</span></div>
      </div>  
      `;
  
  livro.forEach((livros) => {
    conteudo += `
      <% for (item of resultado) {%>
        <div class="Lista" id='resultado' onload="PesquisarLivro()"></div>

        <div class='Livro'>
          <a class='Indice' href='files/<%= item.titulo %>.pdf'.pdf' download='<%= item.titulo %>'><span class='Simbolo'>download</span></a>
          <div class='Titulo' onclick="window.open('files/<%= item.titulo %>.pdf')"><a> <%= item.titulo %></a></div>
          <div class='Autor' onclick="window.open('files/<%= item.titulo %>.pdf')"><a> <%= item.autor %></a></div>
          <div class='Data' onclick="window.open('files/<%= item.titulo %>.pdf')"><a> <%= item.publicadodata %></a></div>
          <div class='Editar'><a href='editar/id="item.idlivro"'> <span class='Simbolo'>edit</span></a></div>
        </div>
      <%}%>
      `
  });
  
  return conteudo;
}
document.addEventListener('DOMContentLoaded', pesquisarLivro());
