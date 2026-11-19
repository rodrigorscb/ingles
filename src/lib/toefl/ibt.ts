import { mc, open, type CambridgeItem, type CambridgePart, type CambridgeTest } from "@/lib/cambridge/builder";
import { enrich } from "./itp-shared";

/**
 * Complete the Words: words marked {like this} lose their second half (as in the exam);
 * the student may type either the missing letters or the whole word.
 */
function completeTheWords(start: number, title: string, text: string): CambridgePart {
  const items: CambridgeItem[] = [];
  let n = start;
  const passage = text.replace(/\{([^}]+)\}/g, (_, word: string) => {
    const keep = Math.max(1, Math.floor(word.length / 2));
    const shown = word.slice(0, keep);
    const missing = word.slice(keep);
    const blank = `${shown}${"_".repeat(missing.length)}`;
    items.push(open(`Gap ${n} · ${blank}`, [word.toLowerCase(), missing.toLowerCase()], `A palavra completa é “${word}” (faltavam as letras “${missing}”). Releia a frase para confirmar que ela faz sentido no contexto.`));
    return `${blank} (${n++})`;
  });
  return { label: "Complete the Words", skill: "Completar palavras", instruction: `Questions ${start}–${n - 1}. Fill in the missing letters to complete the words in the paragraph. You may type only the missing letters or the whole word.`, passage, passageLabel: title, items };
}

const dailyPart = (range: string, items: CambridgeItem[]): CambridgePart => ({ label: "Read in Daily Life", skill: "Textos do cotidiano", instruction: `Questions ${range}. Read each short text and answer the questions.`, items: items.map(enrich) });
const academicPart = (range: string, title: string, passage: string, items: CambridgeItem[]): CambridgePart => ({ label: "Read an Academic Passage", skill: "Texto acadêmico", instruction: `Questions ${range}. Read the passage and answer the questions.`, passage, passageLabel: title, items: items.map(enrich) });

