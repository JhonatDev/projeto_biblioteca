const apiUrl = "https://api-biblioteca-mb6w.onrender.com/acervo";
let currentPage = 1;
let itemsPerPage = 5;


fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro na solicitação: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    for (let i = 0; i < data.length; i++) {
      biblioteca.adicionarItem(data[i]);
    }
    listarAcervo(biblioteca);
    console.log(data);

  })
  .catch(error => {
    console.error(error);
  });


class EntidadeBibliografica {
  constructor(titulo, autor, anoPublicacao, codigo) {
    this.titulo = titulo;
    this.autor = autor;
    this.anoPublicacao = anoPublicacao;
    this.codigo = codigo;
    this.emprestado = false;
    this.usuarioEmprestimo = null;
  }

}

class Livro extends EntidadeBibliografica {
  constructor(titulo, autor, anoPublicacao, codigo, genero) {
    super(titulo, autor, anoPublicacao, codigo);
    this.genero = genero;
  }

  informacoes() {
    console.log(`Livro: ${this.titulo}, Autor: ${this.autor}, Gênero: ${this.genero}`);
  }
}

class Revista extends EntidadeBibliografica {
  constructor(titulo, autor, anoPublicacao, codigo, edicao) {
    super(titulo, autor, anoPublicacao, codigo);
    this.edicao = edicao;
  }

  informacoes() {
    console.log(`Revista: ${this.titulo}, Autor: ${this.autor}, Edição: ${this.edicao}`);
  }
}

class Usuario {
  constructor(nome, registroAcademico, dataNascimento) {
    this.nome = nome;
    this.registroAcademico = registroAcademico;
    this.dataNascimento = new Date(dataNascimento);
  }
}

class Biblioteca {
  constructor() {
    this.acervo = [];
    this.usuarios = [];
  }

  adicionarItem(item) {
    this.acervo.push(item);
  }


  adicionarUsuario(usuario) {
    this.usuarios.push(usuario);
  }

  devolverEntidadePorCodigo(codigo) {
    const entidadeParaDevolucao = this.acervo.find(item => item.codigo === codigo);

    if (entidadeParaDevolucao) {
      entidadeParaDevolucao.devolver();
      console.log(`Entidade ${entidadeParaDevolucao.titulo} devolvida com sucesso.`);
      return true;
    } else {
      console.log("Entidade não encontrada para devolução.");
      return false;
    }
  }


}

function exibirMensagem(mensagem, sucesso = true) {
  const mensagemDiv = document.getElementById('mensagem');
  mensagemDiv.textContent = mensagem;
  mensagemDiv.style.color = sucesso ? 'green' : 'red';

  setTimeout(() => {
    mensagemDiv.textContent = '';
  }, 3000);
}

function cadastrarLivro() {
  const titulo = document.getElementById('livroTitulo').value;
  const autor = document.getElementById('livroAutor').value;
  const ano = document.getElementById('livroAno').value;
  const codigo = document.getElementById('livroCodigo').value;
  const genero = document.getElementById('livroGenero').value;

  if (titulo && autor && ano && codigo && genero) {
    const livro = new Livro(titulo, autor, ano, codigo, genero);
    biblioteca.adicionarItem(livro);

    exibirMensagem("Livro cadastrado com sucesso!", true);
    console.log("Livro cadastrado:", livro);

    limparCamposLivro();
  } else {
    exibirMensagem("Preencha todos os campos para cadastrar o livro.", false);
  }
}


function cadastrarUsuario() {
  const nome = document.getElementById('usuarioNome').value;
  const registro = document.getElementById('usuarioRegistro').value;
  const dataNascimentoInput = document.getElementById('usuarioDataNascimento');
  
  const dataNascimentoString = dataNascimentoInput.value;

  const dataNascimento = new Date(dataNascimentoString + 'T00:00:00');

  if (nome && registro && dataNascimento) {
    const usuario = new Usuario(nome, registro, dataNascimento);
    biblioteca.adicionarUsuario(usuario);

    exibirMensagem("Usuário cadastrado com sucesso!", true);
    console.log("Usuário cadastrado:", usuario);

    limparCamposUsuario();
  } else {
    exibirMensagem("Preencha todos os campos para cadastrar o usuário.", false);
  }
}


