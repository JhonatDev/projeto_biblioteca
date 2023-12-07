## Sistema de Biblioteca em JavaScript

Este projeto tem como objetivo praticar a programação orientada a objetos, trabalhando com classes, herança, e interação entre objetos.  

### Crie uma classe base chamada EntidadeBibliografica com os seguintes atributos:


Atributos:  

-titulo  
-autor  
-anoPublicacao  
-codigo  
-emprestado: booleano  
-usuarioEmprestimo: usuário (objeto) que pegou emprestado (null se não estiver emprestado)  

Métodos:  

+emprestar(usuario)  
+devolver()  


### Crie duas classes que herdam de EntidadeBibliografica: Livro e Revista. A classe Livro deve ter um atributo adicional chamado genero.

Livro  

Atributos:  
-genero  

Metodos:  
+informacoes()  


Revista  

Atributos:    
-edicao    

Metodos:  
+informacoes()  


## Crie uma classe Usuario com os seguintes atributos:

Atributos:

-nome  
-registroAcademico  
-dataNascimento (no formato "YYYY-MM-DD") ex. (1995-12-25)  


## Crie uma classe Biblioteca com os seguintes atributos:

Atributos:  

-acervo: array para armazenar as entidades bibliográficas  
-usuarios: array para armazenar os usuários  

Métodos:  

+adicionarItem(item): Adiciona uma entidade bibliográfica ao acervo.  
+listarAcervo(): Exibe o acervo da biblioteca.  
+adicionarUsuario(usuario): Adiciona um usuário à biblioteca.  
+emprestarItem(codigo, registroAcademico): Empréstimo de um item para um usuário.  
+devolverItem(codigo): Devolução de um item ao acervo.  


### Realize uma série de operações, como adicionar itens, adicionar usuários, emprestar e devolver itens, e listar o acervo para garantir que todo o sistema funcione corretamente:

Para iniciar as operações, instancie os objetos a seguir:  
Crie 1 objeto biblioteca  
Crie 5 objetos Usuarios  

Instancie Livros e Revista a partir da api:  
https://api-biblioteca-mb6w.onrender.com/acervo  
ou alguma api de sua preferencia que supra os atributos elencados.  