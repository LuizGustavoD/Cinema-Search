const contentUser = document.getElementById('searchText');
const submitButton = document.getElementById('submitButton');
const outputInfo = document.getElementById('showResult');
const key = "d08375f4";



async function consumeApi(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (erro) {
    console.error('Erro ao consumir a API:', erro);
    outputInfo.innerHTML = `<p>Ocorreu um erro. Verifique a conexão ou a URL.</p>`;
  }
}

function writeInHtml(data){
  outputInfo.innerHTML = `
    <h2 class="movieName">${data.Title}</h2>
    <p class="movieInformations">
      <strong>Data de lançamento:</strong> ${data.Released} <br>
      <strong>Nota:</strong> Metascore = ${data.Metascore} | IMDb = ${data.imdbRating} <br>
      <strong>Atores:</strong> ${data.Actors} <br>
      <strong>Diretor:</strong> ${data.Director} <br>
      <strong>Tipo:</strong> ${data.Type} <br>
      <strong>Gênero:</strong> ${data.Genre}
    </p>
    <img src="${data.Poster}" alt="Poster de ${data.Title}" style="max-width: 200px;">
  `;
}

submitButton.addEventListener('click', async () => {
  const nameMovie = contentUser.value.trim(); 
  if (!nameMovie) {
    outputInfo.innerHTML = `<p>Por favor, insira o nome de um filme.</p>`;
    return;
  }

  const link = `http://www.omdbapi.com/?t=${nameMovie}&apikey=${key}`;
  const info = await consumeApi(link);

  if (info && info.Response !== "False") {
    writeInHtml(info);
  } else {
    outputInfo.innerHTML = `<p>Filme não encontrado. Tente outro título.</p>`;
  }

  contentUser.value = '';
});