function emprestarItem() {
  const codigo = document.getElementById('itemCodigo').value;
  const registro = document.getElementById('usuarioRegistroEmprestimo').value;
  let livroEnprestando = biblioteca.acervo.find(livro => livro.codigo === codigo);
  let usuarioEmprestimo = biblioteca.usuarios.find(usuario => usuario.registroAcademico === registro);
  let indiceLivroProcurado = biblioteca.acervo.findIndex(livro => livro.codigo === codigo);

  if (!codigo || !registro) {
    exibirMensagem('Por favor, insira o código do item e o registro do usuário.', false);
    return;
  } else if (livroEnprestando && livroEnprestando.emprestado === true) {
    exibirMensagem('Livro emprestado', false);
  } else if (!livroEnprestando) {
    exibirMensagem('Livro não encontrado', false);
  } else if (!usuarioEmprestimo) {
    exibirMensagem('Usuário não encontrado', false);
    } else if (livroEnprestando && usuarioEmprestimo) {
    biblioteca.acervo[indiceLivroProcurado].emprestado = true;
    biblioteca.acervo[indiceLivroProcurado].usuarioEmprestimo = registro;
    exibirMensagem('livro emprestado com sucesso', true);
    } else {
    exibirMensagem('Erro', false);
  }
}


function devolverItem() {
  const codigo = document.getElementById('itemCodigoDevolucao').value;
  let livroDevolvido = biblioteca.acervo.find(livro => livro.codigo === codigo);
  if (!codigo) {
    exibirMensagem('Por favor, insira o código do item.', false);
    return;
  } else if (livroDevolvido && livroDevolvido.emprestado === false) {
    exibirMensagem('Livro não emprestado', false);
  } else if (!livroDevolvido) {
    exibirMensagem('Livro não encontrado', false);
  } else if (livroDevolvido && livroDevolvido.emprestado === true) {
    biblioteca.acervo.find(livro => livro.codigo === codigo).emprestado = false;
    biblioteca.acervo.find(livro => livro.codigo === codigo).usuarioEmprestimo = null;
    exibirMensagem('Livro devolvido com sucesso', true);
  } else {
    exibirMensagem('Erro', false);
  }


}

function limparCamposLivro() {
  document.getElementById('livroTitulo').value = '';
  document.getElementById('livroAutor').value = '';
  document.getElementById('livroAno').value = '';
  document.getElementById('livroCodigo').value = '';
  document.getElementById('livroGenero').value = '';
}

function limparCamposUsuario() {
  document.getElementById('usuarioNome').value = '';
  document.getElementById('usuarioRegistro').value = '';
  document.getElementById('usuarioDataNascimento').value = '';
}

const biblioteca = new Biblioteca();


function listarAcervo(biblioteca) {
  const container = document.getElementById('listar');
  container.innerHTML = '';

  biblioteca.acervo.forEach(livro => {
    const linha = document.createElement('tr');
    let emprestado = livro.emprestado ? 'Sim' : 'Não';
    let NomeUsuraio = biblioteca.usuarios.find(usuario => usuario === biblioteca.usuarios.nome);
    let usuarioEmprestimo = livro.usuarioEmprestimo ? livro.usuarioEmprestimo : 'Não emprestado';


    let detalhe = livro.genero ? livro.genero : livro.edicao ? "Revista" : 'N/A';

    linha.innerHTML += `
      <td class="inform">${livro.titulo}</td>
      <td class="inform">${livro.autor}</td>
      <td class="inform">${livro.anoPublicacao}</td>
      <td class="inform">${detalhe}</td>
      <td class="inform">${livro.codigo}</td>
      <td class="inform">${emprestado}</td>
      <td class="inform">${usuarioEmprestimo}</td>
    `;
    container.appendChild(linha);
  });
}

addEventListener("click", function() {
  listarAcervo(biblioteca);
});

document.getElementById('livroAno').addEventListener('input', function () {
  this.value = this.value.replace(/\D/g, '');
});

// ;)