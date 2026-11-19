export type Level = {
  code: string;
  name: string;
  description: string;
  ageNote: string;
  color: string;
  plannedLessons: number;
};

export const levels: Level[] = [
  { code: "A1", name: "Primeiros passos", description: "Apresente-se, fale da rotina e entenda frases do dia a dia.", ageNote: "Temas cotidianos para jovens e adultos", color: "blue", plannedLessons: 49 },
  { code: "A2", name: "Construindo frases", description: "Conte experiências simples e resolva situações comuns.", ageNote: "Vocabulário prático e histórias curtas", color: "yellow", plannedLessons: 40 },
  { code: "B1", name: "Mais autonomia", description: "Explique opiniões e acompanhe conversas sobre temas familiares.", ageNote: "Projetos, cultura e conversação", color: "green", plannedLessons: 30 },
  { code: "B2", name: "Conversas com confiança", description: "Argumente, compare ideias e compreenda textos mais complexos.", ageNote: "Conteúdos para estudo e trabalho", color: "purple", plannedLessons: 30 },
  { code: "C1", name: "Inglês avançado", description: "Use a língua com flexibilidade em contextos acadêmicos e profissionais.", ageNote: "Leitura crítica e expressão precisa", color: "orange", plannedLessons: 30 },
  { code: "C2", name: "Domínio e nuance", description: "Entenda nuances e comunique ideias com naturalidade e precisão.", ageNote: "Desafios avançados de linguagem", color: "ink", plannedLessons: 30 },
];

export type LessonExercise = {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type Lesson = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  objective: string;
  duration: number;
  focus: string;
  intro: string;
  phrases: { english: string; portuguese: string; note: string }[];
  grammar: { title: string; explanation: string; examples: { english: string; portuguese: string }[] };
  practice: LessonExercise[];
  takeaway: string;
};

export const a1ModuleOneLessons: Lesson[] = [
  {
    id: "hello-new-world", slug: "hello-new-world", title: "Hello, new world", subtitle: "Comece uma conversa com confiança.", objective: "Cumprimentar alguém, dizer seu nome e perguntar de onde a pessoa vem.", duration: 8, focus: "Saudações e apresentações",
    intro: "Toda conversa começa com um pequeno gesto. Em inglês, poucas frases bem escolhidas já abrem espaço para conhecer alguém.",
    phrases: [
      { english: "Hello! My name is Maya.", portuguese: "Olá! Meu nome é Maya.", note: "Hello funciona em situações formais e informais. Em conversas descontraídas, você também pode dizer Hi!" },
      { english: "Nice to meet you.", portuguese: "Prazer em conhecer você.", note: "Uma resposta simpática quando alguém se apresenta pela primeira vez." },
      { english: "Where are you from?", portuguese: "De onde você é?", note: "Where pergunta sobre lugar. Você pode responder: I’m from Brazil." },
    ],
    grammar: { title: "Apresente-se com my name is", explanation: "Use My name is + seu nome para se apresentar. Na conversa do dia a dia, I’m + nome também é natural e mais curto.", examples: [{ english: "My name is Maya.", portuguese: "Meu nome é Maya." }, { english: "I’m Leo.", portuguese: "Eu sou Leo." }] },
    practice: [
      { prompt: "Você acabou de conhecer alguém. Qual frase significa “Prazer em conhecer você”?", options: ["Where are you from?", "Nice to meet you.", "See you tomorrow."], answer: 1, explanation: "Nice to meet you é a expressão usada ao conhecer alguém. A pergunta sobre origem é Where are you from?" },
      { prompt: "Complete a apresentação: “Hello! ___ name is Maya.”", options: ["My", "Me", "I"], answer: 0, explanation: "My name is… significa “Meu nome é…”. A forma I’m Maya também funciona, mas não usamos I name." },
    ],
    takeaway: "Hello! My name is ____. Nice to meet you. Where are you from?",
  },
  {
    id: "greetings-by-time", slug: "greetings-by-time", title: "A greeting for every moment", subtitle: "Escolha a saudação que combina com a hora.", objective: "Reconhecer e usar saudações comuns ao longo do dia.", duration: 7, focus: "Cumprimentos e despedidas",
    intro: "A primeira palavra muda conforme o momento. Você não precisa decorar uma lista enorme: três saudações cobrem quase todo o dia.",
    phrases: [
      { english: "Good morning!", portuguese: "Bom dia!", note: "Use pela manhã, normalmente até perto do meio-dia." },
      { english: "Good afternoon.", portuguese: "Boa tarde.", note: "Uma saudação neutra para depois do meio-dia e antes do anoitecer." },
      { english: "Good evening. See you tomorrow!", portuguese: "Boa noite. Até amanhã!", note: "Good evening cumprimenta alguém à noite. Para se despedir antes de dormir, use Good night." },
    ],
    grammar: { title: "Good evening ou Good night?", explanation: "Good evening é usado ao chegar ou iniciar uma conversa à noite. Good night costuma aparecer na despedida, quando a pessoa vai dormir ou encerrar o dia.", examples: [{ english: "Good evening, everyone.", portuguese: "Boa noite, pessoal. (chegada)" }, { english: "Good night, Mom.", portuguese: "Boa noite, mãe. (despedida)" }] },
    practice: [
      { prompt: "Você chega a um jantar às 19h. O que diz?", options: ["Good morning", "Good evening", "Good night"], answer: 1, explanation: "Ao chegar e cumprimentar alguém à noite, use Good evening." },
      { prompt: "Você vai dormir. Qual é a despedida mais natural?", options: ["Good night", "Good afternoon", "Good evening"], answer: 0, explanation: "Good night é usado para se despedir ao fim do dia ou antes de dormir." },
    ],
    takeaway: "Good morning (manhã) · Good afternoon (tarde) · Good evening (chegada à noite) · Good night (despedida).",
  },
  {
    id: "my-name-is", slug: "my-name-is", title: "Say your name", subtitle: "Apresente-se de forma natural.", objective: "Dizer seu nome e perguntar o nome de outra pessoa.", duration: 8, focus: "Verbo to be: I am / I’m",
    intro: "Em uma conversa nova, seu nome é uma ótima próxima informação. Há duas formas frequentes de se apresentar — uma mais completa e outra mais curta.",
    phrases: [
      { english: "I’m Ana. What’s your name?", portuguese: "Eu sou Ana. Qual é o seu nome?", note: "I’m é a forma contraída de I am, muito usada ao falar." },
      { english: "My name is Daniel.", portuguese: "Meu nome é Daniel.", note: "Uma opção clara e um pouco mais formal para se apresentar." },
      { english: "You can call me Sam.", portuguese: "Pode me chamar de Sam.", note: "Use essa frase para compartilhar o nome pelo qual prefere ser chamado." },
    ],
    grammar: { title: "I am vira I’m", explanation: "Em inglês falado, é comum juntar I + am em I’m. Para perguntar o nome, What’s é a contração de What is.", examples: [{ english: "I am Nina. → I’m Nina.", portuguese: "Eu sou Nina." }, { english: "What is your name? → What’s your name?", portuguese: "Qual é o seu nome?" }] },
    practice: [
      { prompt: "Complete: “___ name is Tom.”", options: ["My", "I’m", "You"], answer: 0, explanation: "A estrutura correta é My name is + nome. I’m Tom é outra forma possível, sem a palavra name." },
      { prompt: "Qual pergunta você usa para saber o nome de alguém?", options: ["What’s your name?", "Where are you from?", "How old is your name?"], answer: 0, explanation: "What’s your name? significa “Qual é o seu nome?”" },
    ],
    takeaway: "I’m ____. What’s your name? You can call me ____. ",
  },
  {
    id: "where-are-you-from", slug: "where-are-you-from", title: "Where are you from?", subtitle: "Fale de onde você vem e demonstre interesse.", objective: "Perguntar sobre origem e responder com país ou cidade.", duration: 9, focus: "Perguntas com where + verbo to be",
    intro: "Depois dos nomes, é comum descobrir de onde as pessoas vêm. Uma pergunta curta dá início a uma conversa maior sobre lugares e histórias.",
    phrases: [
      { english: "Where are you from?", portuguese: "De onde você é?", note: "Where pergunta sobre o lugar. Repare na ordem: Where + are + you." },
      { english: "I’m from Brazil.", portuguese: "Eu sou do Brasil.", note: "Use I’m from + país ou cidade para falar da sua origem." },
      { english: "Are you from São Paulo?", portuguese: "Você é de São Paulo?", note: "Uma pergunta de sim ou não começa com Are. A resposta curta pode ser Yes, I am ou No, I’m not." },
    ],
    grammar: { title: "Perguntas com are", explanation: "Para perguntar se alguém é de um lugar, coloque Are antes de you: Are you from Brazil? Para perguntar qual lugar, comece com Where: Where are you from?", examples: [{ english: "Where are you from? — I’m from Recife.", portuguese: "De onde você é? — Sou de Recife." }, { english: "Are you from Brazil? — Yes, I am.", portuguese: "Você é do Brasil? — Sim." }] },
    practice: [
      { prompt: "Complete a pergunta: “Where ___ you from?”", options: ["is", "are", "am"], answer: 1, explanation: "Com you, usamos are: Where are you from?" },
      { prompt: "Como você diz “Sou de Curitiba” em inglês?", options: ["I from Curitiba.", "I’m from Curitiba.", "I are Curitiba."], answer: 1, explanation: "Use I’m from + lugar. I’m é a forma curta de I am." },
    ],
    takeaway: "Where are you from? — I’m from ____. Are you from ____? — Yes, I am. / No, I’m not.",
  },
  {
    id: "first-conversation-review", slug: "first-conversation-review", title: "Your first conversation", subtitle: "Junte as peças em um diálogo completo.", objective: "Combinar saudações, apresentação e origem em uma conversa curta.", duration: 10, focus: "Revisão e recuperação ativa",
    intro: "Agora você tem as peças principais. Primeiro tente lembrar sem consultar as aulas anteriores. Depois, confira como elas se encaixam em um diálogo real.",
    phrases: [
      { english: "Good morning! I’m Alex.", portuguese: "Bom dia! Eu sou Alex.", note: "A saudação abre a conversa; I’m apresenta quem fala." },
      { english: "Hi, Alex. I’m Taylor. Nice to meet you.", portuguese: "Oi, Alex. Eu sou Taylor. Prazer em conhecer você.", note: "A outra pessoa responde com sua apresentação e uma frase cordial." },
      { english: "Nice to meet you, too. Where are you from?", portuguese: "Prazer em conhecer você também. De onde você é?", note: "Too aqui significa “também”. A conversa segue com uma pergunta aberta." },
      { english: "I’m from Brazil. How about you?", portuguese: "Sou do Brasil. E você?", note: "How about you? devolve a pergunta de forma natural." },
    ],
    grammar: { title: "Uma conversa tem ritmo", explanation: "Uma apresentação natural alterna pergunta e resposta. Você pode adicionar How about you? para convidar a outra pessoa a continuar.", examples: [{ english: "I’m from Brazil. How about you?", portuguese: "Sou do Brasil. E você?" }, { english: "I’m from Canada.", portuguese: "Sou do Canadá." }] },
    practice: [
      { prompt: "Complete o diálogo: “Where are you from?” — “___ from Brazil.”", options: ["I’m", "My", "Are"], answer: 0, explanation: "Para responder sobre sua origem, diga I’m from + lugar." },
      { prompt: "Você quer perguntar de volta depois de responder. Qual frase funciona melhor?", options: ["How about you?", "Good night?", "My name?"], answer: 0, explanation: "How about you? significa “E você?” e mantém a conversa fluindo." },
    ],
    takeaway: "Good morning! I’m ____. Nice to meet you. Where are you from? I’m from ____. How about you?",
  },
];

