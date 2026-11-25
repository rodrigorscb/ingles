import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbs } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Perguntas Frequentes sobre o Curso de Inglês Grátis" },
  description: "Tire suas dúvidas: o curso de inglês é grátis mesmo? Tem certificado? Como funcionam o teste de nível, os simulados, a pronúncia e a conta com progresso salvo?",
  alternates: { canonical: "/faq" },
  openGraph: { title: "Perguntas frequentes sobre o curso de inglês grátis", description: "Gratuidade, certificado, teste de nível, simulados, pronúncia e conta.", url: "/faq" },
};

const questions: [string, string][] = [
  ["O curso de inglês é grátis mesmo?", "Sim. Todas as aulas do A1 ao C2, o teste de nível e os simulados de exames são gratuitos, sem cartão de crédito e sem período de teste. Criar uma conta também é grátis e serve para salvar o seu progresso."],
  ["Preciso saber inglês para começar?", "Não. A trilha começa no A1, com cumprimentos, apresentações e frases do dia a dia, sempre com explicação em português. Se você já estudou antes, faça o teste de nível para descobrir por onde começar."],
  ["Quantas aulas tem o curso e quanto tempo leva?", "São mais de 200 aulas organizadas em módulos, do iniciante (A1) ao avançado (C2). Cada aula leva de 7 a 16 minutos, então dá para estudar um pouco todos os dias e avançar no seu ritmo, sem prazo para terminar."],
  ["O curso dá certificado?", "Não. O curso ajuda você a aprender e a se preparar, mas não emite certificado. Para comprovar o nível, faça um exame oficial como Cambridge (KET, PET, FCE, CAE, CPE), TOEFL, IELTS ou TOEIC, e treine antes com os nossos simulados gratuitos."],
  ["O teste de nível mostra meu nível CEFR oficial?", "O teste indica uma faixa de referência do CEFR para você escolher a primeira aula. É uma orientação rápida, não uma certificação: só exames oficiais comprovam o nível."],
  ["Quais simulados de inglês estão disponíveis?", "São 55 simulados gratuitos com correção comentada em português: ENEM (inglês), Cambridge A2 Key, B1 Preliminary, B2 First, C1 Advanced e C2 Proficiency, IELTS Academic e General Training, TOEFL iBT e ITP e TOEIC Reading. Todos têm cronômetro opcional e estrutura parecida com a prova real."],
  ["Como funciona a pronúncia nas aulas?", "Cada frase tem um botão para ouvir a pronúncia em inglês americano, usando a voz do próprio navegador. Funciona no computador e no celular; a qualidade da voz varia conforme o aparelho."],
  ["Preciso criar conta? O progresso fica salvo?", "Você pode estudar sem conta. Com uma conta gratuita, o progresso das aulas fica salvo e você pode continuar de qualquer dispositivo. Uma conta de responsável pode ter até três perfis de aprendizagem."],
  ["O curso serve para crianças?", "Sim, com acompanhamento de um adulto. A conta é sempre de um responsável, que cria perfis para a família usando só um apelido e a faixa de idade, sem e-mail ou outros dados das crianças."],
  ["Posso usar o curso com meus alunos?", "Pode. Professores, escolas e projetos sociais podem indicar as aulas e os simulados gratuitamente. Veja a página de parcerias para outras formas de colaborar."],
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: questions.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
};

export default function FaqPage() {
  return <main className="inner-page"><JsonLd data={[faqSchema, breadcrumbs([["Início", "/"], ["Perguntas frequentes", "/faq"]])]} /><div className="wrap inner-wrap"><div className="inner-heading"><p className="section-kicker">RESPOSTAS DIRETAS</p><h1>Perguntas frequentes sobre o curso de inglês grátis</h1><p>Gratuidade, certificado, teste de nível, simulados e conta: as respostas mais procuradas, sem rodeios.</p></div><div className="faq-page-list">{questions.map(([question, answer], index) => <details key={question}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}</summary><p>{answer}</p></details>)}</div></div></main>;
}
