const botaoMenu = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");
const header = document.querySelector("[data-header]");

document.querySelectorAll("[data-ano-atual]").forEach((elemento) => {
  elemento.textContent = String(new Date().getFullYear());
});

document.querySelector("[data-voltar-topo]")?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
  });
});

function closeMenu() {
  if (!botaoMenu || !menu) return;
  botaoMenu.checked = false;
  botaoMenu.setAttribute("aria-expanded", "false");
  botaoMenu.setAttribute("aria-label", "Abrir menu");
  menu.classList.remove("aberto");
  document.body.classList.remove("menu-aberto");
}

if (botaoMenu && menu) {
  botaoMenu.addEventListener("change", () => {
    const estaAberto = botaoMenu.checked;
    botaoMenu.setAttribute("aria-expanded", String(estaAberto));
    botaoMenu.setAttribute("aria-label", estaAberto ? "Fechar menu" : "Abrir menu");
    menu.classList.toggle("aberto", estaAberto);
    document.body.classList.toggle("menu-aberto", estaAberto);
  });

  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
}

window.addEventListener("resize", () => {
  if (window.innerWidth >= 980) closeMenu();
});

window.addEventListener("scroll", () => {
  header.classList.toggle("rolado", window.scrollY > 16);
}, { passive: true });

// ESTADO ATIVO DA NAVEGAÇÃO
const linksNavegacao = [...document.querySelectorAll(".links-navegacao > a[href^='#']")];
const secoesNavegacao = linksNavegacao
  .map((link) => ({
    link,
    secao: document.querySelector(link.getAttribute("href")),
  }))
  .filter((item) => item.secao);
let atualizacaoNavegacaoAgendada = false;