export type A1Module = { id: string; title: string; subtitle: string; lessons: Lesson[] };

export const a1ModuleTwoLessons: Lesson[] = [
  {
    id: "countries-and-nationalities", slug: "countries-and-nationalities", title: "A map of many stories", subtitle: "Fale sobre lugares e nacionalidades.", objective: "Nomear alguns países e dizer sua nacionalidade.", duration: 8, focus: "Países e nacionalidades",
    intro: "Perguntar de onde alguém vem pode revelar muito mais do que um ponto no mapa. Vamos usar alguns nomes de países e nacionalidades para manter essa conversa viva.",
    phrases: [
      { english: "I’m from Brazil. I’m Brazilian.", portuguese: "Sou do Brasil. Sou brasileiro(a).", note: "Brazil é o país; Brazilian é a nacionalidade. Em inglês, nacionalidades começam com letra maiúscula." },
      { english: "She’s from Japan. She’s Japanese.", portuguese: "Ela é do Japão. Ela é japonesa.", note: "Japan é o país; Japanese é a nacionalidade. O final da palavra muda conforme o país." },
      { english: "Where are they from? They’re from Mexico.", portuguese: "De onde eles são? Eles são do México.", note: "They’re é a forma contraída de they are, usada para falar de mais de uma pessoa." },
    ],
    grammar: { title: "País ou nacionalidade?", explanation: "Use be from + país para dizer de onde alguém é. Para nacionalidade, use be + nacionalidade: I’m from Brazil. I’m Brazilian.", examples: [{ english: "He’s from Canada. He’s Canadian.", portuguese: "Ele é do Canadá. Ele é canadense." }, { english: "We’re from Portugal. We’re Portuguese.", portuguese: "Somos de Portugal. Somos portugueses." }] },
    practice: [
      { prompt: "Complete: “She’s from Japan. She’s ___.”", options: ["Japan", "Japanese", "the Japanese from"], answer: 1, explanation: "Japanese é a nacionalidade. Japan é o nome do país." },
      { prompt: "Como dizer “Sou do México”?", options: ["I’m Mexico.", "I’m from Mexico.", "I from Mexican."], answer: 1, explanation: "A estrutura é I’m from + nome do país." },
    ],
    takeaway: "I’m from ____. I’m ____. Where are you from?",
  },
  {
    id: "numbers-and-age", slug: "numbers-and-age", title: "Numbers that matter", subtitle: "Conte, pergunte e responda com números.", objective: "Reconhecer números comuns e dizer a idade em uma conversa simples.", duration: 8, focus: "Números e idade com to be",
    intro: "Números aparecem em aniversários, salas, telefones e muitas outras conversas. Vamos aprender uma estrutura essencial — sem precisar compartilhar nenhum dado pessoal real.",
    phrases: [
      { english: "I’m twenty years old.", portuguese: "Tenho vinte anos.", note: "Em inglês, a idade usa o verbo be: I am twenty, não I have twenty." },
      { english: "How old are you?", portuguese: "Quantos anos você tem?", note: "Uma pergunta comum. Você pode responder com I’m + número, ou simplesmente I’d rather not say." },
      { english: "I’m thirty-two.", portuguese: "Tenho trinta e dois anos.", note: "Em números compostos de 21 a 99, use hífen na escrita: thirty-two." },
    ],
    grammar: { title: "Em inglês, a idade usa be", explanation: "O português diz “ter” anos; o inglês usa to be. Pergunte How old are you? e responda I’m + número. Não é obrigatório compartilhar sua idade.", examples: [{ english: "How old is Sam? — Sam is eight.", portuguese: "Quantos anos Sam tem? — Sam tem oito." }, { english: "I’m twenty-one. / I’m 21.", portuguese: "Tenho vinte e um anos." }] },
    practice: [
      { prompt: "Complete: “I ___ eighteen years old.”", options: ["have", "am", "do"], answer: 1, explanation: "Para dizer idade em inglês, use o verbo be: I am eighteen." },
      { prompt: "Qual pergunta significa “Quantos anos você tem?”", options: ["How many are you?", "How old are you?", "What age have you?"], answer: 1, explanation: "A expressão fixa é How old are you? A resposta pode ser I’m + número." },
    ],
    takeaway: "How old are you? — I’m ____ years old. (Compartilhe apenas se quiser.)",
  },
  {
    id: "everyday-routines", slug: "everyday-routines", title: "A day in motion", subtitle: "Conte o que você faz todos os dias.", objective: "Descrever três ações simples de uma rotina diária.", duration: 9, focus: "Simple present: I / you / we / they",
    intro: "Uma rotina não precisa ser extraordinária para render uma boa conversa. Com alguns verbos frequentes, você já consegue contar como um dia costuma acontecer.",
    phrases: [
      { english: "I wake up at seven.", portuguese: "Eu acordo às sete.", note: "Wake up significa acordar. Com I, o verbo fica na forma base." },
      { english: "We have breakfast at home.", portuguese: "Tomamos café da manhã em casa.", note: "Have breakfast é a expressão natural para “tomar café da manhã”." },
      { english: "They study English after work.", portuguese: "Eles estudam inglês depois do trabalho.", note: "After work significa depois do trabalho; after school é depois da escola." },
    ],
    grammar: { title: "A forma base para I, you, we e they", explanation: "No presente simples, com I, you, we e they, use o verbo na forma base. Use do para perguntas e don’t para negativas.", examples: [{ english: "I work. We study.", portuguese: "Eu trabalho. Nós estudamos." }, { english: "Do you cook? — No, I don’t.", portuguese: "Você cozinha? — Não." }] },
    practice: [
      { prompt: "Complete: “They ___ English after school.”", options: ["studies", "study", "studying"], answer: 1, explanation: "Com they, usamos a forma base study. A terminação -s aparece com he, she e it." },
      { prompt: "Escolha a pergunta correta: “Você trabalha em casa?”", options: ["Do you work at home?", "Are you work at home?", "Work you at home?"], answer: 0, explanation: "Para perguntar no presente simples com you, comece com Do + you + verbo base." },
    ],
    takeaway: "I wake up at ____. I have breakfast at ____. I study/work ____. Do you?",
  },
  {
    id: "days-and-times", slug: "days-and-times", title: "When does it happen?", subtitle: "Combine dias da semana e horários.", objective: "Dizer em que dia e horário uma atividade acontece.", duration: 8, focus: "Dias, horas e preposições",
    intro: "Dias e horários ajudam você a combinar planos. Algumas pequenas palavras — on e at — conectam a atividade ao momento certo.",
    phrases: [
      { english: "I study English on Monday.", portuguese: "Estudo inglês na segunda-feira.", note: "Use on antes dos dias da semana. Os dias em inglês começam com letra maiúscula." },
      { english: "The class starts at nine o’clock.", portuguese: "A aula começa às nove horas.", note: "Use at antes de um horário específico." },
      { english: "We meet on Friday at six.", portuguese: "Nós nos encontramos na sexta às seis.", note: "Você pode combinar on + dia e at + hora na mesma frase." },
    ],
    grammar: { title: "On para dias, at para horas", explanation: "Para falar de um dia específico, use on: on Tuesday. Para uma hora exata, use at: at 5:30. A palavra o’clock acompanha horas cheias.", examples: [{ english: "The meeting is on Thursday.", portuguese: "A reunião é na quinta-feira." }, { english: "It starts at ten o’clock.", portuguese: "Começa às dez horas." }] },
    practice: [
      { prompt: "Complete: “I have class ___ Wednesday.”", options: ["at", "on", "in"], answer: 1, explanation: "Use on com dias da semana: on Wednesday." },
      { prompt: "Complete: “The film starts ___ 8:30.”", options: ["on", "at", "from"], answer: 1, explanation: "Use at antes de um horário específico: at 8:30." },
    ],
    takeaway: "I study/work on ____. It starts at ____. What about you?",
  },
  {
    id: "my-day-review", slug: "my-day-review", title: "A day, your way", subtitle: "Conte sobre um dia comum em poucas frases.", objective: "Combinar horário, rotina e perguntas simples em um diálogo curto.", duration: 10, focus: "Revisão: presente simples e horários",
    intro: "Hora de juntar as ideias: um dia da semana, um horário e uma atividade. Use a rotina de uma personagem fictícia para praticar — não é necessário falar da sua vida real.",
    phrases: [
      { english: "Mina is from Korea. She’s Korean.", portuguese: "Mina é da Coreia. Ela é coreana.", note: "Uma revisão de país e nacionalidade: Korea é o país; Korean é a nacionalidade." },
      { english: "She wakes up at seven and has breakfast at home.", portuguese: "Ela acorda às sete e toma café da manhã em casa.", note: "Com he, she e it, muitos verbos no presente simples recebem -s." },
      { english: "She studies English on Monday and Wednesday.", portuguese: "Ela estuda inglês na segunda e na quarta.", note: "She studies: o verbo study troca y por ies depois de he, she ou it." },
      { english: "Do you study English, too?", portuguese: "Você também estuda inglês?", note: "Do inicia perguntas com you; too no final significa “também”." },
    ],
    grammar: { title: "He / she + verbo com s", explanation: "Para falar da rotina de uma pessoa usando he, she ou it, acrescente -s ao verbo: she works. Em verbos terminados em consoante + y, troque y por -ies: study → studies.", examples: [{ english: "I study. She studies.", portuguese: "Eu estudo. Ela estuda." }, { english: "He works on Friday at nine.", portuguese: "Ele trabalha na sexta às nove." }] },
    practice: [
      { prompt: "Complete: “Mina ___ English on Monday.”", options: ["study", "studies", "studying"], answer: 1, explanation: "Com she, study muda para studies (consoante + y vira -ies)." },
      { prompt: "Complete: “She wakes up ___ seven.”", options: ["on", "at", "from"], answer: 1, explanation: "Use at para indicar o horário específico: at seven." },
    ],
    takeaway: "She’s from ____. She wakes up at ____. She studies on ____. Do you, too?",
  },
];

