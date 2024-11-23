const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./piadas.db");

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS piadas (id INTEGER PRIMARY KEY, texto TEXT)"
  );
  const stmt = db.prepare("INSERT INTO piadas (texto) VALUES (?)");
  const piadas = [
    "Como deixar alguém curioso? Eu conto amanhã.",
    "Por que os fantasmas são péssimos para contar mentiras? - Porque são transparentes.",
    "Por que a plantinha não foi atendida no hospital? Porque só tinha médico de plantão.",
    "Se você está se sentindo sozinho, abandonado, achando que ninguém liga para você...  Atrase um pagamento.",
    "- Doutor, como eu faço para emagrecer?  - Basta a senhora mover a cabeça da esquerda para a direita e da direita para a esquerda.  - Quantas vezes, doutor?  - Todas as vezes que lhe oferecerem comida.",
    "Dois amigos se encontram depois de muitos anos.  - Casei, separei e já fizemos a partilha dos bens.  - E as crianças?  - O juiz decidiu que ficariam com aquele que mais bens recebeu.  - Então ficaram com a mãe?  - Não, ficaram com nosso advogado.",
    "O que a Lua disse ao Sol? – Nossa, você é tão grande e ainda não te deixam sair à noite!",
    "Eu perdi peso no mês passado.  Mas este mês ele já me encontrou de novo.",
    "Sabe qual é a melhor forma de consumir o tempo?  Comer relógios.",
    "Eu saí do meu trabalho. Não conseguiria continuar lá depois do que o meu chefe disse...  O que ele disse?  Você está despedido.",
    "- Dói, né? - O quê? - Deitar no sofá e lembrar que esqueceu o controle.",
    "Dois tomatinhos iam atravessar a rua, e um disse ao outro: -Cuidado, vem aí um carro! O outro não ouviu nada e atravessou. O carro passou por cima dele e o outro disse: – Já não é um tomate, é ketchup!",
    "O condenado à morte esperava a hora da execução, quando chegou o padre:  - Meu filho, vim trazer a palavra de Deus para você.  - Perda de tempo, seu padre. Daqui a pouco vou falar com Ele, pessoalmente. Algum recado?",
    "Um rapaz chegou num velório e a primeira coisa que perguntou foi: – Qual é a senha do Wi-Fi? Um parente incomodado disse: – Respeite o falecido! E ele perguntou: – É tudo junto?",
    "Manuel está tomando banho, e grita para Maria: – Ô Maria, me traz um xampu. E Maria lhe entrega o xampu. Logo em seguida, ele grita novamente: – Ô Maria, me traz outro xampu. – Mas eu já te dei um agorinha mesmo, homem! – É que aqui está dizendo que é para cabelos secos, e eu já molhei os meus.",
    "Você sabe por que a água foi presa? - Porque ela matou a sede.",
    "Dois amigos conversando… -Meu pai quer que eu faça Direito e seja um bom Advogado. -Que bom, vai seguir a profissão do velho? -Não, ele quer que tire ele da cadeia.",
    "Qual a cidade brasileira que não tem táxi?  Uberlândia.",
    "Aluno de Direito ao fazer prova oral:  - O que é uma fraude?  - É o que o senhor professor está fazendo - responde o aluno.  O professor fica indignado: ora essa, explique-se.  Então diz o aluno: segundo o Código Penal, comete fraude todo aquele que se aproveita da ignorância do outro para o prejudicar.",
    "Um eletricista vai até a UTI de um hospital, olha para os pacientes ligados a diversos tipos de aparelhos e diz-lhes:  Respirem fundo: vou trocar o fusível.",
    "Fui no café e perguntei se o salgado era de hoje. – Não, é de ontem. – E como faço pra comer o de hoje? – Volte amanhã!",
    "Qual a fórmula da água benta? H Deus O.",
    "– Miguel, aonde vai tão circunspecto e assaz atribulado? – Eu ia no banheiro, mas agora vou consultar um dicionário.",
    "Qual o contrário de papelada? Pá vestida.",
    "Contei uma piada química, mas não teve reação.",
    "Um canguru consegue pular mais alto que o Banespão? Claro, o Banespão não pula.",
    "O que o tijolo falou para o outro?  Há um ciumento entre nós.",
    "O que o cadarço falou para o tênis?  Eu me amarro em você.",
    "Por que o jacaré tirou o filho da escola?  Porque ele réptil de ano.",
    "Como o Batman conheceu o Robin?  Pelo bat-papo.",
    "Você sabe quem é o rei dos queijos?  É o reiqueijão.",
    "Por que o porco está sempre feliz?  Porque está de bacon a vida.",
    "Qual a diferença entre o gato e coca-cola?  O gato mia e a coca light.",
    "Qual é o cúmulo da solidão? Morar sozinho e fugir de casa.",
    "Qual é o alimento mais sagrado que existe?  O amém doim.",
    "O funcionário reclama do baixo salário que recebe e resolve reclamar com o patrão:  — Meu salário não está compatível com as minhas aptidões!  — Eu sei, eu sei! Mas não podemos deixar você morrer de fome.",
    "Por que o cachorro entrou na igreja? Porque é um pastor alemão.",
    "Por que a mulher do Hulk divorciou-se dele? Porque ela queria um homem mais maduro…",
    "Por que Stalin não atendeu o telefone?  Porque achou que era Trótski.",
    "Assim, por que Napoleão era sempre chamado para as festas na França?  Então, é porque ele era Bom Na Party (Bonaparte).",
    "Você conhece a piada do fotógrafo? Ainda não foi revelada.",
    "Na frase “ele acordou cedo”, onde está o sujeito?  Em algum lugar com sono.",
    "Quer pedir desculpas?  A partir de hoje só aceito pedido em dinheiro.",
    "Gosto tanto de vencer que nem peso eu perco.",
    "Um homem vai a uma loja para comprar um novo celular.  Modelo? - pergunta o atendente.  Não, eu sou mecânico, mas obrigado!",
    "Já marquei na agenda quando vou resolver todos os meus problemas: no próximo 30 de fevereiro.",
    "Então, o que o pagodeiro foi fazer na igreja?  Foi cantar Pá God.",
    "O que o cliente disse ao entrar na H.Stern?  E aí, tudo joia?",
    "Por que o rádio não pode ter filhos?  Porque ele é stereo.",
    "Por que o policial não usa sabão?  Porque ele prefere deter gente.",
    "Na frase Proibido estacionar, qual é o sujeito da oração?  Sujeito a guincho.",
    "O que a galinha foi fazer na igreja ? Assistir a Missa do Galo.",
    "O que o padeiro falou para o John Lennon?  O sonho acabou.",
    "Querido, onde está aquele livro Como viver 100 anos?  - Joguei fora!  - Jogou fora? Por quê?  - É que sua mãe vem nos visitar amanhã e eu não quero que ela leia essas coisas!",
    "Afinal, você conhece a piada do pônei?  Pô nei eu.",
    "Por que as plantas pequenas não falam?  Porque elas são mudinhas.",
    "Então, por que a velhinha não usa relógio?  Porque ela é sem hora.",
    "Então, havia dois caminhões voando. Um caiu. No entanto, por que o outro continuou voando?  Porque era caminhão-pipa.",
    "Se você tem uma opinião sobre a minha vida, levante as suas mãos.  Agora coloque-a entre os dentes da boca.",
    "Qual a fruta que anda de trem?  O kiwiiiii.",
    "O pai pergunta à filha:  - Filha, você acha que sua professora desconfia que eu estou te ajudando a fazer a lição de casa?  - Acho que sim, pai. Ela até já me disse que você deveria voltar para escola!",
    "O que é um astrólogo andando a cavalo ? Cavaleiro do Zodíaco.",
    "Por que o mouse é muito mimado?  Porque tudo o que ele quer, o mouse pad.",
    "Joãozinho chega atrasado à escola. Quando ele entra na sala de aula, a professora diz: - De novo atrasado, Joãozinho? - Ué, professora! Não é a senhora que diz que nunca é tarde para aprender?",
    ". Por que o Batman colocou o batmóvel no seguro? Porque ele tem medo que Robin.",
    "Por que o pinheiro não se perde na floresta?  Porque ele tem uma pinha (um mapinha).",
    "Como transformar o giz em uma cobra?  É só colocar ele na água que o GIZBÓIA!",
    "O que fala o livro de Matemática para o livro de História?  Não me venha com história que eu já estou cheio de problema!",
    "Como se faz omelete de chocolate?  Com ovos de páscoa.",
    "O que é um pontinho verde no canto da sala? R: Uma ervilha de castigo."
  ];

  piadas.forEach((piada) => {
    stmt.run(piada);
  });

  stmt.finalize();
});

db.close();
