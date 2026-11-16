# Inglês

Plataforma gratuita de aprendizado de inglês, com aulas organizadas por faixa etária e nível, exercícios de pronúncia com Web Speech API, simulados, provas e acompanhamento de progresso.

## Status

MVP público responsivo em desenvolvimento: páginas informativas, trilha e aula demonstrativas, diagnóstico orientativo e painel de progresso local. Autenticação, sincronização Supabase, catálogo completo, painel administrativo e anúncios ainda não estão ativos.

## Stack

- Next.js App Router e TypeScript
- Vercel: hospedagem e deploy
- Supabase: autenticação e futuro armazenamento de progresso
- Markdown/MDX: fonte inicial planejada para conteúdo público de aulas

## Requisitos locais

- Node.js 20.9 ou superior
- npm

## Executar localmente

1. Instale as dependências com `npm install`.
2. Copie `.env.example` para `.env.local` se for testar a integração Supabase futura; a demonstração pública atual não exige essas variáveis.
3. Inicie o ambiente com `npm run dev` e abra `http://localhost:3000`.

Comandos de validação: `npm run lint`, `npm run typecheck` e `npm run build`.

## Variáveis de ambiente

- `NEXT_PUBLIC_SUPABASE_URL`: URL pública do projeto Supabase.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: chave pública `anon`/`publishable` do projeto; nunca use `service_role` aqui.
- `NEXT_PUBLIC_SITE_URL`: origem do site para URLs canônicas. Em produção, atualizar após conectar o domínio.

Não versione `.env.local` nem coloque segredos em variáveis `NEXT_PUBLIC_*`.