export const a1ModuleThreeLessons: Lesson[] = [
  {
    id: "ordering-at-a-cafe", slug: "ordering-at-a-cafe", title: "A table for two", subtitle: "Peça algo para comer com educação.", objective: "Fazer um pedido simples e agradecer em um café.", duration: 9, focus: "Pedidos com can e would like",
    intro: "Você entra em um café e o cardápio parece novo. Com duas estruturas educadas, dá para pedir algo simples e entender a resposta sem decorar um diálogo inteiro.",
    phrases: [
      { english: "Can I have a coffee, please?", portuguese: "Pode me trazer um café, por favor?", note: "Can I have…? é um pedido comum e cordial. Please suaviza o pedido." },
      { english: "I’d like a sandwich, please.", portuguese: "Eu gostaria de um sanduíche, por favor.", note: "I’d like é a forma curta de I would like. É educada e muito útil ao pedir comida." },
      { english: "Anything else? — No, that’s all. Thank you.", portuguese: "Mais alguma coisa? — Não, é só isso. Obrigado(a).", note: "That’s all encerra o pedido. Thank you é adequado em qualquer situação." },
    ],
    grammar: { title: "Can I have…? ou I’d like…", explanation: "As duas estruturas servem para pedir. Can I have…? pergunta se é possível receber algo; I’d like… diz o que você gostaria. Acrescente please para soar cordial.", examples: [{ english: "Can I have some water, please?", portuguese: "Pode me trazer água, por favor?" }, { english: "I’d like the soup, please.", portuguese: "Eu gostaria da sopa, por favor." }] },
    practice: [
      { prompt: "Você quer pedir um chá de forma educada. Qual frase escolher?", options: ["I tea want.", "Can I have a tea, please?", "Give tea me."], answer: 1, explanation: "Can I have…? + please é uma forma natural e cordial de pedir algo." },
      { prompt: "O atendente pergunta “Anything else?” e você terminou. O que responde?", options: ["That’s all, thank you.", "I’m from Brazil.", "At seven, please."], answer: 0, explanation: "That’s all significa que não deseja mais nada. Agradeça com thank you." },
    ],
    takeaway: "I’d like ____, please. / Can I have ____, please? — That’s all, thank you.",
  },
  {
    id: "prices-and-paying", slug: "prices-and-paying", title: "How much is it?", subtitle: "Pergunte o preço e pague com clareza.", objective: "Entender um preço simples e perguntar quanto custa um item.", duration: 8, focus: "How much e this/that",
    intro: "Depois de escolher, você pode confirmar o preço antes de pagar. Estas perguntas também funcionam em uma loja, feira ou bilheteria.",
    phrases: [
      { english: "How much is this coffee?", portuguese: "Quanto custa este café?", note: "How much pergunta o preço. This aponta para algo perto de você." },
      { english: "It’s four dollars and fifty cents.", portuguese: "São quatro dólares e cinquenta centavos.", note: "Para valores, diga primeiro a unidade principal e depois os centavos." },
      { english: "Can I pay by card?", portuguese: "Posso pagar com cartão?", note: "By card é uma forma comum de dizer “com cartão”. Você também pode ouvir cash, dinheiro em espécie." },
    ],
    grammar: { title: "How much is…?", explanation: "Para perguntar o preço de um item, use How much is + this/that + item? This é algo perto; that é algo mais distante. Para vários itens, use How much are these/those?", examples: [{ english: "How much is that sandwich?", portuguese: "Quanto custa aquele sanduíche?" }, { english: "How much are these apples?", portuguese: "Quanto custam estas maçãs?" }] },
    practice: [
      { prompt: "Você segura um ingresso e quer saber o preço. Qual pergunta funciona?", options: ["How many is this?", "How much is this ticket?", "How old is this ticket?"], answer: 1, explanation: "Use How much is + item para perguntar o preço de uma coisa." },
      { prompt: "Como perguntar “Posso pagar com cartão?”", options: ["Can I pay by card?", "How much card?", "I pay card am?"], answer: 0, explanation: "Can I…? pede permissão; by card significa com cartão." },
    ],
    takeaway: "How much is this/that ____? — It’s ____. Can I pay by card?",
  },
  {
    id: "asking-for-directions", slug: "asking-for-directions", title: "Which way is the station?", subtitle: "Peça ajuda para encontrar um lugar.", objective: "Perguntar onde fica um lugar e compreender três instruções básicas.", duration: 9, focus: "Where is…? e imperativos",
    intro: "Uma pergunta simples pode transformar uma cidade desconhecida em um lugar mais fácil de explorar. Comece com a pergunta; depois procure o verbo que indica o próximo movimento.",
    phrases: [
      { english: "Excuse me, where is the station?", portuguese: "Com licença, onde fica a estação?", note: "Excuse me chama a atenção com educação antes de pedir ajuda." },
      { english: "Go straight and turn left.", portuguese: "Siga em frente e vire à esquerda.", note: "Go straight é seguir em frente. Turn left/right indica virar à esquerda/direita." },
      { english: "It’s next to the bank, across from the park.", portuguese: "Fica ao lado do banco, em frente ao parque.", note: "Next to significa ao lado de; across from significa do outro lado/em frente a." },
    ],
    grammar: { title: "Instruções começam com o verbo", explanation: "Para dar uma instrução curta, use o verbo no início: Go, Turn, Stop. Where is…? pergunta onde fica um lugar. Você pode agradecer com Thanks for your help.", examples: [{ english: "Turn right at the corner.", portuguese: "Vire à direita na esquina." }, { english: "Go straight for two blocks.", portuguese: "Siga em frente por dois quarteirões." }] },
    practice: [
      { prompt: "Você precisa encontrar o museu. Qual pergunta faz?", options: ["Where is the museum?", "How much museum?", "When are museum?"], answer: 0, explanation: "Where is…? pergunta onde fica um lugar." },
      { prompt: "O que significa “Turn right at the corner”?", options: ["Siga em frente até a esquina.", "Vire à direita na esquina.", "Atravesse o parque."], answer: 1, explanation: "Turn right significa vire à direita; at the corner indica na esquina." },
    ],
    takeaway: "Excuse me, where is the ____? — Go straight. Turn ____. It’s next to the ____.",
  },
  {
    id: "getting-around-town", slug: "getting-around-town", title: "Getting around town", subtitle: "Diga como você vai de um lugar a outro.", objective: "Nomear meios de transporte e dizer como chega a um destino.", duration: 8, focus: "By + transporte e preposições de lugar",
    intro: "Depois de descobrir o caminho, escolha como chegar. Uma combinação pequena de verbo, meio de transporte e destino já resolve essa parte do plano.",
    phrases: [
      { english: "I go to work by bus.", portuguese: "Vou ao trabalho de ônibus.", note: "Use by + meio de transporte para falar do modo de deslocamento." },
      { english: "The café is near the station.", portuguese: "O café fica perto da estação.", note: "Near significa perto de. Use it is ou it’s para localizar lugares." },
      { english: "We walk to the park.", portuguese: "Vamos a pé ao parque.", note: "Walk to significa ir caminhando até. Não usamos by antes de walk." },
    ],
    grammar: { title: "By bus, by train — mas on foot", explanation: "Use by + transporte: by bus, by train, by car. Para dizer “a pé”, a expressão é on foot; como verbo, use walk: I walk to school.", examples: [{ english: "She goes by train.", portuguese: "Ela vai de trem." }, { english: "They walk to the café.", portuguese: "Eles vão caminhando ao café." }] },
    practice: [
      { prompt: "Complete: “I go to school ___ bus.”", options: ["on", "by", "at"], answer: 1, explanation: "Use by + transporte: by bus, by train, by car." },
      { prompt: "Qual frase significa “O café fica perto da estação”?", options: ["The café is near the station.", "The café is by station walking.", "The café near are station."], answer: 0, explanation: "Near significa perto de; a estrutura é The café is near the station." },
    ],
    takeaway: "I go to ____ by ____. The ____ is near the ____. / I walk to ____.",
  },
  {
    id: "city-errand-review", slug: "city-errand-review", title: "One afternoon in town", subtitle: "Resolva uma pequena missão pela cidade.", objective: "Combinar pedido, pagamento e instruções em situações do cotidiano.", duration: 10, focus: "Revisão aplicada: cidade e serviços",
    intro: "Acompanhe Sam em três paradas: um café, uma pergunta sobre o caminho e a estação. Observe como uma conversa curta prepara a próxima.",
    phrases: [
      { english: "Can I have a sandwich and some water, please?", portuguese: "Pode me trazer um sanduíche e água, por favor?", note: "Junte dois itens no pedido com and. Some water é uma quantidade não especificada." },
      { english: "How much is it? — It’s six dollars.", portuguese: "Quanto custa? — São seis dólares.", note: "How much is it? pergunta o preço total quando o item ou pedido já foi mencionado." },
      { english: "Excuse me, where is the station? — Go straight and turn right.", portuguese: "Com licença, onde fica a estação? — Siga em frente e vire à direita.", note: "A pergunta abre o pedido de ajuda; os verbos no início dão as instruções." },
      { english: "Thanks! I’ll walk. It’s near the café.", portuguese: "Obrigado(a)! Vou caminhando. Fica perto do café.", note: "I’ll walk diz que vou a pé. Near descreve a distância entre dois lugares." },
    ],
    grammar: { title: "Conecte uma ideia à próxima", explanation: "Use and para unir itens ou ações. Pronomes como it retomam algo já mencionado: How much is it? Near e next to ajudam a explicar a localização.", examples: [{ english: "A tea and a sandwich, please.", portuguese: "Um chá e um sanduíche, por favor." }, { english: "The station is near the café.", portuguese: "A estação fica perto do café." }] },
    practice: [
      { prompt: "Você já escolheu o sanduíche e quer saber o preço total. O que pergunta?", options: ["How much is it?", "Where is it from?", "How old is it?"], answer: 0, explanation: "Depois que o item está claro, it retoma o pedido: How much is it?" },
      { prompt: "Complete: “Go straight and ___ left.”", options: ["turn", "pay", "order"], answer: 0, explanation: "Turn left significa vire à esquerda; turn é um verbo de direção." },
    ],
    takeaway: "Can I have ____, please? How much is it? Excuse me, where is ____? Go straight and turn ____.",
  },
];

