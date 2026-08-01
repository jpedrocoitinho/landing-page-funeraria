# Portfólio SC Funerária

Landing page institucional premium para uma funerária, desenvolvida em HTML, CSS e JavaScript puro. O projeto prioriza acolhimento, serenidade, confiança e atendimento imediato sem assumir aparência de catálogo de serviços.

Este documento também funciona como guia de continuidade para desenvolvedores e outras IAs.

## Visão do projeto

O site deve comunicar que a família será acompanhada em todas as etapas. A linguagem visual combina:

- composição editorial e cinematográfica;
- bastante espaço negativo;
- títulos serifados de grande impacto;
- textos curtos e objetivos;
- preto profundo, creme e dourado;
- WhatsApp com alta visibilidade, sem dominar a página;
- fotografia real da funerária;
- movimentos suaves e discretos;
- experiência mobile first e totalmente responsiva.

O tom deve ser respeitoso. Evitar urgência comercial agressiva, excesso de efeitos, textos longos, cores vibrantes sem função e qualquer estética semelhante a marketplace.

## Estrutura de arquivos

```text
portifolio-funeraria/
├── assets/
│   └── img/                 # Fotografias, fundos, logo e ícones
├── css/
│   └── style.css            # Identidade visual, layout e responsividade
├── js/
│   └── script.js            # Menu, FAQ e animações GSAP
├── index.html               # Estrutura semântica da landing page
├── README.md                # Documentação do projeto
├── AGENTS.md                # Instruções do ambiente de desenvolvimento
└── RTK.md                   # Regras do utilitário de terminal
```

A estrutura foi mantida intencionalmente pequena. Não criar pastas adicionais sem necessidade real.

## Tecnologias e dependências

- HTML5 semântico;
- CSS3;
- JavaScript ES6+ sem framework;
- Google Fonts:
  - `Newsreader` para títulos;
  - `DM Sans` para navegação, textos e controles;
- GSAP 3.13 via CDN;
- ScrollTrigger via CDN.

Não existe etapa de build nem gerenciador de pacotes. Para visualizar:

1. abra `index.html` diretamente; ou
2. use um servidor local simples para testar navegação, carregamento e responsividade.

O GSAP depende de internet enquanto continuar sendo carregado por CDN.

## Identidade visual

As variáveis principais estão no início de `css/style.css`:

| Token | Valor | Uso |
|---|---:|---|
| `--preto` | `#000000` | fundos principais |
| `--preto-suave` | `#080705` | superfícies escuras |
| `--marrom` | `#4c3b1c` | sombras e transições quentes |
| `--dourado` | `#d4af37` | detalhes, linhas e destaques |
| `--creme` | `#f0ead6` | fundos claros e textos sobre preto |
| `--branco` | `#ffffff` | contraste principal |
| `--verde-whatsapp` | `#168b52` | ações de atendimento |

### Regras da paleta

- Dourado deve aparecer como detalhe, não como grande bloco decorativo.
- Verde é reservado para WhatsApp e disponibilidade.
- Seções escuras usam preto profundo, branco, cinza claro e dourado.
- Seções claras usam creme, marrom e dourado.
- Não introduzir azul, roxo, vermelho ou gradientes coloridos sem autorização.

## Tipografia

- Títulos principais: `Newsreader`, peso 400 ou 500.
- Textos e navegação: `DM Sans`, pesos 400 a 600.
- Títulos devem preservar ritmo editorial, boa quebra de linha e contraste.
- Parágrafos devem permanecer curtos, com altura de linha confortável.
- Não substituir as fontes sem revisar todas as quebras responsivas.

## Fluxo e seções

### 1. Cabeçalho

- Fixo, compacto e escuro.
- Logo à esquerda no desktop e centralizada no responsivo.
- Menu desktop centralizado com indicador dourado superior e inferior.
- Indicador retorna aos cantos quando o ponteiro sai da navegação.
- WhatsApp aparece à direita no desktop.
- No mobile, o menu ocupa a viewport em preto sólido.
- Os links mobile possuem acabamento escuro e partículas douradas discretas.
- O WhatsApp é a última opção do menu responsivo.

Não alterar o menu mobile para dropdown parcial ou fundo transparente.

