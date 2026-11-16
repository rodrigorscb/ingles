import type { Metadata } from "next";

export const metadata: Metadata = { title: "Perguntas frequentes", description: "Respostas sobre o curso gratuito de inglês, níveis, diagnóstico, pronúncia e contas.", alternates: { canonical: "/faq" }, openGraph: { title: "Perguntas frequentes", description: "Respostas sobre o curso gratuito de inglês, níveis, diagnóstico, pronúncia e contas.", url: "/faq" } };

const questions = [
  ["O curso é realmente gratuito?", "Sim. A proposta é disponibilizar gratuitamente o conteúdo principal de aprendizagem. A versão atual é um protótipo público; ainda estamos construindo o catálogo completo e as funcionalidades de conta."],
  ["Preciso saber inglês para começar?", "Não. A trilha começa no A1, com vocabulário e frases do cotidiano. Você também pode experimentar o diagnóstico orientativo para receber uma sugestão inicial."],
  ["O diagnóstico comprova meu nível CEFR?", "Não. É uma atividade curta de demonstração, sem validação psicométrica. Não substitui uma avaliação profissional ou exame oficial de certificação."],
  ["Posso praticar pronúncia no celular?", "A leitura de voz usa a Web Speech API quando o navegador e o dispositivo oferecem suporte. A qualidade e as vozes variam. O conteúdo textual permanece disponível para prática manual."],
  ["O curso salva meu progresso?", "Nesta demonstração, um exemplo pode ser guardado somente no armazenamento local deste navegador. Não há conta real nem sincronização com Supabase. O navegador pode apagar esses dados."],
  ["Haverá perfis para crianças?", "A estrutura planejada é uma conta de responsável com até três perfis de aprendizagem. Cadastro infantil e coleta de dados não estão ativos; consentimento, privacidade e regras aplicáveis serão definidos antes da implementação."],
  ["Como funcionam anúncios?", "Não há anúncios ativos. Qualquer monetização futura dependerá de aprovação da plataforma, avisos de privacidade, consentimento aplicável e revisão das políticas para conteúdo voltado a menores."],
  ["Posso usar o conteúdo para obter um certificado?", "Não. O curso pode apoiar estudos, mas não emite certificados nem representa uma instituição certificadora."],
];

export default function FaqPage() {
  return <main className="inner-page"><div className="wrap inner-wrap"><div className="inner-heading"><p className="section-kicker">RESPOSTAS DIRETAS</p><h1>O que você quer<br/>saber primeiro?</h1><p>Se algo ainda está sendo construído, dizemos claramente.</p></div><div className="faq-page-list">{questions.map(([question, answer], index) => <details key={question}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}</summary><p>{answer}</p></details>)}</div></div></main>;
}