export const a1ModuleFourLessons: Lesson[] = [
  {
    id: "family-and-friends", slug: "family-and-friends", title: "People in my life", subtitle: "Apresente pessoas importantes para você.", objective: "Nomear familiares e falar de uma pessoa próxima com frases simples.", duration: 9, focus: "Família e possessivos",
    intro: "Conversas sobre família e amizades aparecem quando a gente se apresenta e conta um pouco da própria história. Use exemplos fictícios se preferir manter sua vida pessoal privada.",
    phrases: [
      { english: "This is my sister, Ana.", portuguese: "Esta é minha irmã, Ana.", note: "This is apresenta uma pessoa que está perto de você. My indica que a relação é sua." },
      { english: "Her name is Julia. She’s a good friend.", portuguese: "O nome dela é Julia. Ela é uma boa amiga.", note: "Her significa “dela” e acompanha um nome: her name. Para “dele”, use his." },
      { english: "We live with our parents.", portuguese: "Nós moramos com nossos pais.", note: "Our significa “nosso/nossa”. Parents é uma forma comum de dizer pais." },
    ],
    grammar: { title: "My, your, his, her e our", explanation: "Use palavras possessivas antes do substantivo: my brother, your friend, his name, her family, our parents. Em inglês, a palavra não muda conforme o gênero do objeto.", examples: [{ english: "He’s my cousin. His name is Ben.", portuguese: "Ele é meu primo. O nome dele é Ben." }, { english: "She’s my friend. Her name is Lia.", portuguese: "Ela é minha amiga. O nome dela é Lia." }] },
    practice: [
      { prompt: "Complete: “Julia is my friend. ___ name is Julia.”", options: ["His", "Her", "Our"], answer: 1, explanation: "Her significa “dela” e é o possessivo usado com she." },
      { prompt: "Você apresenta sua mãe. Qual frase está correta?", options: ["This is my mother.", "This my is mother.", "She this my mother."], answer: 0, explanation: "A estrutura simples para apresentar alguém é This is + possessivo + pessoa." },
    ],
    takeaway: "This is my ____. His/Her name is ____. We live with our ____.",
  },
  {
    id: "things-i-own", slug: "things-i-own", title: "What’s in your bag?", subtitle: "Fale de objetos que fazem parte do seu dia.", objective: "Nomear objetos pessoais e perguntar a quem pertencem.", duration: 8, focus: "Possessivos e whose",
    intro: "Uma mochila, uma mesa ou um bolso têm objetos que usamos todos os dias. Saber nomeá-los ajuda você a pedir, encontrar e devolver algo.",
    phrases: [
      { english: "This is my notebook. That’s your pen.", portuguese: "Este é meu caderno. Aquela é sua caneta.", note: "This aponta para algo perto; that aponta para algo mais distante." },
      { english: "Whose keys are these? — They’re mine.", portuguese: "De quem são estas chaves? — São minhas.", note: "Whose pergunta a quem algo pertence. Mine substitui my + objeto." },
      { english: "Is this your phone? — No, it’s hers.", portuguese: "Este telefone é seu? — Não, é dela.", note: "Hers quer dizer “dela” e aparece sem o substantivo depois." },
    ],
    grammar: { title: "My book, mas the book is mine", explanation: "My, your, his e her aparecem antes de um objeto: my bag. Mine, yours, his e hers aparecem sozinhos: The bag is mine. Use whose para perguntar de quem é algo.", examples: [{ english: "Is this your umbrella? — Yes, it’s mine.", portuguese: "Este guarda-chuva é seu? — Sim, é meu." }, { english: "Whose jacket is that? — It’s his.", portuguese: "De quem é aquela jaqueta? — É dele." }] },
    practice: [
      { prompt: "Complete: “This is ___ backpack.” (a mochila é minha)", options: ["mine", "my", "me"], answer: 1, explanation: "Antes do substantivo backpack, usamos my: my backpack." },
      { prompt: "Como perguntar “De quem são estas chaves?”", options: ["Who keys are these?", "Whose keys are these?", "Where keys these?"], answer: 1, explanation: "Whose + objeto pergunta a quem ele pertence." },
    ],
    takeaway: "Whose ____ is this? — It’s mine/yours/his/hers. / These are my ____.",
  },
  {
    id: "rooms-at-home", slug: "rooms-at-home", title: "A place to call home", subtitle: "Apresente os cômodos e objetos da casa.", objective: "Nomear cômodos e dizer o que existe em um espaço.", duration: 9, focus: "There is / there are",
    intro: "Uma casa pode ser pequena, grande ou compartilhada. Para descrevê-la, comece pelo que existe nela: um cômodo, alguns móveis ou um lugar favorito.",
    phrases: [
      { english: "There’s a kitchen next to the living room.", portuguese: "Há uma cozinha ao lado da sala.", note: "There’s é a forma curta de there is e apresenta uma coisa ou lugar no singular." },
      { english: "There are two bedrooms upstairs.", portuguese: "Há dois quartos no andar de cima.", note: "Use there are antes de substantivos no plural." },
      { english: "My favorite room is the balcony.", portuguese: "Meu cômodo favorito é a varanda.", note: "Favorite descreve aquilo de que você mais gosta." },
    ],
    grammar: { title: "There is para um; there are para mais", explanation: "Use There is/There’s com uma coisa no singular. Use There are com duas ou mais. Para negar, acrescente not: There isn’t a garage. / There aren’t any stairs.", examples: [{ english: "There’s a table in the kitchen.", portuguese: "Há uma mesa na cozinha." }, { english: "There are three windows in my room.", portuguese: "Há três janelas no meu quarto." }] },
    practice: [
      { prompt: "Complete: “There ___ a bathroom upstairs.”", options: ["are", "is", "be"], answer: 1, explanation: "A bathroom está no singular, então usamos there is ou there’s." },
      { prompt: "Complete: “There ___ two chairs in the kitchen.”", options: ["is", "are", "am"], answer: 1, explanation: "Two chairs está no plural, então usamos there are." },
    ],
    takeaway: "There’s a ____ in the ____. There are ____ in the ____. My favorite room is ____.",
  },
  {
    id: "describing-a-room", slug: "describing-a-room", title: "Where is everything?", subtitle: "Explique onde estão as coisas.", objective: "Localizar objetos usando preposições de lugar simples.", duration: 8, focus: "Preposições de lugar",
    intro: "Descrever um espaço fica mais fácil quando você consegue localizar objetos. Imagine o quarto de uma personagem e observe como uma preposição muda a imagem na nossa cabeça.",
    phrases: [
      { english: "The lamp is on the desk.", portuguese: "A luminária está sobre a escrivaninha.", note: "On indica contato com uma superfície." },
      { english: "The shoes are under the bed.", portuguese: "Os sapatos estão debaixo da cama.", note: "Under indica que algo está abaixo de outra coisa." },
      { english: "The chair is between the desk and the window.", portuguese: "A cadeira está entre a escrivaninha e a janela.", note: "Between localiza algo no espaço entre duas referências." },
    ],
    grammar: { title: "In, on, under e next to", explanation: "Use in para dentro de um espaço, on para uma superfície, under para abaixo, next to para ao lado e between para entre duas coisas. A preposição vem antes da referência: under the bed.", examples: [{ english: "The books are in the bag.", portuguese: "Os livros estão dentro da bolsa." }, { english: "The clock is next to the door.", portuguese: "O relógio está ao lado da porta." }] },
    practice: [
      { prompt: "Os sapatos estão debaixo da cama. Complete: “The shoes are ___ the bed.”", options: ["on", "under", "between"], answer: 1, explanation: "Under significa debaixo de." },
      { prompt: "O relógio está ao lado da porta. Qual preposição usar?", options: ["next to", "in", "under"], answer: 0, explanation: "Next to significa ao lado de." },
    ],
    takeaway: "The ____ is on/in/under/next to/between the ____.",
  },
  {
    id: "home-tour-review", slug: "home-tour-review", title: "Come on in", subtitle: "Faça um pequeno tour por um lugar imaginário.", objective: "Combinar pessoas, cômodos e localização em uma descrição curta.", duration: 10, focus: "Revisão: pessoas, objetos e lugares",
    intro: "Uma boa descrição conduz a outra pessoa pelo espaço. Nesta revisão, conheça a casa fictícia de Alex e tente reconstruir o tour usando as pistas de cada frase.",
    phrases: [
      { english: "This is our apartment. There are two bedrooms.", portuguese: "Este é nosso apartamento. Há dois quartos.", note: "Our apresenta algo compartilhado; there are apresenta mais de uma coisa." },
      { english: "My sister’s room is next to the kitchen.", portuguese: "O quarto da minha irmã fica ao lado da cozinha.", note: "’s pode indicar posse: my sister’s room é o quarto da minha irmã." },
      { english: "Her books are on the desk, and her bag is under the chair.", portuguese: "Os livros dela estão na escrivaninha, e a bolsa está debaixo da cadeira.", note: "Her acompanha os objetos; on e under localizam cada um." },
      { english: "There’s a small balcony between the living room and my room.", portuguese: "Há uma varanda pequena entre a sala e meu quarto.", note: "There’s apresenta a varanda no singular; between usa dois lugares como referência." },
    ],
    grammar: { title: "Junte posse, existência e localização", explanation: "Use ’s para mostrar posse, there is/are para apresentar o que existe e uma preposição para localizar. Essas estruturas permitem descrever um espaço sem frases complicadas.", examples: [{ english: "My brother’s desk is in his room.", portuguese: "A escrivaninha do meu irmão fica no quarto dele." }, { english: "There are photos on the wall.", portuguese: "Há fotos na parede." }] },
    practice: [
      { prompt: "Complete: “There ___ two bedrooms in our apartment.”", options: ["is", "are", "be"], answer: 1, explanation: "Two bedrooms está no plural; use there are." },
      { prompt: "Complete: “Her bag is ___ the chair.” (a bolsa está debaixo)", options: ["under", "between", "on"], answer: 0, explanation: "Under indica que a bolsa está abaixo da cadeira." },
    ],
    takeaway: "This is my/our ____. There’s a ____ in the ____. The ____ is next to/under/on the ____.",
  },
];

