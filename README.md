# Magon Fotografia & Audiovisual

Um website cinematográfico e editorial para a produtora visual **Magon Fotografia & Audiovisual**, posicionando a marca como um estúdio contemporâneo de fotografia, vídeo e direção visual.

## Visão Geral

Este projeto é um site premium que apresenta o portfólio de uma produtora visual autoral. A proposta é transformar a tradicional galeria de fotógrafo em uma experiência cinematográfica e editorial, onde o trabalho visual é o protagonista.

**Frase central da marca:**
> "Imagens que fazem momentos serem lembrados e marcas serem percebidas."

## Características

- **Hero cinematográfico** com manifesto curto e chamada-para-ação
- **Grid de projetos irregular** com design editorial moderno
- **Páginas individuais de projetos** com narrativa completa
- **Manifesto editorial** que explica a filosofia da marca
- **Seção de serviços** minimalista e premium
- **Behind-the-scenes** que humaniza a produtora
- **Tipografia cinematográfica** com Space Grotesk
- **Paleta de cores** elegante: creme, preto e tons neutros
- **Responsividade completa** mobile-first
- **Animações suaves** que não comprometem performance

## Tecnologia

- **Next.js 16** com App Router
- **React 19** com server components
- **TypeScript** para tipagem segura
- **Tailwind CSS v4** com tema customizado
- **Next.js Image** para otimização de imagens
- **Componentes reutilizáveis** bem estruturados

## Estrutura do Projeto

```
/app
  ├── page.tsx              # Home (integra todas as seções)
  ├── projects/
  │   └── [slug]/
  │       └── page.tsx      # Página individual de projeto
  ├── layout.tsx            # Layout global
  └── globals.css           # Estilos globais

/components
  ├── Navigation.tsx        # Navbar fixa
  ├── Hero.tsx             # Seção hero cinematográfica
  ├── ProjectGrid.tsx      # Grid de projetos
  ├── ProjectCard.tsx      # Card individual de projeto
  ├── Manifesto.tsx        # Seção editorial
  ├── Services.tsx         # Lista de serviços
  ├── BehindTheScenes.tsx  # Bastidores
  ├── Contact.tsx          # CTA de contato
  └── Footer.tsx           # Rodapé

/lib
  └── projects.ts          # Dados dos projetos (mock data)

/public
  ├── /projects            # Imagens dos projetos
  └── /                     # Imagens gerais
```

## Seções da Home

### 1. Hero Cinematográfico
- Vídeo/imagem em tela cheia
- Overlay com manifesto curto
- Botão CTA "VER PROJETOS"
- Indicador de scroll discreto

### 2. Trabalhos Selecionados
- Grid 3-colunas em desktop, responsivo em mobile
- Cada projeto exibe: imagem, categoria, nome, localização, ano e descrição
- Hover effect com zoom e "VER PROJETO"
- Animação ao carregar a página

### 3. Manifesto Editorial
- Texto bold com fundo escuro
- Tipografia grande e confiante
- Posiciona a marca como estúdio criativo

### 4. Serviços
- Lista minimalista sem preços
- 6 serviços principais
- Design clean com divisórias sutis

### 5. Directed by Magon
- Grid de 2 imagens behind-the-scenes
- Humaniza a produtora
- Mostra equipe e processo criativo

### 6. Contato
- Manifesto final com CTA forte
- Dois botões: WhatsApp e formulário
- Links para redes sociais e email

## Páginas Individuais de Projetos

Cada projeto tem sua própria página (`/projects/[slug]`) com:
- Header com botão voltar
- Imagem hero em tela cheia
- Detalhes: categoria, localização, ano
- Descrição completa do projeto
- Créditos
- CTA para próximo projeto
- Footer

## Customização

### Adicionar Novos Projetos

1. Abra `/lib/projects.ts`
2. Adicione um novo objeto ao array `projects`:

```typescript
{
  id: "7",
  slug: "novo-projeto",
  title: "Novo Projeto",
  category: "SHOWS",
  city: "São Paulo",
  year: 2024,
  description: "Descrição curta",
  image: "/projects/novo-projeto.png",
  fullDescription: "Descrição completa narrativa",
  credits: "Créditos",
}
```

3. Adicione a imagem em `/public/projects/`

### Atualizar Informações de Contato

- Email: `/components/Footer.tsx` e `/components/Contact.tsx`
- WhatsApp: `/components/Contact.tsx` (número no link)
- Redes sociais: `/components/Navigation.tsx`, `/components/Footer.tsx`

### Mudar Cores

As cores estão definidas em `/app/globals.css` na seção `@theme inline`:
- `--color-background`: Fundo principal (creme)
- `--color-foreground`: Texto principal (preto)
- Ajuste os valores OKLCH conforme necessário

### Mudar Tipografia

A fonte está configurada no `/app/layout.tsx`. Atualmente usa **Space Grotesk** do Google Fonts. Para mudar:

1. Altere a importação em `layout.tsx`
2. Atualize a variável CSS em `globals.css`

## Performance

- Next.js Image optimization automática
- Lazy loading de imagens
- Code splitting por seção
- CSS crítico inline
- Sem bloat de bibliotecas desnecessárias

## SEO

- Metadata configurada em `layout.tsx`
- Titles e descriptions otimizados
- Semantic HTML com headings corretos
- Open Graph pronto para compartilhamento

## Deployment

Pronto para deploy em Vercel:

```bash
git push origin main
# Será deployado automaticamente
```

Ou build local:

```bash
pnpm build
pnpm start
```

## Inspirações Visuais

- **COLLINS**: Manifesto forte e confiança visual
- **Aino**: Portfólio cinematográfico e editorial
- Studios contemporâneos: Grid irregular, tipografia grande, trabalho visual protagonista

## Roadmap Futuro

- [ ] Blog de insights visuais
- [ ] Integração com Whatsapp API
- [ ] Galeria interativa com scroll parallax
- [ ] Vídeos hero em lugar de imagens estáticas
- [ ] Dark mode toggle
- [ ] Filtro de projetos por categoria
- [ ] Integração com CMS (Sanity/Contentful)
