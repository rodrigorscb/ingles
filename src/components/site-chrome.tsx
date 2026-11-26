import Link from "next/link";
import Image from "next/image";
import { SiteSearch } from "@/components/site-search";
import { HeaderActions } from "@/components/header-actions";

const links = [
  ["Curso", "/curso"], ["Diagnóstico", "/diagnostico"], ["Simulados", "/simulados"], ["Blog", "/blog"], ["Para parceiros", "/parceiros"],
] as const;

export function SiteHeader() {
  return <header className="site-header"><Link href="/" className="brand" aria-label="Curso de Inglês Gratuito — início"><Image className="brand-logo" src="/brand/curso-ingles-icon.jpg" alt="" width={512} height={512} priority /><span className="brand-name" aria-hidden="true">Curso de<br/><b>Inglês <i>Grátis</i></b></span><span className="sr-only">Curso de Inglês Gratuito</span></Link><nav className="main-nav" aria-label="Navegação principal">{links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</nav><SiteSearch /><HeaderActions /><details className="mobile-menu"><summary aria-label="Abrir menu"><span></span><span></span><span></span></summary><nav aria-label="Navegação móvel">{links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}<Link href="/login?mode=signup">Criar conta grátis</Link><Link href="/login?mode=signin">Entrar</Link><Link href="/progresso">Meu progresso</Link><Link href="/faq">Perguntas frequentes</Link><Link href="/sobre">Sobre o projeto</Link><SiteSearch mobile /></nav></details></header>;
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="footer-main"><Link href="/" className="brand footer-brand" aria-label="Curso de Inglês Gratuito — início"><Image className="brand-logo footer-logo" src="/brand/curso-ingles-icon.jpg" alt="" width={512} height={512} /><span className="brand-name" aria-hidden="true">Curso de<br/><b>Inglês <i>Grátis</i></b></span><span className="sr-only">Curso de Inglês Gratuito</span></Link><p>Aprender inglês deve abrir portas,<br/>não criar mais uma barreira.</p><div className="footer-links"><Link href="/faq">Perguntas frequentes</Link><Link href="/parceiros">Parcerias</Link><Link href="/sobre">Sobre</Link><Link href="/privacidade">Privacidade</Link><Link href="/termos">Termos de uso</Link></div></div><div className="footer-bottom"><span>Curso de inglês grátis e online: aulas do A1 ao C2, teste de nível e simulados.</span><span>© {new Date().getFullYear()} Curso de Inglês Gratuito</span></div></footer>;
}