function ativarLinkNavegacao(linkAtivo) {
  linksNavegacao.forEach((link) => {
    const estaAtivo = link === linkAtivo;
    link.classList.toggle("ativo", estaAtivo);
    if (estaAtivo) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function atualizarLinkPelaRolagem() {
  const referenciaVisual = header.offsetHeight + window.innerHeight * 0.26;
  const secoesOrdenadas = [...secoesNavegacao].sort(
    (itemA, itemB) =>
      itemA.secao.getBoundingClientRect().top - itemB.secao.getBoundingClientRect().top,
  );
  let itemAtual = secoesOrdenadas[0];

  secoesOrdenadas.forEach((item) => {
    if (item.secao.getBoundingClientRect().top <= referenciaVisual) itemAtual = item;
  });

  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 3) {
    itemAtual = secoesOrdenadas[secoesOrdenadas.length - 1];
  }

  if (itemAtual) ativarLinkNavegacao(itemAtual.link);
  atualizacaoNavegacaoAgendada = false;
}

linksNavegacao.forEach((link) => {
  link.addEventListener("click", () => ativarLinkNavegacao(link));
});

window.addEventListener("scroll", () => {
  if (atualizacaoNavegacaoAgendada) return;
  atualizacaoNavegacaoAgendada = true;
  requestAnimationFrame(atualizarLinkPelaRolagem);
}, { passive: true });

window.addEventListener("resize", atualizarLinkPelaRolagem);
atualizarLinkPelaRolagem();

// SELEÇÃO INTERATIVA DOS PLANOS
const cartoesPlanos = document.querySelectorAll(".plano");

function selecionarPlano(planoSelecionado) {
  if (planoSelecionado.classList.contains("selecionado")) return;

  cartoesPlanos.forEach((plano) => {
    plano.classList.toggle("selecionado", plano === planoSelecionado);
  });
}

cartoesPlanos.forEach((plano) => {
  plano.addEventListener("click", (evento) => {
    if (evento.target.closest("a")) return;
    selecionarPlano(plano);
  });

  plano.addEventListener("keydown", (evento) => {
    if (evento.key !== "Enter" && evento.key !== " ") return;
    if (evento.target.closest("a")) return;
    evento.preventDefault();
    selecionarPlano(plano);
  });
});

// ETAPAS DO ATENDIMENTO
const botoesEtapas = document.querySelectorAll(".botao-etapa");
let botaoEtapaAberta = null;

function definirEstadoEtapa(botao, abrir) {
  const detalhe = document.getElementById(botao.getAttribute("aria-controls"));

  botao.setAttribute("aria-expanded", String(abrir));
  detalhe.setAttribute("aria-hidden", String(!abrir));
  detalhe.inert = !abrir;
}

botoesEtapas.forEach((botao) => {
  botao.addEventListener("click", () => {
    const estavaAberto = botao.getAttribute("aria-expanded") === "true";

    if (botaoEtapaAberta && botaoEtapaAberta !== botao) {
      definirEstadoEtapa(botaoEtapaAberta, false);
    }

    definirEstadoEtapa(botao, !estavaAberto);
    botaoEtapaAberta = estavaAberto ? null : botao;
  });
});

// CARROSSEL DE AVALIAÇÕES
const carrosselAvaliacoes = document.querySelector("[data-carrossel-avaliacoes]");

if (carrosselAvaliacoes) {
  const janelaAvaliacoes = carrosselAvaliacoes.querySelector(".carrossel-avaliacoes-janela");
  const cartoesAvaliacoes = [...carrosselAvaliacoes.querySelectorAll(".cartao-avaliacao")];
  const pontosAvaliacoes = [...carrosselAvaliacoes.querySelectorAll("[data-indice-avaliacao]")];
  const botaoAnterior = carrosselAvaliacoes.querySelector("[data-avaliacao-anterior]");
  const botaoProximo = carrosselAvaliacoes.querySelector("[data-avaliacao-proxima]");
  const estrelasAvaliacoes = document.querySelector(".avaliacoes-estrelas");
  const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let indiceAvaliacao = 0;
  let rolagemAgendada = false;
  let ultimaTrocaPelaRoda = 0;
  let temporizadorEstrelas = null;

  function animarEstrelas() {
    if (!estrelasAvaliacoes) return;
    const estrelas = [...estrelasAvaliacoes.children];
    const posicoesIniciais = [
      [-28, 20, -38],
      [-18, 12, -22],
      [-8, 7, -8],
      [4, 12, 18],
      [16, 20, 34],
    ];

    estrelas.forEach((estrela, indice) => {
      estrela.getAnimations().forEach((animacao) => animacao.cancel());
      const [x, y, rotacao] = posicoesIniciais[indice];

      estrela.animate(
        [
          {
            opacity: 0,
            color: "#8e6c13",
            textShadow: "0 0 0 rgba(212, 175, 55, 0)",
            transform: `translate3d(${x}px, ${y}px, 0) scale(0.2) rotate(${rotacao}deg)`,
          },
          {
            opacity: 1,
            color: "#fff0a0",
            textShadow: "0 0 16px rgba(245, 205, 72, 0.9)",
            transform: "translate3d(0, 0, 0) scale(1.28) rotate(0deg)",
            offset: 0.7,
          },
          {
            opacity: 1,
            color: "#d4af37",
            textShadow: "0 0 6px rgba(212, 175, 55, 0.35)",
            transform: "translate3d(0, 0, 0) scale(1) rotate(0deg)",
          },
        ],
        {
          duration: 760,
          delay: indice * 82,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          fill: "both",
        },
      );
    });
  }

  function agendarAnimacaoEstrelas(atraso = 130) {
    window.clearTimeout(temporizadorEstrelas);
    temporizadorEstrelas = window.setTimeout(animarEstrelas, atraso);
  }

  function atualizarEstadoAvaliacao(animarEstrelasAtivas = true) {
    cartoesAvaliacoes.forEach((cartao, indice) => {
      const ativo = indice === indiceAvaliacao;
      cartao.setAttribute("aria-hidden", String(!ativo));
      cartao.querySelector("a")?.setAttribute("tabindex", ativo ? "0" : "-1");
    });

    pontosAvaliacoes.forEach((ponto, indice) => {
      const ativo = indice === indiceAvaliacao;
      ponto.classList.toggle("ativo", ativo);
      ponto.setAttribute("aria-selected", String(ativo));
    });

    const nota = Number(cartoesAvaliacoes[indiceAvaliacao]?.dataset.nota || 5);
    estrelasAvaliacoes?.setAttribute("aria-label", `${nota} de 5 estrelas`);
    botaoAnterior?.toggleAttribute("disabled", indiceAvaliacao === 0);
    botaoProximo?.toggleAttribute("disabled", indiceAvaliacao === cartoesAvaliacoes.length - 1);
    if (animarEstrelasAtivas) animarEstrelas();
  }

  function mostrarAvaliacao(novoIndice) {
    const indiceLimitado = Math.max(0, Math.min(novoIndice, cartoesAvaliacoes.length - 1));
    if (indiceLimitado === indiceAvaliacao) return;

    indiceAvaliacao = indiceLimitado;
    atualizarEstadoAvaliacao(false);
    janelaAvaliacoes.scrollTo({
      left: janelaAvaliacoes.clientWidth * indiceAvaliacao,
      behavior: reduzirMovimento ? "auto" : "smooth",
    });
    agendarAnimacaoEstrelas(reduzirMovimento ? 30 : 520);
  }

  botaoAnterior?.addEventListener("click", () => mostrarAvaliacao(indiceAvaliacao - 1));
  botaoProximo?.addEventListener("click", () => mostrarAvaliacao(indiceAvaliacao + 1));
  pontosAvaliacoes.forEach((ponto) => {
    ponto.addEventListener("click", () => mostrarAvaliacao(Number(ponto.dataset.indiceAvaliacao)));
  });

  janelaAvaliacoes.addEventListener("scroll", () => {
    if (rolagemAgendada) return;
    rolagemAgendada = true;

    requestAnimationFrame(() => {
      const novoIndice = Math.round(janelaAvaliacoes.scrollLeft / janelaAvaliacoes.clientWidth);
      if (novoIndice !== indiceAvaliacao && cartoesAvaliacoes[novoIndice]) {
        indiceAvaliacao = novoIndice;
        atualizarEstadoAvaliacao(false);
      }
      agendarAnimacaoEstrelas(150);
      rolagemAgendada = false;
    });
  }, { passive: true });

  janelaAvaliacoes.addEventListener("wheel", (evento) => {
    if (Math.abs(evento.deltaX) >= Math.abs(evento.deltaY) || Math.abs(evento.deltaY) < 16) return;

    const direcao = evento.deltaY > 0 ? 1 : -1;
    const podeAvancar = direcao > 0 && indiceAvaliacao < cartoesAvaliacoes.length - 1;
    const podeVoltar = direcao < 0 && indiceAvaliacao > 0;
    if (!podeAvancar && !podeVoltar) return;

    evento.preventDefault();
    const agora = performance.now();
    if (agora - ultimaTrocaPelaRoda < 520) return;
    ultimaTrocaPelaRoda = agora;
    mostrarAvaliacao(indiceAvaliacao + direcao);
  }, { passive: false });

  carrosselAvaliacoes.addEventListener("keydown", (evento) => {
    if (evento.key === "ArrowLeft") mostrarAvaliacao(indiceAvaliacao - 1);
    if (evento.key === "ArrowRight") mostrarAvaliacao(indiceAvaliacao + 1);
  });

  const observadorCarrossel = new ResizeObserver(() => {
    janelaAvaliacoes.scrollLeft = janelaAvaliacoes.clientWidth * indiceAvaliacao;
  });
  observadorCarrossel.observe(janelaAvaliacoes);
  atualizarEstadoAvaliacao(false);

  const composicaoAvaliacoes = document.querySelector(".avaliacoes-composicao");
  const observadorEstrelas = new IntersectionObserver((entradas, observador) => {
    if (!entradas[0].isIntersecting) return;

    window.setTimeout(animarEstrelas, 820);
    observador.disconnect();
  }, { threshold: 0.28 });

  if (composicaoAvaliacoes) observadorEstrelas.observe(composicaoAvaliacoes);
}

// LINHA ANIMADA DA JORNADA
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  const reduzirMovimentoLinha = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const caminhosJornada = gsap.utils.toArray(".trilha-progresso");

  if (reduzirMovimentoLinha) {
    gsap.set(caminhosJornada, { clipPath: "inset(0% 0% 0% 0%)" });
  } else {
    const contextoLinha = gsap.matchMedia();

    contextoLinha.add(
      {
        desktop: "(min-width: 900px)",
        responsivo: "(max-width: 899px)",
      },
      (contexto) => {
        const seletor = contexto.conditions.desktop
          ? ".trilha-jornada .trilha-progresso"
          : ".trilha-celular .trilha-progresso";
        const caminhoVisivel = document.querySelector(seletor);

        if (!caminhoVisivel) return undefined;

        gsap.set(caminhoVisivel, {
          clipPath: "inset(0% 0% 100% 0%)",
          force3D: true,
        });

        const animacaoLinha = gsap.to(caminhoVisivel, {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: ".linha-do-tempo",
            start: "top 55%",
            end: "bottom 18%",
            scrub: 0.2,
            invalidateOnRefresh: false,
          },
        });

        return () => {
          animacaoLinha.scrollTrigger?.kill();
          animacaoLinha.kill();
        };
      },
    );
  }
}