export const ibtTests: CambridgeTest[] = [
  (() => {
    const email = "Subject: Library study rooms\n\nHi Ana,\nThe group study rooms on the third floor are closed this week for painting. You can still book rooms on the second floor through the library app, but they fill up quickly, so reserve early. Third-floor rooms will reopen on Monday.\n\n— Library Services";
    const shuttle = "CAMPUS SHUTTLE\nFrom 1 October, the evening shuttle will leave the main gate every 20 minutes instead of every 30, until 11 p.m. The last bus from the city centre now departs at 11.30 p.m. Students must show their ID when boarding.";
    const chat = "Leo (6:02 p.m.): Are we still meeting at the café at 7?\nMia (6:05 p.m.): Yes, but can we make it 7:30? My lab ran late.\nLeo (6:06 p.m.): Sure. I’ll get us a table by the window.\nMia (6:07 p.m.): Perfect, thanks!";
    const menu = "STUDENT CAFETERIA — Weekly Special\nMonday to Friday: soup and sandwich combo, $6.50 (save $2)\nVegetarian and vegan options available daily\nPay with your student card for an extra 5% discount\nOpen 7:30 a.m.–8:00 p.m.";
    const post = "Campus Garden Club: Thanks to the 30 volunteers who helped plant tomatoes last Saturday! Next workday: Saturday at 10 a.m. Bring gloves if you have them — we’ll provide tools and snacks. New members are always welcome.";
    return {
      title: "Campus, ciência e cotidiano",
      parts: [
        completeTheWords(1, "Honeybees", "Honeybees are essential pollinators. Without {them}, many {crops} would {produce} far {less} fruit. {Bees} collect {nectar} from {flowers} and {carry} pollen {between} {plants}."),
        dailyPart("11–16", [
          mc("Why was this email sent?", "to tell students that some rooms are temporarily unavailable", ["to announce new library opening hours", "to invite Ana to a painting class", "to explain how to download the app"], "As salas do terceiro andar estão fechadas esta semana para pintura.", email),
          mc("What does the writer suggest?", "booking a second-floor room early", ["waiting until Monday to study", "studying at home", "calling the library"], "“They fill up quickly, so reserve early.”", email),
          mc("What change is announced?", "more frequent evening buses", ["a new route to the airport", "the end of the evening service", "a higher fare"], "O ônibus passa a sair a cada 20 minutos, e não mais a cada 30.", shuttle),
          mc("What must students do when boarding?", "show their ID", ["buy a ticket online", "arrive 20 minutes early", "book a seat"], "“Students must show their ID when boarding.”", shuttle),
          mc("Why does Mia want to change the time?", "Her lab session finished late.", ["The café is closed until 7:30.", "She forgot about the meeting.", "Leo asked her to."], "“My lab ran late.”", chat),
          mc("What will Leo do?", "get a table by the window", ["cancel the meeting", "go to the lab", "order food for Mia"], "“I’ll get us a table by the window.”", chat),
        ]),
        academicPart("17–21", "City birds change their tune", "Birds living in cities face a challenge that their rural relatives do not: constant noise from traffic and construction. Because many birds use song to attract mates and defend territory, being heard is vital. Researchers have found that urban birds of several species, including great tits and robins, sing at a higher pitch than birds of the same species in quiet forests. Low-frequency traffic noise masks low notes, so higher songs are easier to hear. Some city birds also sing louder or at different times of day. Robins in noisy areas, for instance, have been observed singing at night, when traffic is lighter. Scientists debate whether these changes are learned behaviours or the result of evolution. Evidence suggests that individual birds can adjust their songs within a single lifetime, which points to flexibility rather than genetic change. However, over many generations, natural selection may also favour birds whose songs carry well in noisy environments.", [
          mc("What is the passage mainly about?", "how city birds adapt their songs to noise", ["why birds migrate", "the decline of forest birds", "how traffic noise is measured"], "O texto mostra como as aves urbanas mudam o canto por causa do ruído."),
          mc("Why do many urban birds sing at a higher pitch?", "Traffic noise hides low notes.", ["Higher songs attract predators.", "City birds are smaller.", "They imitate car horns."], "“Low-frequency traffic noise masks low notes.”"),
          mc("The word “masks” in the passage is closest in meaning to", "covers", ["repeats", "creates", "improves"], "O ruído encobre as notas graves."),
          mc("Why do some robins sing at night?", "Traffic is lighter then.", ["They cannot see during the day.", "Predators sleep at night.", "They have more energy at night."], "“When traffic is lighter.”"),
          mc("What does the evidence about individual birds suggest?", "The changes may be learned rather than genetic.", ["Evolution plays no role at all.", "Only young birds can change their songs.", "Birds never change their songs."], "Ajustes durante a vida indicam flexibilidade, “rather than genetic change”."),
        ]),
        completeTheWords(22, "Coffee", "Many people drink coffee every morning. It {helps} them {feel} more {alert} because {caffeine} blocks {chemicals} in {the} brain {that} cause {tiredness}. However, too much {coffee} can {disturb} sleep."),
        dailyPart("32–35", [
          mc("How much do students save by buying the combo?", "$2", ["$6.50", "5%", "$8.50"], "“$6.50 (save $2).”", menu),
          mc("How can students get an extra discount?", "by paying with their student card", ["by arriving before 8 a.m.", "by choosing the vegan option", "by buying two combos"], "“Pay with your student card for an extra 5% discount.”", menu),
          mc("What is the main purpose of the post?", "to thank volunteers and invite people to the next workday", ["to sell tomatoes", "to announce that the club is closing", "to ask for donations"], "Agradece aos voluntários e divulga o próximo sábado de trabalho.", post),
          mc("What will the club provide?", "tools and snacks", ["gloves", "transport", "seeds to take home"], "“We’ll provide tools and snacks.” As luvas devem ser levadas pelos voluntários.", post),
        ]),
        academicPart("36–40", "The first stethoscope", "Before the nineteenth century, doctors listened to a patient’s heart and lungs by placing an ear directly on the chest. In 1816, the French physician René Laennec found this method uncomfortable and ineffective, particularly with patients who were overweight. Remembering how children sent sounds through a long piece of wood, he rolled a sheet of paper into a tube and placed one end on the patient’s chest. To his surprise, he could hear the heartbeat more clearly than ever before. Laennec went on to build wooden cylinders and spent several years studying the sounds of healthy and diseased lungs, publishing a detailed guide in 1819. Although some doctors were initially sceptical, the stethoscope soon became a standard tool. Later designs added flexible tubes and two earpieces, making the instrument more comfortable and effective.", [
          mc("What is the main idea of the passage?", "the origin and development of the stethoscope", ["the games of French children", "diseases of the lungs", "the history of medicine in Britain"], "Como surgiu e evoluiu o estetoscópio."),
          mc("Why did Laennec look for a new method?", "The existing method was uncomfortable and ineffective.", ["He had poor hearing.", "Patients requested it.", "The government ordered it."], "Encostar o ouvido no peito era “uncomfortable and ineffective”."),
          mc("What inspired Laennec’s idea?", "children sending sounds through wood", ["a musical instrument", "a book about lungs", "a conversation with a patient"], "Ele se lembrou de crianças transmitindo sons por uma peça de madeira."),
          mc("The word “sceptical” in the passage is closest in meaning to", "doubtful", ["excited", "angry", "informed"], "Alguns médicos duvidaram no início."),
          mc("What did later designs add?", "flexible tubes and two earpieces", ["electronic speakers", "paper tubes", "larger wooden cylinders"], "“Later designs added flexible tubes and two earpieces.”"),
        ]),
        completeTheWords(41, "Volcanoes", "Volcanoes form where molten rock reaches the surface. Some {erupt} violently, {while} others {release} lava {slowly}. Scientists {monitor} active {volcanoes} using {sensors} that {detect} {small} {earthquakes}."),
      ],
    };
  })(),
  (() => {
    const prof = "Dear students,\nTomorrow’s lecture will be held online instead of in Room 204 because of a heating problem in the building. The link has been posted on the course page. Please also remember that your lab reports are due on Friday.\n— Prof. Kim";
    const gym = "UNIVERSITY GYM\nThe pool will be closed for cleaning on Sunday 12 May from 6 a.m. to 2 p.m. All other facilities will remain open as usual. We apologise for any inconvenience.";
    const chat = "Sam: Did you get the notes from today’s history class?\nPriya: Yes! I’ll email them tonight.\nSam: Thanks! I missed it because of a doctor’s appointment.\nPriya: No problem. The professor also said the essay deadline has moved to next Wednesday.";
    const fair = "INTERNATIONAL FOOD FAIR\nSaturday, 3–7 p.m., Student Union Hall\nTry dishes from over 20 countries! Free entry; food tokens $1 each.\nVolunteers needed to help set up from 1 p.m. — sign up at the information desk.";
    const review = "★★★★☆ Great study spot! The new library café has fast Wi-Fi and plenty of power outlets. Coffee is a bit pricey, but the quiet atmosphere makes up for it. I just wish they stayed open later than 6 p.m. — Jordan";
    return {
      title: "Natureza, rotina e descobertas",
      parts: [
        completeTheWords(1, "Recycling", "Recycling reduces the amount of waste sent to landfills. {Paper}, {glass} and {metal} can {often} be {processed} and {used} {again}. {However}, plastic is {harder} to {recycle}."),
        dailyPart("11–16", [
          mc("Why is the lecture moving online?", "There is a problem with the heating.", ["The professor is ill.", "Room 204 is too small.", "Students requested it."], "“Because of a heating problem in the building.”", prof),
          mc("What is due on Friday?", "lab reports", ["a quiz", "a presentation", "an online survey"], "“Your lab reports are due on Friday.”", prof),
          mc("What will be unavailable on Sunday?", "the pool, for part of the day", ["the entire gym, all day", "the changing rooms", "the gym on Monday"], "A piscina fecha das 6h às 14h; o resto funciona normalmente.", gym),
          mc("The word “inconvenience” in the notice is closest in meaning to", "trouble", ["noise", "cost", "danger"], "Pedido de desculpas pelo transtorno.", gym),
          mc("Why did Sam miss the class?", "Sam had a doctor’s appointment.", ["Sam overslept.", "Sam was at work.", "The class was cancelled."], "“I missed it because of a doctor’s appointment.”", chat),
          mc("What new information does Priya share?", "The essay deadline has been extended.", ["Next week’s class is cancelled.", "The notes are already online.", "The professor is ill."], "O prazo passou para a próxima quarta-feira.", chat),
        ]),
        academicPart("17–21", "Surviving in the desert", "Plants that live in deserts must survive long periods with little or no rain. Many have developed remarkable adaptations. Cacti, for example, store water in their thick stems, which can expand after rainfall. Their leaves have evolved into spines, which reduce water loss and protect the plant from animals. Other desert plants have extremely long roots that reach deep underground water, while some spread their roots widely just below the surface to capture rain quickly before it evaporates. Many desert plants also open their pores, called stomata, only at night, when temperatures are cooler, to take in carbon dioxide while losing less water. Some species avoid drought altogether by completing their entire life cycle in a few weeks after rain, leaving seeds that can survive in the soil for years.", [
          mc("What is the passage mainly about?", "how desert plants survive dry conditions", ["why deserts are expanding", "the history of cactus farming", "how animals find water"], "Adaptações das plantas do deserto."),
          mc("According to the passage, cactus spines help by", "reducing water loss and providing protection", ["storing water", "absorbing sunlight", "attracting insects"], "Reduzem a perda de água e protegem a planta."),
          mc("Why do some plants open their stomata only at night?", "to lose less water", ["to avoid insects", "to absorb more light", "because they rest during the day"], "Noites mais frescas = menos perda de água."),
          mc("The word “evaporates” in the passage is closest in meaning to", "turns into vapour", ["freezes", "floods", "sinks"], "Evaporar."),
          mc("What can be inferred about plants with very short life cycles?", "They depend on seeds surviving between rains.", ["They live for many years.", "They have the longest roots.", "They grow only in winter."], "As sementes sobrevivem no solo por anos até a próxima chuva."),
        ]),
        completeTheWords(22, "Tides", "The Moon affects the oceans on Earth. Its {gravity} pulls {on} the {water}, creating {tides}. Most {coastal} areas {experience} two {high} tides {and} two {low} tides {each} day."),
        dailyPart("32–35", [
          mc("How much does it cost to enter the fair?", "nothing", ["$1", "$20", "$3"], "“Free entry”; as fichas de comida custam $1.", fair),
          mc("What are volunteers asked to do?", "help prepare the event before it starts", ["cook dishes", "sell tokens at 7 p.m.", "clean up on Sunday"], "Ajudar na montagem a partir das 13h.", fair),
          mc("What does Jordan dislike about the café?", "its early closing time", ["the Wi-Fi speed", "the lack of outlets", "the noise"], "“I just wish they stayed open later than 6 p.m.”", review),
          mc("In the review, “makes up for it” means", "compensates for the price", ["increases the price", "replaces the coffee", "causes the problem"], "O ambiente tranquilo compensa o preço alto.", review),
        ]),
        academicPart("36–40", "Seeing with sound", "Many species of bats navigate and hunt in complete darkness using echolocation. A bat produces high-pitched calls, usually too high for humans to hear, and listens for the echoes that bounce back from objects around it. By analysing the time it takes for echoes to return, bats can determine the distance, size and even texture of objects. As a bat approaches an insect, it increases the rate of its calls, sometimes producing more than 200 per second in the final moments before capture. Some moths have evolved defences against echolocation: certain species can hear bat calls and take evasive action, while others produce their own clicking sounds that may confuse bats. Scientists have drawn on bat echolocation to improve sonar technology and to develop navigation aids for blind people.", [
          mc("What is the passage mainly about?", "how bats use echolocation", ["why moths fly at night", "the history of sonar", "the diet of bats"], "A ecolocalização dos morcegos."),
          mc("How do bats judge the distance of objects?", "by the time echoes take to return", ["by the colour of objects", "by smell", "by the temperature of the air"], "“By analysing the time it takes for echoes to return.”"),
          mc("What happens as a bat approaches its prey?", "It calls more frequently.", ["It stops calling.", "It lands nearby.", "It flies higher."], "Aumenta a frequência: mais de 200 chamados por segundo."),
          mc("The word “evasive” in the passage is closest in meaning to", "intended to avoid something", ["aggressive", "noisy", "slow"], "Manobras para escapar."),
          mc("According to the passage, bat echolocation has inspired", "navigation aids for blind people", ["new insect repellents", "night-vision cameras", "moth farms"], "E também melhorias no sonar."),
        ]),
        completeTheWords(41, "Exercise", "Exercise benefits both the body and the mind. Regular {activity} strengthens {the} heart {and} improves {mood}. Even {short} walks {can} reduce {stress} and {help} people {sleep} {better}."),
      ],
    };
  })(),
  (() => {
    const alarm = "Hi residents,\nMaintenance will test the fire alarms in Building C on Thursday between 10 a.m. and noon. You may hear the alarm several times; there is no need to leave the building during the test. Thank you for your patience.\n— Residence Office";
    const lost = "LOST AND FOUND\nA blue backpack containing a laptop was found in Lecture Hall 3 on Tuesday. To claim it, visit the Security Office with photo ID and describe the contents.";
    const chat = "Ravi: Want to join our study group for the chemistry exam?\nElla: Definitely! When do you meet?\nRavi: Tuesdays and Thursdays at 5 in the library.\nElla: Thursdays are fine, but I work on Tuesdays.\nRavi: No worries — come when you can.";
    const career = "CAREER FAIR\nWednesday, 10 a.m.–3 p.m., Sports Centre. Over 50 employers.\nBring printed copies of your CV.\nFree CV review sessions in Room 12 on Monday and Tuesday.";
    const order = "Your order #4521 (Introduction to Psychology, 3rd edition) is ready for pickup at the campus bookstore. Please collect it within 7 days, or it will be returned to stock. Bring your order number.";
    return {
      title: "Natureza, história e moradia",
      parts: [
        completeTheWords(1, "Coral reefs", "Coral reefs support an enormous variety of life. {They} cover {only} a {small} part {of} {the} {ocean}, but {provide} homes {for} {many} {species}."),
        dailyPart("11–16", [
          mc("What will happen on Thursday?", "a fire alarm test", ["a fire drill that requires evacuation", "repairs lasting all day", "a residents’ meeting"], "A manutenção vai testar os alarmes de incêndio.", alarm),
          mc("What should residents do when they hear the alarm?", "stay in the building", ["leave immediately", "call the office", "go to Building C"], "“There is no need to leave the building during the test.”", alarm),
          mc("Where was the backpack found?", "in Lecture Hall 3", ["at the Security Office", "in the library", "on the bus"], "“Found in Lecture Hall 3 on Tuesday.”", lost),
          mc("What must the owner do to claim it?", "show photo ID and describe the contents", ["pay a fee", "email a professor", "wait until next Tuesday"], "Levar documento com foto e descrever o conteúdo.", lost),
          mc("Why can’t Ella attend on Tuesdays?", "She works on Tuesdays.", ["She has another exam.", "The library is closed.", "She dislikes chemistry."], "“I work on Tuesdays.”", chat),
          mc("What is Ravi’s attitude?", "flexible and welcoming", ["annoyed", "uninterested", "strict"], "“No worries — come when you can.”", chat),
        ]),
        academicPart("17–21", "Why leaves change colour", "In many temperate regions, the leaves of deciduous trees turn red, orange and yellow in autumn. During spring and summer, leaves are green because they contain large amounts of chlorophyll, the pigment that plants use to capture sunlight for photosynthesis. Chlorophyll masks other pigments that are also present in the leaves, such as yellow and orange carotenoids. As days grow shorter and temperatures fall, trees stop producing chlorophyll, and the green colour fades, revealing the yellow and orange beneath. Red colours are produced by different pigments, called anthocyanins, which some trees actively produce in autumn. Scientists believe anthocyanins may protect leaves from sunlight damage while the tree reabsorbs valuable nutrients before the leaves fall. Weather affects the intensity of autumn colours: sunny days and cool nights tend to produce the brightest reds.", [
          mc("What is the passage mainly about?", "why leaves change colour in autumn", ["how trees grow in spring", "medical uses of chlorophyll", "the effect of rain on forests"], "A mudança de cor das folhas no outono."),
          mc("Why are leaves green in spring and summer?", "They contain a lot of chlorophyll.", ["They lack other pigments.", "They absorb red light.", "They are full of water."], "“Large amounts of chlorophyll.”"),
          mc("What reveals the yellow and orange colours?", "the fading of chlorophyll", ["the production of anthocyanins", "heavy rain", "new leaf growth"], "Sem clorofila, os carotenoides aparecem."),
          mc("The word “reabsorbs” in the passage is closest in meaning to", "takes back in", ["releases", "destroys", "produces"], "A árvore recupera os nutrientes antes de as folhas caírem."),
          mc("According to the passage, the brightest reds result from", "sunny days and cool nights", ["cloudy days and warm nights", "heavy snowfall", "dry summers only"], "“Sunny days and cool nights tend to produce the brightest reds.”"),
        ]),
        completeTheWords(22, "Bike lanes", "Many cities are building more bicycle lanes. {Cycling} is {cheap}, healthy {and} produces {no} pollution. {Safe} lanes {encourage} more {people} to {ride} {instead} {of} driving."),
        dailyPart("32–35", [
          mc("What should students bring to the career fair?", "printed copies of their CV", ["a laptop", "only a cover letter", "an ID photo"], "“Bring printed copies of your CV.”", career),
          mc("When can students get help with their CVs?", "before the fair", ["only during the fair", "after the fair", "on Wednesday evening"], "Segunda e terça, antes da feira de quarta.", career),
          mc("What is the message about?", "a book that is ready to be collected", ["a book being delivered to a home address", "a cancelled order", "a price increase"], "O livro está pronto para retirada.", order),
          mc("What happens if the order is not collected within 7 days?", "It will be returned to stock.", ["The price will rise.", "It will be mailed.", "A fee will be charged."], "“Or it will be returned to stock.”", order),
        ]),
        academicPart("36–40", "London burning", "In September 1666, a fire broke out in a bakery on Pudding Lane in London. Fanned by strong winds, it spread rapidly through the narrow streets, where most buildings were made of wood. The fire burned for four days, destroying more than 13,000 houses, 87 churches and St Paul’s Cathedral. Remarkably, the recorded death toll was low, although historians suspect many deaths went unrecorded. In the aftermath, new building regulations required houses to be built of brick or stone, and streets were widened to slow the spread of future fires. The architect Christopher Wren designed a new St Paul’s Cathedral, along with dozens of other churches. The disaster also contributed to the development of fire insurance, as property owners sought protection against future losses.", [
          mc("What is the passage mainly about?", "the Great Fire of London and its consequences", ["the history of bakeries", "Christopher Wren’s childhood", "modern fire safety"], "O incêndio de 1666 e o que veio depois."),
          mc("Why did the fire spread so quickly?", "strong winds and wooden buildings", ["a lack of water", "an earthquake", "the collapse of the cathedral"], "Vento forte e ruas estreitas com casas de madeira."),
          mc("What do historians suspect?", "More people died than the records show.", ["The fire started in a church.", "The fire lasted a month.", "No houses were destroyed."], "“Many deaths went unrecorded.”"),
          mc("What did the new building regulations require?", "houses built of brick or stone", ["wooden roofs", "narrower streets", "more bakeries"], "“Required houses to be built of brick or stone.”"),
          mc("The word “aftermath” in the passage is closest in meaning to", "the period following an event", ["the cause", "a warning", "the middle"], "O período após o desastre."),
        ]),
        completeTheWords(41, "Changing language", "Language changes constantly over time. New {words} appear, {while} others {disappear}. {Technology} has {added} many {terms}, {such} {as} ‘email’ {and} ‘download’, to {everyday} speech."),
      ],
    };
  })(),
  (() => {
    const party = "Dear first-year students,\nThe department welcome party will take place on Friday at 6 p.m. in the Art Building courtyard. Food and drinks will be provided. In case of rain, the event will move to Room 101. Please RSVP by Wednesday.";
    const quiet = "QUIET ZONE\nThis floor of the library is for silent study only. Phone calls and group discussions are not permitted. Group study rooms are available on Floor 2.";
    const chat = "Jo: The bus is running 15 minutes late 😩\nKai: No problem, I’ll order for you. Still want the pasta?\nJo: Yes, please — and a lemonade.\nKai: Got it. See you soon!";
    const contest = "PHOTOGRAPHY CONTEST — Theme: ‘Life on Campus’\nSubmit up to 3 photos by 30 April through the student portal. Winners receive gift cards, and their work will be displayed in the library. Open to all current students.";
    const interview = "Hello Maya,\nThank you for applying for the research assistant position. We would like to invite you to an interview on Monday at 2 p.m. in Room 310. Please bring a copy of your transcript and reply to confirm that you can attend.\n— Dr. Osei";
    return {
      title: "Corpo, sociedade e trabalho",
      parts: [
        completeTheWords(1, "Sleep", "Sleep is essential for good health. During {sleep}, the {brain} processes {information} and {stores} memories. {Adults} generally {need} seven {to} nine {hours} {each} {night}."),
        dailyPart("11–16", [
          mc("What should students do by Wednesday?", "confirm whether they will attend", ["pay for the food", "bring drinks", "book Room 101"], "“Please RSVP by Wednesday” = confirmar presença.", party),
          mc("What happens if it rains?", "The party moves indoors.", ["It is cancelled.", "It is postponed to Saturday.", "Students must bring umbrellas."], "A festa vai para a Sala 101.", party),
          mc("Which of the following is NOT allowed on this floor?", "talking on the phone", ["reading", "silent study", "using a laptop quietly"], "“Phone calls and group discussions are not permitted.”", quiet),
          mc("Where should groups go to study?", "Floor 2", ["the café", "outside", "Floor 1"], "“Group study rooms are available on Floor 2.”", quiet),
          mc("Why is Jo going to be late?", "The bus is delayed.", ["Jo forgot the time.", "The restaurant changed.", "Kai is late."], "“The bus is running 15 minutes late.”", chat),
          mc("What will Kai do?", "order food for Jo", ["pick Jo up", "cancel the meal", "wait at the bus stop"], "“I’ll order for you.”", chat),
        ]),
        academicPart("17–21", "The ant superorganism", "Ant colonies are often described as superorganisms, because individual ants work together so closely that the colony behaves like a single living thing. Each colony typically has one or more queens, whose main role is to lay eggs, and thousands or even millions of workers. Workers perform different tasks depending on their age: younger ants usually care for the eggs and larvae inside the nest, while older ants take on riskier jobs, such as foraging for food and defending the colony. Ants communicate mainly through chemicals called pheromones. When a forager finds food, it leaves a pheromone trail on its way back to the nest, which other ants follow. As more ants use the trail, it becomes stronger, so the colony quickly concentrates its efforts on the best food sources.", [
          mc("What is the passage mainly about?", "how ant colonies are organised and communicate", ["why ants bite", "the diet of queen ants", "how to remove ants from homes"], "Organização e comunicação das colônias."),
          mc("Why are ant colonies called superorganisms?", "The ants cooperate so closely that the colony acts like one organism.", ["Ants are very large.", "Each ant lives for many years.", "Colonies contain only one ant."], "A colônia “behaves like a single living thing”."),
          mc("According to the passage, older worker ants usually", "do more dangerous tasks", ["lay eggs", "care for larvae", "stay inside the nest"], "“Older ants take on riskier jobs.”"),
          mc("The word “foraging” in the passage is closest in meaning to", "searching for food", ["sleeping", "building", "fighting"], "Buscar alimento."),
          mc("Why do pheromone trails become stronger?", "More ants add pheromones as they use them.", ["Rain makes them clearer.", "The queen marks them.", "Fewer ants use them over time."], "“As more ants use the trail, it becomes stronger.”"),
        ]),
        completeTheWords(22, "Melting glaciers", "Glaciers are melting faster than ever before. As {they} shrink, {sea} levels {rise}, {threatening} {coastal} cities. {Scientists} track {these} changes {using} {satellite} {images}."),
        dailyPart("32–35", [
          mc("Who can enter the contest?", "any current student", ["only photography students", "staff members", "former students"], "“Open to all current students.”", contest),
          mc("What is one of the prizes?", "having photos displayed in the library", ["a new camera", "free tuition", "a trip abroad"], "Os trabalhos vencedores serão expostos na biblioteca.", contest),
          mc("What is the purpose of the email?", "to invite Maya to an interview", ["to offer Maya the job", "to reject Maya’s application", "to request a reference"], "Convite para entrevista na segunda-feira.", interview),
          mc("What should Maya bring?", "a copy of her transcript", ["a laptop", "a research paper", "a reference letter"], "“Please bring a copy of your transcript.”", interview),
        ]),
        academicPart("36–40", "The first writing", "Writing was invented independently in several parts of the world, but the earliest known system developed in Mesopotamia, in what is now Iraq, around 3200 BC. It began as a way of keeping records. Officials in growing cities needed to track goods such as grain and livestock, and they began pressing small symbols into clay tablets. At first, these symbols were pictures representing objects. Over time, they became more abstract and began to represent sounds, allowing scribes to record names, laws and eventually literature. This script, known as cuneiform because of its wedge-shaped marks, was used for more than 3,000 years. Writing systems also emerged independently in Egypt, China and Mesoamerica, each developing its own distinctive characteristics.", [
          mc("What is the passage mainly about?", "the origins of writing", ["the history of modern Iraq", "the farming of grain", "the decline of literature"], "A origem da escrita."),
          mc("According to the passage, writing in Mesopotamia began as", "a way of keeping records", ["a form of poetry", "a religious ritual", "a children’s game"], "“It began as a way of keeping records.”"),
          mc("What were the earliest symbols like?", "They were pictures of objects.", ["They represented only sounds.", "They formed an alphabet.", "They were written on paper."], "“Pictures representing objects.”"),
          mc("The word “abstract” in the passage is closest in meaning to", "less like real objects", ["colourful", "larger", "more realistic"], "Os símbolos ficaram menos figurativos."),
          mc("Why is the script called cuneiform?", "because of its wedge-shaped marks", ["after the city where it was found", "after the scribe who invented it", "because it was used for laws"], "“Because of its wedge-shaped marks.”"),
        ]),
        completeTheWords(41, "Music", "Music can have powerful effects on people. It {can} change {our} mood, {help} {us} {concentrate}, and {even} reduce {pain}. Many {hospitals} use {music} {therapy}."),
      ],
    };
  })(),
  (() => {
    const it = "Dear users,\nThe university email system will be unavailable on Saturday from midnight to 4 a.m. for scheduled maintenance. Messages sent during this time will be delivered once the system is back online. No action is required.\n— IT Services";
    const bikes = "BIKE PARKING\nBicycles left at the racks outside the Science Building for more than 14 days without being moved will be tagged and removed. Removed bikes can be collected from Campus Security.";
    const chat = "Nina: Is the math homework due tomorrow or Friday?\nOmar: Friday. But the quiz is tomorrow!\nNina: Oh no, I completely forgot about the quiz.\nOmar: Want to review together tonight?\nNina: Yes, thank you!";
    const yoga = "YOGA ON THE LAWN\nEvery Wednesday at 7:30 a.m. in front of the main library. Free for students. Mats are limited, so bring your own if possible. Classes are cancelled if it rains.";
    const laundry = "★★☆☆☆ The new dorm laundry room has modern machines, but half of them were out of order all week. The app that shows which machines are free doesn’t update correctly either. I hope they fix this soon. — Alex";
    return {
      title: "Oceanos, tecnologia e vida no campus",
      parts: [
        completeTheWords(1, "Rainforests", "Rainforests are home to more than half of the world’s species. They {also} produce {large} {amounts} {of} oxygen. {Unfortunately}, many {forests} are {being} {cut} {down} for {farming}."),
        dailyPart("11–16", [
          mc("What will happen to emails sent during the maintenance?", "They will be delivered later.", ["They will be lost.", "They will be returned to the sender.", "They will be deleted."], "Serão entregues quando o sistema voltar.", it),
          mc("What do users need to do?", "nothing", ["change their passwords", "log out early", "contact IT Services"], "“No action is required.”", it),
          mc("What happens to bikes left for more than 14 days?", "They are tagged and removed.", ["They are sold.", "They are repaired.", "Their owners are fined."], "“Will be tagged and removed.”", bikes),
          mc("Where can owners collect removed bikes?", "at Campus Security", ["at the Science Building", "at the bike shop", "at the library"], "“Can be collected from Campus Security.”", bikes),
          mc("What had Nina forgotten?", "the quiz", ["the homework", "Omar’s number", "the textbook"], "“I completely forgot about the quiz.”", chat),
          mc("What does Omar suggest?", "reviewing together that evening", ["skipping the quiz", "asking the teacher for help", "doing the homework tomorrow"], "“Want to review together tonight?”", chat),
        ]),
        academicPart("17–21", "Otters and underwater forests", "Sea otters play a surprisingly important role in coastal ecosystems along the North Pacific. They feed heavily on sea urchins, which in turn eat kelp, a type of large seaweed that forms underwater forests. When otter populations are healthy, they keep urchin numbers under control, allowing kelp forests to thrive. These forests provide habitat for many fish and other marine animals, and they absorb carbon dioxide. In the eighteenth and nineteenth centuries, sea otters were hunted almost to extinction for their thick fur. Without otters, urchin populations exploded, and in many areas kelp forests were reduced to bare ‘urchin barrens’. Since hunting was banned in 1911, otters have recovered in some regions, and kelp forests have returned with them. Ecologists call species like sea otters ‘keystone species’, because their impact on the ecosystem is far greater than their numbers suggest.", [
          mc("What is the passage mainly about?", "the role of sea otters in kelp forest ecosystems", ["how kelp is harvested", "the fur trade in Europe", "the diet of fish"], "A importância das lontras-marinhas."),
          mc("Why do kelp forests thrive when otters are present?", "Otters keep sea urchin numbers low.", ["Otters plant kelp.", "Otters eat the fish that eat kelp.", "Otters clean the water."], "As lontras controlam os ouriços, que comem as algas."),
          mc("What were “urchin barrens”?", "areas where urchins had destroyed the kelp", ["otter breeding grounds", "protected marine parks", "fishing zones"], "Áreas sem algas por excesso de ouriços."),
          mc("The word “thrive” in the passage is closest in meaning to", "grow well", ["disappear", "move away", "shrink"], "Prosperar."),
          mc("According to the passage, a keystone species is one that", "has a large effect relative to its numbers", ["is the most numerous", "lives only in forests", "always hunts fish"], "“Their impact… is far greater than their numbers suggest.”"),
        ]),
        completeTheWords(22, "Smartphones", "Smartphones have changed how people communicate. Many {people} now {send} messages {instead} of {making} calls. {However}, some {experts} worry {about} {the} {effects} on {attention}."),
        dailyPart("32–35", [
          mc("How much do the yoga classes cost students?", "nothing", ["$5 per class", "$20 per month", "a one-time fee"], "“Free for students.”", yoga),
          mc("What should participants bring if possible?", "their own mats", ["water bottles", "towels", "ID cards"], "“Mats are limited, so bring your own if possible.”", yoga),
          mc("What is Alex’s main complaint?", "Many machines were not working.", ["The machines are old.", "Laundry is expensive.", "The room is too small."], "“Half of them were out of order all week.”", laundry),
          mc("What problem does Alex mention with the app?", "It does not update correctly.", ["It costs money.", "It is available only in English.", "It deletes user accounts."], "“Doesn’t update correctly.”", laundry),
        ]),
        academicPart("36–40", "Mapping the deep", "Although oceans cover more than 70 percent of the Earth’s surface, scientists have mapped only a portion of the ocean floor in high detail. Early sailors measured depth by lowering a weighted rope until it touched the bottom, a slow and imprecise method. In the twentieth century, sonar transformed ocean mapping. Ships emit sound pulses and measure how long the echoes take to return from the seabed, allowing depth to be calculated. Modern multibeam sonar can map a wide strip of the seafloor at once. Satellites can also estimate seafloor features indirectly, by measuring tiny variations in the height of the sea surface caused by underwater mountains. However, satellite maps are much less detailed than those produced by ships. An international project aims to map the entire ocean floor in detail, which would improve navigation, scientific research and our understanding of marine habitats.", [
          mc("What is the passage mainly about?", "methods of mapping the ocean floor", ["the history of sailing", "marine animals", "how satellites are launched"], "Como se mapeia o fundo do mar."),
          mc("How did early sailors measure depth?", "by lowering a weighted rope", ["by using satellites", "by sending divers", "by listening to whales"], "“Lowering a weighted rope until it touched the bottom.”"),
          mc("How does sonar measure depth?", "by timing echoes from the seabed", ["by measuring water temperature", "by photographing the bottom", "by weighing the water"], "Mede quanto tempo o eco leva para voltar."),
          mc("The word “indirectly” in the passage is closest in meaning to", "not by direct measurement", ["quickly", "accurately", "dangerously"], "Por meio da altura da superfície do mar, não medindo o fundo."),
          mc("Compared with ship sonar, satellite maps are", "less detailed", ["more detailed", "exactly the same", "more expensive"], "“Much less detailed than those produced by ships.”"),
        ]),
        completeTheWords(41, "Volunteering", "Volunteering offers benefits to both communities and volunteers. People {who} volunteer {often} report {feeling} {happier} {and} {less} {stressed}. {They} also {develop} new {skills}."),
      ],
    };
  })(),
];