export const a1ModuleFiveLessons: Lesson[] = [
  {
    id: "free-time-interests", slug: "free-time-interests", title: "What do you like to do?", subtitle: "Conte como gosta de passar o tempo livre.", objective: "Nomear atividades de lazer e dizer do que gosta ou não gosta.", duration: 9, focus: "Likes, dislikes e verbos com -ing",
    intro: "Descobrir o que alguém gosta de fazer é uma forma simples de encontrar interesses em comum. Pratique com atividades inventadas ou escolha algo que realmente combina com você.",
    phrases: [
      { english: "I like listening to music.", portuguese: "Gosto de ouvir música.", note: "Depois de like, é comum usar um verbo terminado em -ing para falar de uma atividade." },
      { english: "She loves playing tennis, but she doesn’t like running.", portuguese: "Ela adora jogar tênis, mas não gosta de correr.", note: "Love expressa gostar muito; don’t like expressa não gostar." },
      { english: "What do you do in your free time?", portuguese: "O que você faz no seu tempo livre?", note: "Free time é o tempo em que você não está trabalhando ou estudando." },
    ],
    grammar: { title: "Like + atividade", explanation: "Para falar de uma atividade que você gosta, use like/love/enjoy + verbo com -ing: I enjoy cooking. Para uma pessoa, use likes: He likes reading. Para perguntar, use What do you like doing?", examples: [{ english: "They enjoy watching films.", portuguese: "Eles gostam de assistir a filmes." }, { english: "Does Mia like dancing? — Yes, she does.", portuguese: "Mia gosta de dançar? — Sim." }] },
    practice: [
      { prompt: "Complete: “I like ___ to music.”", options: ["listen", "listening", "listens"], answer: 1, explanation: "Depois de like, use frequentemente o verbo em -ing: like listening." },
      { prompt: "Qual pergunta significa “O que você faz no seu tempo livre?”", options: ["What do you do in your free time?", "Where do your free time?", "What time do you free?"], answer: 0, explanation: "What do you do…? pergunta sobre atividades; in your free time significa no seu tempo livre." },
    ],
    takeaway: "I like ____ing. I love ____. I don’t like ____. What do you like doing?",
  },
  {
    id: "weekend-plans", slug: "weekend-plans", title: "A plan for Saturday", subtitle: "Convide alguém e combine um horário.", objective: "Fazer um convite simples, aceitar ou recusar com cordialidade.", duration: 9, focus: "Would you like to…? e convites",
    intro: "Um convite não precisa ser complicado. Diga a atividade, sugira um momento e deixe espaço para a outra pessoa responder com sinceridade.",
    phrases: [
      { english: "Would you like to see a film on Saturday?", portuguese: "Você gostaria de ver um filme no sábado?", note: "Would you like to…? é uma forma gentil de fazer um convite." },
      { english: "That sounds great! What time?", portuguese: "Parece ótimo! Que horas?", note: "That sounds great aceita o convite com entusiasmo." },
      { english: "Sorry, I can’t. Maybe next time.", portuguese: "Desculpe, não posso. Talvez na próxima.", note: "I can’t recusa de forma clara. Maybe next time mantém o tom amigável." },
    ],
    grammar: { title: "Convide com Would you like to…?", explanation: "Use Would you like to + verbo para convidar alguém. Para aceitar: I’d love to! Para recusar: Sorry, I can’t. Não é necessário explicar o motivo.", examples: [{ english: "Would you like to have coffee? — I’d love to.", portuguese: "Gostaria de tomar um café? — Adoraria." }, { english: "Would you like to come with us? — Sorry, I can’t.", portuguese: "Quer vir com a gente? — Desculpe, não posso." }] },
    practice: [
      { prompt: "Qual é um convite gentil para caminhar no parque?", options: ["Would you like to walk in the park?", "You like walk park?", "Would like you park walking?"], answer: 0, explanation: "A forma é Would you like to + verbo na forma base." },
      { prompt: "Você não pode ir, mas quer responder com cordialidade. O que diz?", options: ["No. Never.", "Sorry, I can’t. Maybe next time.", "I am Saturday."], answer: 1, explanation: "Sorry, I can’t recusa claramente; Maybe next time mantém a conversa amigável." },
    ],
    takeaway: "Would you like to ____ on ____? — I’d love to! / Sorry, I can’t. Maybe next time.",
  },
  {
    id: "weather-and-clothes", slug: "weather-and-clothes", title: "A change in the weather", subtitle: "Fale do tempo e escolha o que vestir.", objective: "Descrever condições simples do tempo e fazer uma sugestão prática.", duration: 8, focus: "It’s + clima e adjetivos",
    intro: "O tempo pode mudar os planos do dia. Aprenda frases curtas para comentar o clima e escolher roupas adequadas — úteis em conversas e viagens.",
    phrases: [
      { english: "It’s sunny and warm today.", portuguese: "Está ensolarado e agradável hoje.", note: "Em inglês, use it’s antes da descrição do tempo: it is sunny." },
      { english: "It’s cold and windy. Take a jacket.", portuguese: "Está frio e ventando. Leve uma jaqueta.", note: "Cold é frio; windy é com vento. Take a jacket é uma sugestão curta." },
      { english: "Is it raining? — Yes, take an umbrella.", portuguese: "Está chovendo? — Sim, leve um guarda-chuva.", note: "Para perguntar sobre o tempo, coloque is antes de it: Is it raining?" },
    ],
    grammar: { title: "Descreva o tempo com It’s…", explanation: "Para falar do clima, use It’s + adjetivo: It’s cloudy. Para ações acontecendo agora, use It’s + verbo com -ing: It’s raining. Uma sugestão curta pode começar com o verbo: Take an umbrella.", examples: [{ english: "It’s snowing. Wear a warm coat.", portuguese: "Está nevando. Vista um casaco quente." }, { english: "It’s hot and sunny.", portuguese: "Está quente e ensolarado." }] },
    practice: [
      { prompt: "Complete: “___ cold today. Take a coat.”", options: ["It’s", "There", "They’re"], answer: 0, explanation: "Para descrever o clima, use It’s + adjetivo: It’s cold." },
      { prompt: "Está chovendo. Qual sugestão é adequada?", options: ["Take an umbrella.", "Turn left.", "Order a sandwich."], answer: 0, explanation: "Umbrella é guarda-chuva; levar um é uma sugestão adequada quando chove." },
    ],
    takeaway: "It’s ____ today. Take/Wear ____. Is it raining?",
  },
  {
    id: "making-simple-suggestions", slug: "making-simple-suggestions", title: "Shall we go?", subtitle: "Sugira uma atividade e descubra o que o outro prefere.", objective: "Sugerir uma atividade e responder com uma preferência simples.", duration: 8, focus: "Let’s, why don’t we e respostas",
    intro: "Quando duas pessoas têm tempo livre, alguém precisa dar o primeiro passo. Sugestões curtas ajudam a transformar “vamos fazer algo” em um plano concreto.",
    phrases: [
      { english: "Let’s go to the park.", portuguese: "Vamos ao parque.", note: "Let’s + verbo faz uma sugestão inclusiva: a pessoa que fala também participa." },
      { english: "Why don’t we get some lunch?", portuguese: "Que tal almoçarmos?", note: "Why don’t we…? é uma pergunta usada para sugerir algo, não para criticar." },
      { english: "Good idea! How about at noon?", portuguese: "Boa ideia! Que tal ao meio-dia?", note: "How about + horário sugere quando. Também pode vir seguido de uma atividade com -ing." },
    ],
    grammar: { title: "Duas formas de sugerir", explanation: "Use Let’s + verbo base ou Why don’t we + verbo base? para propor algo. Responda com Good idea, I’d love to ou Maybe another day. Para sugerir horário, use How about + horário?", examples: [{ english: "Let’s have lunch at one.", portuguese: "Vamos almoçar à uma." }, { english: "Why don’t we meet after work?", portuguese: "Que tal nos encontrarmos depois do trabalho?" }] },
    practice: [
      { prompt: "Complete uma sugestão: “Let’s ___ a walk.”", options: ["taking", "take", "takes"], answer: 1, explanation: "Depois de Let’s, use o verbo na forma base: Let’s take a walk." },
      { prompt: "Qual resposta aceita a sugestão “Why don’t we get lunch?”", options: ["Good idea!", "It’s under the bed.", "I’m from Brazil."], answer: 0, explanation: "Good idea! aceita naturalmente uma sugestão." },
    ],
    takeaway: "Let’s ____! / Why don’t we ____? — Good idea! How about ____?",
  },
  {
    id: "meetup-review", slug: "meetup-review", title: "See you this weekend", subtitle: "Combine interesses, clima e um plano simples.", objective: "Participar de uma conversa curta para escolher uma atividade e combinar um horário.", duration: 10, focus: "Revisão: preferências, convites e clima",
    intro: "Nesta missão final, duas amigas escolhem o que fazer no sábado. Observe como cada pergunta revela uma preferência e como o clima ajuda a fechar o plano.",
    phrases: [
      { english: "Do you like outdoor activities?", portuguese: "Você gosta de atividades ao ar livre?", note: "Do you like…? pergunta sobre preferências com you." },
      { english: "I love walking, but it’s rainy today.", portuguese: "Adoro caminhar, mas hoje está chuvoso.", note: "But contrasta a preferência com a condição do tempo." },
      { english: "Why don’t we see a film? — Good idea. Let’s meet at two.", portuguese: "Que tal vermos um filme? — Boa ideia. Vamos nos encontrar às duas.", note: "A sugestão começa com Why don’t we; o plano fica concreto ao combinar horário." },
      { english: "Would you like to get coffee after the film? — I’d love to!", portuguese: "Você gostaria de tomar um café depois do filme? — Adoraria!", note: "Would you like to…? convida; I’d love to aceita com entusiasmo." },
    ],
    grammar: { title: "Do interesse ao plano", explanation: "Pergunte Do you like…? para descobrir interesses; use but para mostrar contraste; proponha com Let’s ou Why don’t we; feche o convite com um horário ou lugar específico.", examples: [{ english: "I like films. Let’s go on Saturday.", portuguese: "Gosto de filmes. Vamos no sábado." }, { english: "It’s windy, so let’s meet inside.", portuguese: "Está ventando, então vamos nos encontrar dentro." }] },
    practice: [
      { prompt: "Está chovendo, então vocês preferem uma atividade em lugar fechado. Qual plano faz sentido?", options: ["Let’s see a film.", "Let’s walk in the rain without a coat.", "Let’s go swimming in the street."], answer: 0, explanation: "See a film é uma atividade em local fechado e combina com um dia chuvoso." },
      { prompt: "Convide alguém para tomar café depois do filme. Qual frase está correta?", options: ["Would you like to get coffee after the film?", "You like coffee after film would?", "Would you coffee get film?"], answer: 0, explanation: "Use Would you like to + verbo para convidar, seguido do momento: after the film." },
    ],
    takeaway: "Do you like ____? It’s ____, so let’s ____. Would you like to ____? See you ____!",
  },
];

export const a1Modules: A1Module[] = [
  { id: "first-conversations", title: "Primeiras conversas", subtitle: "Cumprimente, apresente-se e conheça alguém em inglês.", lessons: a1ModuleOneLessons },
  { id: "who-i-am-my-day", title: "Quem sou e como é meu dia", subtitle: "Converse sobre lugares, números e atividades do cotidiano.", lessons: a1ModuleTwoLessons },
  { id: "around-town", title: "No bairro e à mesa", subtitle: "Peça algo em um café, pergunte direções e explore a cidade.", lessons: a1ModuleThreeLessons },
  { id: "people-and-places", title: "Pessoas e lugares", subtitle: "Fale das pessoas importantes e descreva um lugar familiar.", lessons: a1ModuleFourLessons },
  { id: "free-time-and-plans", title: "Tempo livre e planos", subtitle: "Compartilhe interesses, convide alguém e combine uma atividade.", lessons: a1ModuleFiveLessons },
];

import { nextA1Modules, a2Modules as initialA2Modules } from "@/lib/next-lessons";
export { nextA1Modules };
import { a2FinalModules } from "@/lib/next-a2-final-lessons";
import { b1Modules } from "@/lib/next-b1-lessons";
import { b2Modules } from "@/lib/next-b2-lessons";
import { c1Modules } from "@/lib/next-c1-lessons";
import { c1FinalLessons } from "@/lib/next-c1-final-lessons";
import { c1CapstoneLessons } from "@/lib/next-c1-capstone-lessons";
import { c2Modules } from "@/lib/next-c2-lessons";
export { c2Modules };

a1Modules.push(...nextA1Modules);
export const a2Modules: A1Module[] = initialA2Modules
  .filter((module) => module.id !== "a2-home-and-community" && module.id !== "a2-project-and-review")
  .map((module) => module.id === "people-community"
    ? { ...module, lessons: [...module.lessons, ...(a2FinalModules.find((candidate) => candidate.id === "a2-home-and-community")?.lessons ?? [])] }
    : module)
  .concat(a2FinalModules.filter((module) => module.id === "a2-project-and-review"));
export const a2Lessons: Lesson[] = a2Modules.flatMap((module) => module.lessons);
export const a1Lessons: Lesson[] = a1Modules.flatMap((module) => module.lessons);
export const c1PublishedModules: A1Module[] = [
  c1Modules[0],
  { ...c1Modules[1], lessons: [...c1Modules[1].lessons.slice(0, 6), ...c1FinalLessons.slice(0, 4)] },
  { id: "c1-capstone", title: "Projeto crítico C1", subtitle: "Produza uma análise e defenda uma recomendação original.", lessons: [...c1FinalLessons.slice(4), ...c1CapstoneLessons] },
];
export { b1Modules, b2Modules, c1Modules };


export type PublicationState = "available" | "comingSoon";
export type PlannedLesson = {
  id: string;
  slug: string;
  title: string;
  objective: string;
  status: PublicationState;
};
export type CourseChapter = { id: string; title: string; objective: string; lessons: PlannedLesson[] };
export type CourseModule = { id: string; title: string; objective: string; chapters: CourseChapter[] };
export type CourseLevel = { code: string; modules: CourseModule[] };

function planLessons(entries: Array<[string, string, string]>): PlannedLesson[] {
  return entries.map(([slug, title, objective]) => ({ id: slug, slug, title, objective, status: "comingSoon" }));
}

const chapter = (id: string, title: string, objective: string, entries: Array<[string, string, string]>): CourseChapter => ({ id, title, objective, lessons: planLessons(entries) });
const modulePlan = (id: string, title: string, objective: string, chapters: CourseChapter[]): CourseModule => ({ id, title, objective, chapters });