// REVELAÇÕES EDITORIAIS DAS SEÇÕES
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduzirMovimento) {
    const distancia = window.innerWidth < 820 ? 28 : 54;
    const configuracaoBase = {
      duration: 0.92,
      ease: "power3.out",
      force3D: true,
      clearProps: "transform,opacity,visibility",
    };

    function revelar(alvos, gatilho, propriedades = {}) {
      const elementos = gsap.utils.toArray(alvos);
      if (!elementos.length || !document.querySelector(gatilho)) return;

      gsap.from(elementos, {
        ...configuracaoBase,
        autoAlpha: 0,
        ...propriedades,
        scrollTrigger: {
          trigger: gatilho,
          start: "top 84%",
          once: true,
        },
      });
    }

    gsap
      .timeline({ defaults: { duration: 0.9, ease: "power3.out" } })
      .from(".destaque .subtitulo-decorativo", { autoAlpha: 0, y: -18 })
      .from(".destaque h1", { autoAlpha: 0, y: 34 }, "-=0.58");

    revelar(
      ".bem-vindo .rotulo-secao, .bem-vindo h2, .descricao-principal, .acoes-principais, .pilares-acolhimento",
      ".bem-vindo",
      { x: -distancia, stagger: 0.1 },
    );
    revelar(".bem-vindo-foto", ".bem-vindo", { x: distancia, duration: 1.08 });

    revelar(
      ".galeria-chamada, .galeria-apresentacao",
      ".galeria",
      { y: 36, stagger: 0.13 },
    );
    revelar(".galeria-mosaico", ".galeria-composicao", {
      x: -distancia,
      duration: 1.08,
    });
    revelar(".galeria-detalhes > li", ".galeria-composicao", {
      x: distancia,
      stagger: 0.1,
    });

    revelar(
      ".servicos > .servicos-container > .rotulo-secao, .servicos-titulo, .servicos-introducao",
      ".servicos",
      { y: 42, stagger: 0.11 },
    );

    gsap.utils.toArray(".etapa-jornada").forEach((etapa, indice) => {
      const conteudo = etapa.querySelector(".conteudo-etapa");
      const icone = etapa.querySelector(".icone-etapa");
      const direcao = indice % 2 === 0 ? -distancia : distancia;
      const animacao = gsap.timeline({
        scrollTrigger: {
          trigger: etapa,
          start: "top 82%",
          once: true,
        },
      });

      if (conteudo) {
        animacao.from(conteudo, {
          ...configuracaoBase,
          autoAlpha: 0,
          x: direcao,
        });
      }
      if (icone) {
        animacao.from(
          icone,
          {
            ...configuracaoBase,
            autoAlpha: 0,
            scale: 0.72,
            rotation: indice % 2 === 0 ? -7 : 7,
            duration: 0.72,
          },
          "-=0.58",
        );
      }
    });

    revelar(
      ".fluxo-atendimento .rotulo-secao, .fluxo-atendimento h2, .fluxo-introducao",
      ".fluxo-atendimento",
      { x: -distancia, stagger: 0.12 },
    );
    revelar(".etapas-atendimento", ".fluxo-atendimento", {
      x: distancia,
      duration: 1.02,
    });

    revelar(".localizacao-conteudo > *", ".localizacao", {
      x: -distancia,
      stagger: 0.09,
    });
    revelar(".localizacao-mapa", ".localizacao", {
      x: distancia,
      duration: 1.08,
    });

    revelar(".planos-cabecalho > *", ".planos", {
      y: 38,
      stagger: 0.12,
    });
    revelar(".lista-planos", ".planos-divisor", {
      y: 46,
      duration: 1.04,
    });
    revelar(".planos-rodape", ".lista-planos", {
      x: -distancia * 0.55,
      duration: 0.88,
    });

    revelar(".avaliacoes-cabecalho > *", ".avaliacoes", {
      y: 38,
      stagger: 0.12,
    });
    revelar(".avaliacoes-selo", ".avaliacoes-composicao", {
      x: -distancia,
    });
    revelar(".carrossel-avaliacoes", ".avaliacoes-composicao", {
      y: 44,
      duration: 1.08,
    });
    revelar(".avaliacoes-rodape > *", ".avaliacoes-rodape", {
      y: 22,
      stagger: 0.1,
    });
    revelar(".rodape-chamada > *", ".rodape-site", {
      y: 34,
      stagger: 0.12,
    });
    revelar(".rodape-informacoes > *", ".rodape-informacoes", {
      y: 24,
      stagger: 0.08,
    });
    revelar(".rodape-assinatura, .rodape-legal", ".rodape-assinatura", {
      y: 28,
      stagger: 0.12,
    });
  }
}