### 2. Hero — `#inicio`

- Deve ser a seção de maior impacto.
- Usa `assets/img/background-coroa.png`.
- Título atual: “O suporte certo no momento em que sua família mais precisa”.
- Pouco texto e apenas um CTA editorial.
- A rosa deve permanecer central, escura e legível atrás do título.
- Evitar adicionar cards, listas ou várias chamadas nessa área.

### 3. Bem-vindo — `#acolhimento`

- Composição inspirada em editorial premium.
- Conteúdo claro à esquerda e fotografia real da fachada à direita.
- Fundo transita do creme iluminado para tons sépia e preto.
- A fotografia possui recorte elíptico na lateral esquerda no desktop.
- O WhatsApp desktop usa relevo 3D inspirado no Uiverse:
  - sombra externa em repouso;
  - sombra interna ao pressionar;
  - efeito restrito a desktop.
- Mobile usa botão verde plano para reduzir ruído e melhorar desempenho.
- A legenda “Estrutura preparada para acolher” permanece compacta sobre a imagem.
- Os compromissos são Respeito, Sensibilidade e Confiança.

### 4. Galeria

- Composição editorial estática sobre `background-galeria.png`.
- `estrutura-galeria.png`, `capela-homenagens.png` e `funeraria.webp` formam o mosaico fotográfico.
- A lista lateral apresenta os ambientes com numeração, título e descrição curta.
- No mobile, título, mosaico e informações passam para uma única coluna.
- Preservar contraste, cortes fotográficos e bastante espaço negativo.

### 5. Serviços — `#servicos`

- Título: “Como podemos ajudar sua família”.
- Não usar cards nem grid comercial.
- A jornada é uma timeline editorial alternada.
- A linha percorre lateralmente cada conteúdo antes de seguir à próxima etapa.
- A animação GSAP controla somente a linha.
- Etapas atuais:
  1. Organização completa da cerimônia;
  2. Traslado nacional e internacional;
  3. Cremação;
  4. Sepultamento;
  5. Documentação.

### 6. Fluxo de atendimento — `#atendimento`

- FAQ/accordion leve e editorial.
- Etapas:
  1. Contato;
  2. Orientação imediata;
  3. Providências legais;
  4. Preparação da cerimônia;
  5. Acompanhamento até o encerramento.

### 7. Localização — `#localizacao`

- Composição escura em duas colunas com conteúdo e mapa incorporado.
- O mapa aponta para a unidade Grande Florianópolis, na Rua Líbia Cruz, 332, Estreito.
- Os links de rota e endereço devem ser atualizados juntos para evitar informações divergentes.
- No mobile, conteúdo, ações e mapa são empilhados.

### 8. Planos — `#planos`

- Composição editorial clara com três níveis: Essencial, Amparo e Completo.
- O plano Amparo ocupa a posição central no desktop e aparece primeiro no mobile.
- Não publicar preços fictícios; manter “Sob consulta” até o cliente fornecer os valores.
- Cada plano possui acesso direto ao WhatsApp com mensagem contextual.
- Preservar o contraste entre os planos claros e o plano recomendado em fundo preto.
- Apenas uma etapa fica aberta.
- A expansão usa `grid-template-rows`, evitando `max-height` arbitrário.
- O JavaScript atualiza somente a etapa anterior e a selecionada.
- Manter `aria-expanded`, `aria-hidden` e `inert`.

## Responsividade

Breakpoints principais existentes:

- até `699px`: celulares;
- `700px` a `799px`: transição para tablet;
- até `899px`: timeline mobile;
- até `979px`: navegação responsiva;
- a partir de `980px`: desktop.

### Requisitos obrigatórios

- Não criar rolagem horizontal na página.
- Textos nunca podem tocar as bordas.
- Fotografias devem usar `object-fit: cover`.
- Componentes clicáveis precisam ter área confortável para toque.
- O menu mobile deve permanecer totalmente preto quando aberto.
- Scrollbars visuais ficam ocultas no responsivo, mas o scroll precisa continuar funcional.
- Testar pelo menos em 320, 375, 414, 768, 1024, 1366 e 1440 px.
- Avaliar nitidez no DevTools em 100%; a escala de 50% reamostra textos e imagens.