export const courseRoadmap: CourseLevel[] = [
  { code: "A1", modules: [
    modulePlan("first-conversations", "Primeiras conversas", "Cumprimente, apresente-se e conheça alguém em inglês.", [
      chapter("greetings-and-introductions", "Cumprimentos e apresentações", "Inicie uma conversa e compartilhe informações básicas.", [
        ["hello-new-world", "Hello, new world", "Comece uma conversa com confiança."], ["greetings-by-time", "A greeting for every moment", "Escolha a saudação que combina com a hora."], ["my-name-is", "Say your name", "Apresente-se de forma natural."],
      ]),
      chapter("origins-and-first-dialogue", "Origens e primeiro diálogo", "Pergunte de onde alguém vem e reúna as primeiras frases.", [
        ["where-are-you-from", "Where are you from?", "Fale de onde você vem e demonstre interesse."], ["first-conversation-review", "Your first conversation", "Junte as peças em um diálogo completo."],
      ]),
    ]),
    modulePlan("who-i-am-my-day", "Quem sou e como é meu dia", "Converse sobre lugares, números e atividades do cotidiano.", [
      chapter("places-and-numbers", "Lugares e números", "Fale de países, nacionalidades e informações simples.", [
        ["countries-and-nationalities", "A map of many stories", "Fale sobre lugares e nacionalidades."], ["numbers-and-age", "Numbers that matter", "Conte, pergunte e responda com números."],
      ]),
      chapter("routines-and-time", "Rotina e horários", "Descreva hábitos e combine atividades no tempo.", [
        ["everyday-routines", "A day in motion", "Conte o que você faz todos os dias."], ["days-and-times", "When does it happen?", "Combine dias da semana e horários."], ["my-day-review", "A day, your way", "Conte sobre um dia comum em poucas frases."],
      ]),
    ]),
    modulePlan("around-town", "No bairro e à mesa", "Peça algo em um café, pergunte direções e explore a cidade.", [
      chapter("at-the-cafe", "No café", "Faça pedidos educados e pergunte valores.", [
        ["ordering-at-a-cafe", "A table for two", "Peça algo para comer com educação."], ["prices-and-paying", "How much is it?", "Pergunte o preço e pague com clareza."],
      ]),
      chapter("finding-your-way", "Encontrando o caminho", "Peça direções e escolha como chegar.", [
        ["asking-for-directions", "Which way is the station?", "Pergunte onde fica um lugar e entenda instruções."], ["getting-around-town", "Getting around town", "Diga como você vai de um lugar a outro."], ["city-errand-review", "One afternoon in town", "Combine pedido, pagamento e direções."],
      ]),
    ]),
    modulePlan("people-and-places", "Pessoas e lugares", "Fale das pessoas importantes e descreva um lugar familiar.", [
      chapter("people-and-belongings", "Pessoas e objetos", "Apresente pessoas e diga a quem pertencem as coisas.", [
        ["family-and-friends", "People in my life", "Apresente pessoas importantes para você."], ["things-i-own", "What’s in your bag?", "Fale de objetos pessoais e pergunte a quem pertencem."],
      ]),
      chapter("home-and-rooms", "Casa e cômodos", "Descreva sua casa e localize objetos.", [
        ["rooms-at-home", "A place to call home", "Nomeie cômodos e diga o que existe em um espaço."], ["describing-a-room", "Where is everything?", "Explique onde estão as coisas."], ["home-tour-review", "Come on in", "Combine pessoas, cômodos e localização."],
      ]),
    ]),
    modulePlan("free-time-and-plans", "Tempo livre e planos", "Compartilhe interesses, convide alguém e combine uma atividade.", [
      chapter("interests-and-weekends", "Interesses e fim de semana", "Fale do que gosta e faça convites simples.", [
        ["free-time-interests", "What do you like to do?", "Conte como gosta de passar o tempo livre."], ["weekend-plans", "A plan for Saturday", "Convide alguém e combine um horário."],
      ]),
      chapter("weather-and-suggestions", "Clima e sugestões", "Use o tempo para escolher uma atividade juntos.", [
        ["weather-and-clothes", "A change in the weather", "Fale do tempo e escolha o que vestir."], ["making-simple-suggestions", "Shall we go?", "Sugira uma atividade e descubra o que o outro prefere."], ["meetup-review", "See you this weekend", "Combine interesses, clima e um plano simples."],
      ]),
    ]),
    modulePlan("food-and-shopping", "Comida e compras", "Escolha alimentos, faça compras e fale de quantidades.", [
      chapter("food-and-preferences", "Comidas e preferências", "Nomeie alimentos e diga o que costuma escolher.", [
        ["food-on-the-table", "What’s for lunch?", "Nomeie comidas e pergunte o que há para o almoço."], ["like-it-or-not", "Do you like spicy food?", "Pergunte e responda sobre preferências alimentares."], ["at-the-market", "A basket at the market", "Encontre alimentos e peça itens em uma feira."],
      ]),
      chapter("quantities-and-review", "Quantidades e revisão", "Peça quantidades e pratique uma compra completa.", [
        ["how-much-how-many", "How much or how many?", "Pergunte sobre quantidades contáveis e não contáveis."], ["shopping-list", "A list for the week", "Faça uma lista curta e confira o que falta."], ["market-day-review", "A morning at the market", "Complete uma compra com perguntas e quantidades."],
      ]),
    ]),
    modulePlan("work-and-study", "Estudo e trabalho", "Fale sobre ocupações, tarefas e espaços de aprendizagem.", [
      chapter("jobs-and-places", "Profissões e lugares", "Nomeie profissões e diga onde as pessoas trabalham.", [
        ["what-do-you-do", "What do you do?", "Pergunte sobre ocupações e responda com frases simples."], ["where-we-work", "At work or at school", "Fale de locais de trabalho e estudo."], ["a-typical-workday", "A busy day", "Descreva tarefas comuns em um dia de trabalho."],
      ]),
      chapter("skills-and-review", "Habilidades e revisão", "Fale do que sabe fazer e reúna o vocabulário do módulo.", [
        ["can-and-cant", "Things I can do", "Diga o que consegue fazer usando can e can’t."], ["study-tools", "Ready to learn", "Nomeie materiais e ferramentas de estudo."], ["my-week-review", "A week in my life", "Conte sobre estudo, trabalho e rotina."],
      ]),
    ]),
    modulePlan("health-and-help", "Saúde e ajuda", "Descreva necessidades básicas e peça ajuda com clareza.", [
      chapter("body-and-feeling", "Corpo e bem-estar", "Nomeie partes do corpo e descreva como se sente.", [
        ["how-do-you-feel", "How are you feeling?", "Descreva sensações simples e pergunte como alguém está."], ["at-the-pharmacy", "At the pharmacy", "Peça um item básico e compreenda uma pergunta simples."], ["everyday-healthy-habits", "Small healthy habits", "Fale de hábitos que ajudam no dia a dia."],
      ]),
      chapter("asking-for-help", "Pedindo ajuda", "Explique uma necessidade e pratique uma conversa de apoio.", [
        ["please-help-me", "Could you help me?", "Peça ajuda de maneira cordial."], ["emergency-basics", "If you need help", "Reconheça frases essenciais para pedir assistência."], ["wellbeing-review", "Feeling better", "Reúna vocabulário de saúde e pedidos de ajuda."],
      ]),
    ]),
    modulePlan("travel-and-review", "Viagens e revisão A1", "Prepare-se para uma viagem simples e reúna os aprendizados do A1.", [
      chapter("travel-basics", "Primeiros passos da viagem", "Fale de destinos, hospedagem e informações necessárias.", [
        ["at-the-airport", "At the airport", "Encontre lugares e siga instruções curtas no aeroporto."], ["checking-in", "A room for one night", "Faça um check-in simples em uma hospedagem."], ["simple-travel-questions", "A few useful questions", "Peça informações essenciais durante uma viagem."],
      ]),
      chapter("a1-capstone", "Projeto de revisão A1", "Use frases A1 para resolver uma sequência de situações cotidianas.", [
        ["travel-day-review", "A day away", "Combine transporte, hospedagem, alimentação e horários."], ["a1-conversation-project", "My English introduction", "Prepare uma apresentação pessoal curta em inglês."], ["a1-final-review", "Ready for the next step", "Revise objetivos e decida o próximo passo de aprendizagem."],
      ]),
    ]),
  ] },
  { code: "A2", modules: [
    modulePlan("stories-from-my-life", "Histórias da minha vida", "Conte experiências passadas e fale de planos próximos.", [
      chapter("past-and-memories", "Passado e lembranças", "Descreva experiências e eventos com referências de tempo.", [["last-weekend", "Last weekend", "Conte o que fez no fim de semana passado."], ["a-special-day", "A day to remember", "Organize acontecimentos simples no passado."], ["childhood-memories", "When I was younger", "Compare uma lembrança antiga com sua vida atual."], ["past-questions", "What happened?", "Faça perguntas básicas sobre eventos passados."], ["stories-review", "A little story", "Una eventos e marcadores de tempo em uma narrativa curta."]]),
      chapter("plans-and-experiences", "Planos e experiências", "Fale de planos, viagens e experiências pessoais.", [["plans-for-next-month", "Plans for next month", "Explique planos usando going to."], ["travel-experiences", "Have you been there?", "Pergunte sobre experiências de viagem."], ["making-arrangements", "Let’s make a plan", "Combine datas, horários e atividades."], ["what-i-have-done", "Things I’ve tried", "Introduza experiências com present perfect em situações comuns."], ["my-life-so-far", "A story so far", "Conecte experiências passadas a planos futuros."]]),
    ]),
    modulePlan("everyday-independence", "Mais autonomia no dia a dia", "Resolva situações de serviço, compras, saúde e deslocamento.", [
      chapter("services-and-shopping", "Serviços e compras", "Compare opções, quantidades e necessidades.", [["finding-the-right-size", "Does it fit?", "Pergunte sobre tamanhos e ajuste de roupas."], ["returns-and-receipts", "Can I return this?", "Converse sobre recibos e trocas simples."], ["at-the-post-office", "Sending a package", "Peça informações sobre envio e entrega."], ["booking-an-appointment", "A time that works", "Marque um compromisso e proponha outro horário."], ["services-review", "Getting things done", "Pratique pequenas conversas para resolver tarefas."]]),
      chapter("describing-problems", "Descrevendo problemas", "Explique o que aconteceu e peça uma solução.", [["something-is-wrong", "There’s a problem", "Descreva um problema simples com um serviço ou objeto."], ["at-the-doctors", "A doctor’s appointment", "Explique sintomas básicos e responda perguntas."], ["directions-in-detail", "Around the neighborhood", "Compreenda instruções de percurso mais completas."], ["explaining-what-happened", "It stopped working", "Conte como um objeto deixou de funcionar."], ["a2-practical-review", "A day of errands", "Resolva uma sequência de tarefas fora de casa."]]),
    ]),
    modulePlan("people-community", "Pessoas e comunidade", "Descreva relações, lugares e acontecimentos de sua comunidade.", [
      chapter("people-and-personality", "Pessoas e personalidade", "Descreva aparência, personalidade e relações.", [["describing-people", "A friend of mine", "Descreva alguém usando adjetivos comuns."], ["getting-along", "We get along well", "Fale de relações e atividades em comum."], ["community-places", "A place near home", "Descreva serviços e espaços de um bairro."], ["invitations-and-events", "Are you coming?", "Responda a convites para eventos e celebrações."], ["people-review", "People around us", "Junte descrições de pessoas, lugares e relações."]]),
      chapter("home-and-community", "Casa e comunidade", "Fale de moradia, regras e tarefas compartilhadas.", [["moving-house", "A new place to live", "Descreva opções simples de moradia."], ["sharing-a-home", "Whose turn is it?", "Combine tarefas domésticas e responsabilidades."], ["community-events", "What’s happening this week?", "Descubra eventos e atividades locais."], ["being-a-good-neighbor", "A helpful neighbor", "Faça pedidos e ofereça ajuda na vizinhança."], ["a2-community-project", "My neighborhood guide", "Crie uma descrição curta de um lugar da comunidade."]]),
    ]),
    modulePlan("a2-project-and-review", "Projeto e revisão A2", "Integre narrativas, planos e situações práticas.", [
      chapter("telling-a-longer-story", "Contando uma história", "Organize início, acontecimentos e resultado.", [["first-then-finally", "First, then, finally", "Ordene eventos usando conectores de sequência."], ["a-surprising-day", "Something unexpected", "Conte uma história simples com um imprevisto."], ["asking-follow-up-questions", "Tell me more", "Mantenha uma conversa com perguntas de acompanhamento."], ["storytelling-practice", "A story in five moments", "Prepare uma narrativa curta com começo e conclusão."], ["a2-story-review", "A story worth sharing", "Revise tempos passados e conectores narrativos."]]),
      chapter("a2-capstone", "Projeto de autonomia A2", "Use inglês para planejar uma viagem curta e resolver mudanças.", [["plan-a-short-trip", "A weekend away", "Planeje transporte, hospedagem e atividades."], ["when-plans-change", "A change of plan", "Explique uma mudança e proponha alternativas."], ["travel-roleplay", "From booking to check-in", "Pratique etapas de uma viagem curta."], ["a2-speaking-project", "My next adventure", "Apresente planos e preferências em uma fala guiada."], ["a2-final-review", "Ready for B1", "Revise objetivos A2 e identifique próximos passos."]]),
    ]),
  ] },
  { code: "B1", modules: [
    modulePlan("independent-communication", "Comunicação independente", "Construa relatos, opiniões e conversas mais sustentadas.", [
      chapter("experiences-and-change", "Experiências e mudanças", "Relacione eventos, mudanças e aprendizados.", [["a-turning-point", "A turning point", "Conte uma experiência que mudou uma decisão."], ["before-and-after", "Before and after", "Compare hábitos e situações em dois momentos."], ["learning-from-mistakes", "What I learned", "Explique um erro e o que aprendeu com ele."], ["life-experiences-interview", "Have you ever...?", "Faça perguntas sobre experiências de vida."], ["change-and-growth", "How things have changed", "Relacione passado, presente e mudança gradual."]]),
      chapter("work-study-and-goals", "Trabalho, estudo e objetivos", "Explique responsabilidades e metas pessoais.", [["my-role-at-work", "What I’m responsible for", "Descreva responsabilidades profissionais ou de estudo."], ["setting-a-goal", "One step at a time", "Defina uma meta e passos para alcançá-la."], ["solving-a-work-problem", "Let’s find a solution", "Proponha opções para um problema de rotina."], ["asking-for-feedback", "How am I doing?", "Peça e compreenda feedback simples."], ["career-conversation", "Where do you see yourself?", "Fale de objetivos futuros com exemplos."]]),
    ]),
    modulePlan("opinions-and-culture", "Opiniões e cultura", "Participe de conversas sobre mídia, comunidade e escolhas.", [
      chapter("media-and-entertainment", "Mídia e entretenimento", "Comente histórias e compare formatos culturais.", [["a-book-worth-reading", "A book worth reading", "Recomende uma leitura com razões claras."], ["films-and-series", "What makes a good story?", "Compare personagens, gêneros e narrativas."], ["news-and-perspectives", "Two sides of the story", "Resuma uma notícia e diferencie fatos de opinião."], ["online-habits", "Life online", "Converse sobre hábitos e limites digitais."], ["culture-club", "A conversation about culture", "Sustente uma opinião em uma conversa cultural."]]),
      chapter("community-and-environment", "Comunidade e ambiente", "Descreva questões locais e alternativas práticas.", [["a-better-neighborhood", "Small changes nearby", "Sugira melhorias para um espaço comunitário."], ["everyday-sustainability", "Choices that add up", "Explique hábitos de consumo e seus efeitos."], ["local-volunteering", "Giving time", "Fale de voluntariado e participação local."], ["comparing-solutions", "Which option works best?", "Compare alternativas para uma necessidade comum."], ["community-project", "A proposal for our town", "Apresente uma proposta comunitária com justificativas."]]),
    ]),
    modulePlan("b1-stories-and-capstone", "Narrativas e projeto B1", "Organize argumentos curtos e apresente um projeto pessoal.", [
      chapter("stories-that-connect", "Histórias que conectam", "Conte relatos detalhados e reaja ao relato de outra pessoa.", [["an-unexpected-journey", "An unexpected journey", "Conte uma viagem com um desafio e uma solução."], ["a-person-who-inspired-me", "Someone who inspired me", "Apresente uma pessoa e explique sua influência."], ["telling-a-funny-story", "You won’t believe what happened", "Construa uma narrativa informal com reações."], ["keeping-the-conversation-going", "And what happened next?", "Use perguntas e comentários para manter o diálogo."], ["story-circle", "A story in a circle", "Participe de uma narrativa colaborativa guiada."]]),
      chapter("b1-capstone", "Projeto de comunicação B1", "Planeje uma proposta, dê razões e responda perguntas.", [["choose-a-real-world-issue", "A problem worth solving", "Defina um problema próximo e identifique quem afeta."], ["research-and-organize", "Gathering useful information", "Agrupe informações em tópicos e exemplos."], ["make-a-clear-proposal", "A practical proposal", "Apresente uma solução com etapas e benefícios."], ["present-and-answer", "Your idea, clearly", "Apresente uma ideia e responda perguntas de esclarecimento."], ["b1-final-reflection", "My next language goals", "Avalie habilidades e estabeleça objetivos para B2."]]),
    ]),
  ] },
  { code: "B2", modules: [
    modulePlan("confident-discussion", "Discussão com confiança", "Defenda posições e compare evidências em temas familiares.", [
      chapter("building-an-argument", "Construindo um argumento", "Apresente uma tese, evidências e contrapontos.", [["claim-and-evidence", "A claim needs evidence", "Separe opinião, exemplo e evidência."], ["agreeing-with-nuance", "I see your point, but…", "Concorde parcialmente e apresente uma ressalva."], ["responding-to-counterarguments", "Another way to look at it", "Reconheça e responda a um contraponto."], ["reliable-sources", "Can we trust this source?", "Avalie sinais de confiabilidade em uma fonte."], ["structured-debate", "A respectful debate", "Construa um argumento oral em turnos claros."]]),
      chapter("society-and-technology", "Sociedade e tecnologia", "Analise efeitos de mudanças sociais e tecnológicas.", [["technology-at-work", "Working with new tools", "Compare benefícios e limites de uma ferramenta."], ["privacy-and-convenience", "What do we trade for convenience?", "Debata conveniência, privacidade e escolhas."], ["cities-of-the-future", "A city worth living in", "Proponha melhorias urbanas sustentáveis."], ["changing-workplaces", "How work is changing", "Explique tendências e possíveis consequências."], ["media-literacy", "Reading beyond the headline", "Analise enquadramento e intenção em mídia."]]),
    ]),
    modulePlan("professional-communication", "Comunicação profissional", "Escreva e fale com clareza em situações de estudo e trabalho.", [
      chapter("meetings-and-decisions", "Reuniões e decisões", "Participe de discussões e registre decisões.", [["opening-a-meeting", "Let’s get started", "Inicie uma reunião com objetivo e pauta."], ["clarifying-a-point", "Could you clarify?", "Peça esclarecimento sem interromper o fluxo."], ["summarizing-decisions", "What we’ve agreed", "Resuma decisões, responsáveis e prazos."], ["handling-disagreement", "Let’s find common ground", "Negocie divergências com respeito."], ["meeting-simulation", "A decision to make", "Conduza uma simulação de reunião com decisão final."]]),
      chapter("writing-for-work", "Escrita para o trabalho", "Escolha tom e estrutura para mensagens profissionais.", [["a-clear-professional-email", "The email that gets to the point", "Escreva um e-mail objetivo com pedido claro."], ["polite-follow-ups", "Following up thoughtfully", "Acompanhe uma solicitação sem soar ríspido."], ["explaining-a-delay", "A quick update", "Explique atraso, impacto e próximo passo."], ["short-report-structure", "A report in three parts", "Organize síntese, evidências e recomendação."], ["editing-for-tone", "Same message, different tone", "Revise formalidade e clareza para o público."]]),
    ]),
    modulePlan("b2-project-and-review", "Projeto e revisão B2", "Produza uma recomendação fundamentada e apresente-a com segurança.", [
      chapter("problem-solving", "Resolução de problemas", "Explore causas, limites e critérios de sucesso.", [["define-the-problem", "What are we really solving?", "Delimite um problema e evite confundir causas e sintomas."], ["compare-possible-options", "Three options on the table", "Compare opções usando critérios explícitos."], ["risks-and-trade-offs", "Every choice has a cost", "Explique riscos e compensações de uma decisão."], ["recommend-with-evidence", "The case for this option", "Recomende uma alternativa com evidências."], ["decision-workshop", "Choosing a way forward", "Facilite uma decisão com perspectivas diferentes."]]),
      chapter("b2-capstone", "Projeto de comunicação B2", "Entregue uma apresentação e um texto de recomendação.", [["choose-a-question", "A question worth investigating", "Defina uma pergunta que possa ser investigada."], ["organize-evidence", "From notes to a clear case", "Selecione evidências relevantes e reconheça limitações."], ["write-a-recommendation", "A recommendation people can use", "Escreva uma recomendação orientada a decisões."], ["present-to-an-audience", "Make the case", "Adapte uma apresentação ao público e ao tempo disponível."], ["b2-final-review", "Communicating with range", "Revise competências B2 e próximos objetivos."]]),
    ]),
  ] },
  { code: "C1", modules: [
    modulePlan("precision-and-register", "Precisão e registro", "Adapte linguagem, ênfase e estrutura a públicos diferentes.", [
      chapter("register-and-intent", "Registro e intenção", "Interprete subtexto e escolha o tom adequado.", [["formal-or-familiar", "A question of register", "Ajuste formalidade sem perder naturalidade."], ["softening-a-position", "A more measured view", "Apresente desacordo com ressalvas bem calibradas."], ["reading-between-the-lines", "What is implied?", "Identifique pressupostos e implicações em textos."], ["irony-and-understatement", "Not quite what it seems", "Interprete ironia e eufemismo em contexto."], ["tone-revision-studio", "One idea, three audiences", "Reescreva uma mensagem para públicos distintos."]]),
      chapter("complex-ideas", "Ideias complexas", "Sintetize argumentos longos e explique relações entre ideias.", [["synthesizing-multiple-sources", "A coherent synthesis", "Integre fontes sem repetir a estrutura delas."], ["cause-correlation-and-claims", "What the data can say", "Distinga causalidade, correlação e afirmação."], ["explaining-uncertainty", "What we know and don’t", "Comunique limites e graus de confiança."], ["leading-a-deep-discussion", "Questions that open a discussion", "Conduza uma conversa com perguntas analíticas."], ["c1-argument-lab", "Precision under pressure", "Defenda uma ideia complexa em resposta a objeções."]]),
    ]),
    modulePlan("academic-and-professional-c1", "Inglês acadêmico e profissional", "Leia criticamente, escreva com rigor e apresente análises.", [
      chapter("research-and-writing", "Pesquisa e escrita", "Estruture análise e atribua corretamente as ideias.", [["research-question-and-scope", "A question with a clear scope", "Transforme um tema amplo em pergunta delimitada."], ["integrating-sources-responsibly", "Working with sources", "Parafraseie, sintetize e atribua ideias com precisão."], ["argument-structure", "A line of reasoning", "Organize tese, evidência, ressalvas e conclusão."], ["editing-for-cohesion", "A text that holds together", "Revise coesão, referências e progressão argumentativa."], ["c1-written-analysis", "An analytical response", "Escreva uma análise articulada com fontes diversas."]]),
      chapter("presentations-and-negotiation", "Apresentações e negociação", "Apresente uma posição e negocie sem perder precisão.", [["opening-a-complex-presentation", "The question behind the topic", "Apresente o problema e a relevância para o público."], ["handling-challenging-questions", "Let me qualify that", "Responda perguntas difíceis sem exagerar conclusões."], ["negotiating-priorities", "What matters most?", "Negocie prioridades, restrições e alternativas."], ["facilitating-a-workshop", "Bringing different voices together", "Facilite uma discussão com participação equilibrada."], ["c1-professional-simulation", "A decision with consequences", "Simule uma apresentação seguida de negociação."]]),
    ]),
    modulePlan("c1-capstone", "Projeto crítico C1", "Produza uma análise e defenda uma recomendação original.", [
      chapter("critical-inquiry", "Investigação crítica", "Avalie perspectivas e evidências em uma questão atual.", [["frame-a-debatable-question", "A question with real stakes", "Formule uma pergunta com perspectivas legítimas."], ["evaluate-evidence-and-bias", "Evidence, incentives and bias", "Avalie evidência, incentivos e possíveis vieses."], ["map-perspectives", "More than two sides", "Mapeie convergências e tensões entre perspectivas."], ["build-a-nuanced-position", "A position with qualifications", "Construa uma tese nuançada e reconheça limites."], ["c1-critical-discussion", "An informed exchange", "Sustente e revise posições em discussão crítica."]]),
      chapter("c1-final-project", "Projeto final C1", "Apresente uma análise multimodal e reflita sobre precisão.", [["design-the-final-inquiry", "From curiosity to inquiry", "Planeje questão, fontes e método de análise."], ["write-the-synthesis", "A synthesis with a point of view", "Escreva síntese fundamentada com posicionamento explícito."], ["present-the-findings", "Make complexity understandable", "Apresente achados sem apagar ressalvas importantes."], ["respond-and-revise", "Questions that improve the work", "Use perguntas para revisar argumentos e conclusões."], ["c1-final-reflection", "Precision, purpose and next steps", "Avalie registro, clareza e próximos desafios."]]),
    ]),
  ] },
  { code: "C2", modules: [
    modulePlan("mastery-and-nuance", "Domínio e nuance", "Interprete nuances e escolha recursos expressivos com precisão.", [
      chapter("style-and-voice", "Estilo e voz", "Controle ritmo, ênfase e escolha lexical em diferentes gêneros.", [["rhythm-and-emphasis", "The shape of a sentence", "Use ritmo e ênfase para orientar a interpretação."], ["metaphor-and-framing", "The frame changes the view", "Analise metáforas e seus efeitos argumentativos."], ["humor-and-double-meaning", "A second meaning", "Interprete humor, ambiguidade e duplo sentido."], ["voice-across-genres", "One voice, different genres", "Adapte voz autoral entre gêneros e públicos."], ["style-imitation-with-purpose", "Borrowing a style consciously", "Reconheça e pratique convenções estilísticas com intenção."]]),
      chapter("language-in-context", "Linguagem em contexto", "Analise variação, identidade e escolhas pragmáticas.", [["dialect-and-identity", "Many Englishes", "Discuta variação sem tratar um sotaque como padrão universal."], ["pragmatics-and-face", "What a request does", "Analise relações, intenção e cortesia em pedidos."], ["translation-loss-and-choice", "What cannot be carried over", "Compare escolhas de tradução e perdas de nuance."], ["language-and-power", "Words and influence", "Examine como escolhas linguísticas distribuem autoridade."], ["c2-contextual-reading", "A text in its moment", "Interprete um texto em seu contexto cultural e histórico."]]),
    ]),
    modulePlan("expert-communication", "Comunicação especializada", "Lidere conversas complexas e comunique incertezas com rigor.", [
      chapter("leading-complex-dialogue", "Liderando diálogos complexos", "Mantenha clareza em debates com pressupostos divergentes.", [["surface-hidden-assumptions", "The premise beneath the argument", "Identifique premissas ocultas sem reduzir a posição alheia."], ["disagree-with-care", "A rigorous disagreement", "Conteste uma ideia com precisão e respeito."], ["repairing-misunderstandings", "Let’s recalibrate", "Repare mal-entendidos e confirme interpretações."], ["facilitating-conflict", "Productive tension", "Facilite divergência sem forçar consenso artificial."], ["c2-dialogue-lab", "A difficult conversation", "Conduza diálogo complexo com síntese imparcial."]]),
      chapter("specialist-communication", "Comunicação especializada", "Explique conceitos e recomendações a públicos mistos.", [["translate-expertise-for-the-public", "Complex ideas, clear language", "Adapte explicação especializada sem distorcer conceitos."], ["communicating-risk-and-uncertainty", "What might happen", "Comunique probabilidades e riscos com calibração."], ["defending-a-method", "Why this method?", "Justifique escolhas metodológicas e suas limitações."], ["ethical-recommendations", "A recommendation with consequences", "Pondere impactos e responsabilidades em uma recomendação."], ["c2-expert-panel", "Expertise in conversation", "Participe de uma discussão especializada interdisciplinar."]]),
    ]),
    modulePlan("c2-capstone", "Projeto de síntese C2", "Integre domínio linguístico, análise cultural e comunicação precisa.", [
      chapter("independent-inquiry", "Investigação independente", "Desenvolva uma questão, uma análise e uma tese própria.", [["choose-an-original-question", "A question only you would ask", "Defina uma pergunta original e relevante."], ["curate-a-source-collection", "A carefully chosen corpus", "Selecione fontes representativas e reconheça lacunas."], ["analyze-language-and-context", "Language as evidence", "Analise forma, contexto e efeito em conjunto."], ["develop-a-subtle-thesis", "A thesis that leaves room", "Defenda uma tese precisa sem simplificar tensões."], ["c2-inquiry-conference", "Presenting an independent inquiry", "Apresente pesquisa e responda a questionamentos críticos."]]),
      chapter("c2-final-project", "Projeto final C2", "Comunique uma contribuição original em texto e conversa.", [["plan-a-multigenre-portfolio", "One inquiry, several forms", "Planeje gêneros distintos para uma mesma investigação."], ["write-with-control-and-range", "A final written contribution", "Produza texto de alta precisão e voz consistente."], ["present-with-adaptive-fluency", "A conversation, not a script", "Apresente ideias e adapte a exposição ao diálogo."], ["reflect-on-language-choices", "Why these words?", "Explique escolhas de registro, estilo e evidência."], ["c2-final-reflection", "A lifelong language practice", "Defina um plano de prática além do percurso CEFR."]]),
    ]),
  ] },
];

const courseContentByLevel: Record<string, Lesson[]> = {
  B1: b1Modules.flatMap((module) => module.lessons),
  B2: b2Modules.flatMap((module) => module.lessons),
  C1: c1PublishedModules.flatMap((module) => module.lessons),
  C2: c2Modules.flatMap((module) => module.lessons),
};
const publishedLessonsBySlug = new Map([...a1Lessons, ...a2Lessons, ...Object.values(courseContentByLevel).flat()].map((lesson) => [lesson.slug, lesson]));
export const fullCourseRoadmap: CourseLevel[] = courseRoadmap.map((level) => ({
  code: level.code,
  modules: level.modules.map((module) => ({
    ...module,
    chapters: module.chapters.map((item) => ({
      ...item,
      lessons: item.lessons.map((planned) => {
        const lesson = publishedLessonsBySlug.get(planned.slug);
        const levelLesson = courseContentByLevel[level.code]?.find((candidate) => candidate.slug === planned.slug);
        const published = lesson ?? levelLesson;
        return published ? { ...planned, title: published.title, objective: published.subtitle, status: "available" as const } : planned;
      }),
    })),
  })),
}));

export const roadmapLessons = fullCourseRoadmap.flatMap((level) => level.modules.flatMap((module) => module.chapters.flatMap((item) => item.lessons)));
export const publishedRoadmapLessons = roadmapLessons.filter((lesson) => lesson.status === "available");
export const getCourseLevel = (code: string) => fullCourseRoadmap.find((level) => level.code === code);
export const getModuleForLesson = (slug: string) => fullCourseRoadmap.flatMap((level) => level.modules.map((module) => ({ level, module }))).find(({ module }) => module.chapters.some((item) => item.lessons.some((lesson) => lesson.slug === slug)));