## Animações e desempenho

### GSAP

A timeline de serviços usa GSAP + ScrollTrigger com `scrub`. A linha deve acompanhar o scroll sem animar textos, números ou ícones.

Regras:

- não adicionar listeners manuais de scroll;
- não criar loops;
- preferir `transform`, `scale` e `strokeDashoffset`;
- manter uma única configuração de ScrollTrigger por percurso;
- respeitar `prefers-reduced-motion`;
- evitar filtros animados, blur animado e sombras grandes em movimento.

### FAQ

- Não voltar a usar animação baseada em `max-height`.
- Não percorrer todos os botões a cada clique.
- Alterações visuais leves devem usar `transform` e `opacity`.

### Carrossel

- Não bloquear o scroll vertical da página.
- Preservar `passive: true` em eventos touch quando aplicável.
- Não aumentar a frequência do autoplay sem necessidade.

## UX, acessibilidade e conteúdo

- Manter `lang="pt-BR"`.
- Imagens informativas precisam de `alt`.
- Ícones decorativos usam `aria-hidden="true"`.
- Links externos usam `target="_blank"` e `rel="noopener"`.
- O menu e o FAQ precisam funcionar por teclado.
- Preservar foco visível.
- Respeitar `prefers-reduced-motion`.
- Não inserir conteúdo sensacionalista sobre perda ou luto.
- Usar linguagem acolhedora, objetiva e humana.

## Convenções de código

- Classes e comentários em português do Brasil.
- Nomes devem descrever função, não aparência temporária.
- HTML continua semântico.
- CSS permanece dividido por comentários de seção.
- JavaScript deve ser simples e sem dependências além de GSAP.
- Não adicionar framework apenas para um componente.
- Não usar estilos inline.
- Evitar seletores genéricos que afetem componentes externos.
- Toda alteração visual deve ser conferida em desktop e mobile.

## O que não fazer

- Não transformar serviços em quatro ou cinco cards.
- Não criar grids genéricos de catálogo.
- Não preencher a hero com informações secundárias.
- Não animar todos os elementos ao mesmo tempo.
- Não substituir a fotografia real por imagem genérica sem autorização.
- Não aumentar excessivamente botões ou textos.
- Não remover WhatsApp da hierarquia principal.
- Não usar classes em inglês para novos componentes.

## Pontos que exigem configuração

### WhatsApp

O número atual é demonstrativo:

```text
5511999999999
```

Antes da publicação, substituir todas as ocorrências pelo número real com DDI e DDD.

### Navegação futura

Os links `#planos` e `#contato` já existem no menu, mas essas seções ainda precisam ser implementadas. Até isso acontecer, não considerar a landing page finalizada para produção.

### Logo

`assets/img/logo.png` possui uma grande área transparente ao redor da marca. Para máxima nitidez no header, o ideal é substituir por um PNG transparente recortado rente ao símbolo e ao texto, ou por um SVG oficial. Não redesenhar a logo por IA.

## Checklist antes de publicar

- [ ] Trocar o WhatsApp demonstrativo.
- [ ] Implementar ou remover temporariamente os links de Planos e Contato.
- [ ] Confirmar textos, endereço e disponibilidade com o cliente.
- [ ] Otimizar imagens finais em WebP/AVIF quando possível.
- [ ] Validar o site em dispositivos físicos.
- [ ] Validar navegação por teclado.
- [ ] Validar contraste e textos alternativos.
- [ ] Confirmar carregamento do GSAP em produção.
- [ ] Revisar política de privacidade, cookies e dados de contato.

## Orientação para outra IA

Antes de alterar:

1. leia este README por completo;
2. examine a seção correspondente em `index.html`;
3. localize o bloco comentado em `css/style.css`;
4. confira a lógica relacionada em `js/script.js`;
5. preserve alterações existentes que não pertencem à tarefa;
6. implemente a menor mudança capaz de cumprir o pedido;
7. valide caminhos, sintaxe JavaScript, desktop e mobile;
8. descreva claramente o que mudou.

Quando a solicitação for ambígua, priorize a identidade já estabelecida: premium, sóbria, humana, limpa e cinematográfica.