export type Question = { prompt: string; options: string[]; answer: number; level: string; skill: string };

export const diagnosticQuestions: Question[] = [
  { prompt: "Choose the correct greeting for the morning.", options: ["Good morning", "Good night", "Good bye", "See you"], answer: 0, level: "A1", skill: "Vocabulário" },
  { prompt: "Complete: My sister ___ a student.", options: ["are", "is", "am", "be"], answer: 1, level: "A1", skill: "Gramática" },
  { prompt: "What does ‘small’ mean?", options: ["Alto", "Pequeno", "Rápido", "Longe"], answer: 1, level: "A1", skill: "Vocabulário" },
  { prompt: "Choose the plural of ‘child’.", options: ["Childs", "Childes", "Children", "Childrens"], answer: 2, level: "A1", skill: "Gramática" },
  { prompt: "Complete: We ___ to school by bus every day.", options: ["go", "goes", "going", "went"], answer: 0, level: "A2", skill: "Gramática" },
  { prompt: "‘Could you open the window?’ is a…", options: ["complaint", "polite request", "greeting", "warning"], answer: 1, level: "A2", skill: "Uso da língua" },
  { prompt: "Choose the right word: There isn’t ___ milk left.", options: ["many", "a few", "much", "several"], answer: 2, level: "A2", skill: "Gramática" },
  { prompt: "‘I’m looking forward to it’ means…", options: ["I’m excited about it", "I forgot about it", "I’m worried it happened", "I don’t want it"], answer: 0, level: "A2", skill: "Expressões" },
  { prompt: "When I arrived, the film ___.", options: ["already starts", "had already started", "has already start", "was already start"], answer: 1, level: "B1", skill: "Gramática" },
  { prompt: "Choose a synonym for ‘reliable’.", options: ["Trustworthy", "Temporary", "Unusual", "Careless"], answer: 0, level: "B1", skill: "Vocabulário" },
  { prompt: "If I ___ more time, I would learn another language.", options: ["have", "will have", "had", "would have"], answer: 2, level: "B1", skill: "Gramática" },
  { prompt: "‘Despite the rain, we went out.’ The rain…", options: ["caused us to stay in", "didn’t stop us", "started after we left", "was expected"], answer: 1, level: "B1", skill: "Leitura" },
  { prompt: "The proposal was rejected, ___ its potential benefits.", options: ["although", "despite", "however", "whereas"], answer: 1, level: "B2", skill: "Gramática" },
  { prompt: "‘To address an issue’ means to…", options: ["ignore it", "deal with it", "make it worse", "describe its location"], answer: 1, level: "B2", skill: "Vocabulário" },
  { prompt: "Choose the most natural phrase.", options: ["I strongly recommend it", "I recommend strongly it", "Strongly I it recommend", "I it recommend strong"], answer: 0, level: "B2", skill: "Uso da língua" },
  { prompt: "Had we known earlier, we ___ a different route.", options: ["take", "would take", "would have taken", "had taken"], answer: 2, level: "B2", skill: "Gramática" },
  { prompt: "Her account was persuasive, yet it failed to ___ the committee.", options: ["convince", "convict", "convert", "convene"], answer: 0, level: "C1", skill: "Vocabulário" },
  { prompt: "The findings are tentative; ___, further research is required.", options: ["consequently", "nevertheless", "otherwise", "similarly"], answer: 0, level: "C1", skill: "Coesão" },
  { prompt: "‘The claim is not borne out by the evidence’ means it is…", options: ["supported by data", "not supported by data", "widely repeated", "difficult to test"], answer: 1, level: "C1", skill: "Leitura" },
  { prompt: "Choose the sentence with the closest meaning: ‘Only after the review did we notice the flaw.’", options: ["We noticed the flaw before reviewing", "The review helped reveal the flaw", "The review caused the flaw", "We never noticed the flaw"], answer: 1, level: "C1", skill: "Leitura" },
  { prompt: "The author’s argument is cogent, if somewhat ___.", options: ["specious", "circumspect", "perfunctory", "incongruous"], answer: 0, level: "C2", skill: "Nuance" },
  { prompt: "‘She was economical with the truth’ most nearly implies she…", options: ["told a concise truth", "was not entirely honest", "saved money honestly", "proved the truth"], answer: 1, level: "C2", skill: "Expressões" },
  { prompt: "The policy is likely to have a ___ effect: it may help one group while disadvantaging another.", options: ["salutary", "equivocal", "deleterious", "unequivocal"], answer: 1, level: "C2", skill: "Vocabulário" },
  { prompt: "Choose the most precise completion: The evidence is ___, not conclusive.", options: ["suggestive", "suggestible", "suggested", "suggesting"], answer: 0, level: "C2", skill: "Precisão" },
];

export function getPlacement(score: number, total: number) {
  const percent = total ? Math.round((score / total) * 100) : 0;
  const index = percent <= 20 ? 0 : percent <= 40 ? 1 : percent <= 60 ? 2 : percent <= 75 ? 3 : percent <= 90 ? 4 : 5;
  const recommended = levels[index];
  const hasPublishedLessons = recommended.code === "A1" || recommended.code === "A2";
  const recommendationLevel = recommended.code === "A1" || recommended.code === "A2" ? recommended : levels[1];
  return { percent, level: recommended, hasPublishedLessons, recommendationLevel };
}
