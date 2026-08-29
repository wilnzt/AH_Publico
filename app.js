const groups = [
  { id: "entrada", label: "Entrada", screens: ["welcome", "login", "empty"] },
  { id: "instalacao", label: "Instalação", screens: ["install", "identify", "prepare", "wifi", "name", "success"] },
  { id: "operacao", label: "Operação", screens: ["home", "confirm", "cycle", "result", "flow", "offline"] },
  { id: "historico", label: "Histórico", screens: ["history", "event"] },
  { id: "programacao", label: "Programações", screens: ["schedules", "schedule-edit", "schedule-cancel"] },
  { id: "config", label: "Configurações", screens: ["settings", "device", "account", "help"] }
];

const screens = {
  welcome: {
    id: "T02", title: "Boas-vindas", purpose: "Apresentar o benefício principal e conduzir para entrada ou criação de conta.",
    status: ["proposed"], questions: ["O texto representa corretamente o benefício do produto?", "Cadastro será aberto ao consumidor final?"],
    html: () => `<section class="app-screen hero-screen"><div class="screen-body centered"><div class="welcome-logo">R</div><span class="eyebrow" style="color:#72eee2">Seu banho começa antes de você</span><h1>Revolushower</h1><p class="lead">Prepare o sistema com antecedência e acompanhe cada ciclo com simplicidade.</p><div class="hero-actions"><button class="button aqua" data-go="login">Entrar</button><button class="button ghost" data-go="login">Criar minha conta</button></div></div></section>`
  },
  login: {
    id: "T03", title: "Entrar", purpose: "Autenticar o cliente para acessar instalações e equipamentos vinculados.",
    status: ["proposed", "validate"], questions: ["A conta usará e-mail, telefone ou ambos?", "Haverá login social no lançamento?"],
    html: () => shell("Entrar", `<h1 class="form-title">Bem-vindo de volta</h1><p class="form-lead">Acesse sua instalação Revolushower.</p><div class="field"><label>E-mail</label><input type="email" value="cliente@exemplo.com"></div><div class="field"><label>Senha</label><input type="password" value="12345678"></div><button class="text-button">Esqueci minha senha</button><button class="button" data-go="empty">Entrar</button><p class="form-footer">Ainda não possui conta? <b>Criar conta</b></p>`, {back:"welcome", noNav:true})
  },
  empty: {
    id: "T09", title: "Início sem equipamento", purpose: "Orientar o primeiro passo depois da criação da conta.",
    status: ["proposed"], questions: ["O cliente instala sozinho ou com auxílio do instalador?", "Qual termo usar: equipamento, instalação ou Revolushower?"],
    html: () => shell("Início", `<div class="screen-body centered"><div class="illustration">⌁</div><h2 class="empty-title">Adicione seu Revolushower</h2><p class="empty-copy">Vamos conectar o equipamento à sua conta e ao Wi‑Fi da residência.</p><button class="button aqua" data-go="install">Começar instalação</button><button class="text-button" data-go="help">Preciso de ajuda</button></div>`, {nav:"home"})
  },
  install: {
    id: "T11", title: "Adicionar instalação", purpose: "Explicar, em linguagem simples, o que será necessário para configurar o produto.",
    status: ["proposed", "validate"], questions: ["A embalagem terá QR Code?", "O botão físico será usado para confirmar a posse?"],
    html: () => stepShell("Adicionar Revolushower", 1, `<p class="step-label">Antes de começar</p><h1 class="form-title">Tenha o equipamento por perto</h1><p class="form-lead">Você precisará acessar o Revolushower e saber a senha do Wi‑Fi da residência.</p><div class="instruction-list"><div class="instruction"><b>1</b><span>Localize o QR Code na etiqueta ou embalagem.</span></div><div class="instruction"><b>2</b><span>Mantenha o celular próximo ao equipamento.</span></div><div class="instruction"><b>3</b><span>Confirme que sua rede Wi‑Fi está funcionando.</span></div></div><button class="button" data-go="identify">Continuar</button>`, "empty")
  },
  identify: {
    id: "T12", title: "Identificar equipamento", purpose: "Identificar o Master por QR Code ou código digitado.",
    status: ["proposed", "validate", "simulated"], questions: ["QR Code será gerado na fabricação?", "O código manual ficará visível na etiqueta?"],
    html: () => stepShell("Identificar equipamento", 2, `<p class="step-label">Etapa 2 de 5</p><h1 class="form-title">Aponte para o QR Code</h1><p class="form-lead">Enquadre toda a etiqueta. Nesta demonstração, o botão simula uma leitura válida.</p><div class="qr-frame"><span class="qr-symbol">▦</span></div><button class="button aqua" data-go="prepare">Simular leitura</button><button class="text-button">Digitar código manualmente</button>`, "install")
  },
  prepare: {
    id: "T14", title: "Preparar o Master", purpose: "Ensinar como colocar o equipamento em modo de configuração.",
    status: ["proposed", "validate"], questions: ["Qual gesto físico ativará o modo de configuração?", "Como o LED indicará esse estado?"],
    html: () => stepShell("Preparar equipamento", 3, `<p class="step-label">Etapa 3 de 5</p><h1 class="form-title">Ative o modo de configuração</h1><p class="form-lead">No Revolushower, mantenha o botão pressionado até o indicador luminoso começar a piscar.</p><div class="illustration">◉</div><div class="alert-card warning"><span>!</span><div>O gesto e o padrão do indicador ainda precisam ser confirmados no equipamento final.</div></div><button class="button" data-go="wifi">O indicador está piscando</button>`, "identify")
  },
  wifi: {
    id: "T18", title: "Selecionar Wi‑Fi", purpose: "Enviar ao Master as credenciais da rede residencial escolhida.",
    status: ["proposed", "simulated"], questions: ["O app mostrará redes encontradas pelo celular ou pelo Master?", "Como orientar redes somente 5 GHz?"],
    html: () => stepShell("Conectar ao Wi‑Fi", 4, `<p class="step-label">Etapa 4 de 5</p><h1 class="form-title">Escolha sua rede</h1><p class="form-lead">O Revolushower utiliza uma rede Wi‑Fi compatível de 2,4 GHz.</p><div class="network-option selected"><span>⌁</span><div><strong>Casa Silva</strong><small>Sinal forte · 2,4 GHz</small></div><b>✓</b></div><div class="network-option"><span>⌁</span><div><strong>Casa Silva — Visitantes</strong><small>Sinal médio</small></div></div><div class="field"><label>Senha da rede</label><input type="password" value="senhawifi"></div><button class="button" data-go="name">Conectar</button>`, "prepare")
  },
  name: {
    id: "T19", title: "Nomear instalação", purpose: "Dar um nome reconhecível para a instalação e seu ambiente.",
    status: ["proposed", "validate"], questions: ["Uma conta poderá possuir várias instalações?", "Ambiente e nome da instalação serão campos separados?"],
    html: () => stepShell("Identificar instalação", 5, `<p class="step-label">Etapa 5 de 5</p><h1 class="form-title">Onde está seu Revolushower?</h1><p class="form-lead">Esse nome aparecerá no início, no histórico e no suporte.</p><div class="field"><label>Nome da instalação</label><input value="Minha casa"></div><div class="field"><label>Ambiente</label><select><option>Banheiro principal</option><option>Banheiro social</option><option>Outro</option></select></div><button class="button" data-go="success">Concluir instalação</button>`, "wifi")
  },
  success: {
    id: "T19A", title: "Instalação concluída", purpose: "Confirmar que conta, equipamento e rede foram conectados.",
    status: ["proposed", "simulated"], questions: ["A conclusão depende de confirmação do backend e do Master?", "Devemos oferecer teste guiado neste momento?"],
    html: () => shell("Tudo pronto", `<div class="screen-body centered"><div class="result-icon">✓</div><h2 class="empty-title">Revolushower conectado</h2><p class="empty-copy">Banheiro principal está online e pronto para ser utilizado.</p><button class="button aqua" data-go="home">Ir para o início</button></div>`, {noNav:true})
  },
  home: {
    id: "T20", title: "Início — disponível", purpose: "Mostrar o estado confirmado e destacar a ação principal de pré-aquecimento.",
    status: ["proposed"], questions: ["Pré-aquecimento é o nome correto para o cliente final?", "A ação deve exigir confirmação sempre?"],
    html: () => `<section class="app-screen"><div class="app-scroll"><div class="home-hero"><div class="home-location"><div><small>Minha casa</small><strong>Banheiro principal</strong></div><span class="online-pill">Online</span></div><div class="status-orb"><div class="status-orb-inner"><span>ESTADO ATUAL</span><strong>Disponível</strong><small>Pronto para pré-aquecer</small></div></div><p class="hero-note">Estado atualizado agora</p><button class="button warm" data-go="confirm">Iniciar pré-aquecimento</button></div><div class="quick-grid"><button class="quick-card" data-go="history"><span>◷</span><strong>Histórico</strong><small>Últimos ciclos</small></button><button class="quick-card" data-go="device"><span>⌁</span><strong>Equipamento</strong><small>Dados e conexão</small></button></div></div>${bottomNav("home")}</section>`
  },
  confirm: {
    id: "T21", title: "Confirmar pré-aquecimento", purpose: "Evitar acionamento acidental e explicar que o Master ainda validará segurança e disponibilidade.",
    status: ["proposed", "validate"], questions: ["A confirmação será obrigatória?", "O usuário precisa escolher duração ou o tempo será definido pelo Master?"],
    html: () => `<section class="app-screen modal-screen"><div class="sheet"><div class="sheet-handle"></div><div class="sheet-icon">≈</div><h2>Iniciar pré-aquecimento?</h2><p>O Revolushower verificará as condições do sistema antes de acionar a bomba.</p><div class="safety-note"><span>ⓘ</span><span>O comando poderá ser recusado se o equipamento estiver ocupado, offline ou temporariamente bloqueado.</span></div><div class="button-row"><button class="button secondary" data-go="home">Voltar</button><button class="button aqua" data-go="cycle">Confirmar</button></div></div></section>`
  },
  cycle: {
    id: "T22", title: "Ciclo em andamento", purpose: "Acompanhar somente informações confirmadas pelo Master e permitir cancelamento seguro.",
    status: ["proposed", "validate", "simulated"], questions: ["O firmware disponibilizará tempo restante confiável?", "Cancelamento será permitido durante delay e bomba ativa?"],
    html: () => `<section class="app-screen"><div class="cycle-hero"><span class="cycle-label">Pré-aquecimento</span><h2>Em andamento</h2><p>O comando foi aceito pelo Revolushower.</p><div class="progress-ring"><div class="progress-inner"><strong>00:12</strong><span>DECORRIDOS</span></div></div><div class="timeline"><div class="done">Solicitado</div><div class="done">Aceito</div><div>Concluído</div></div><button class="button danger" data-go="result">Cancelar pré-aquecimento</button><button class="text-button" style="color:white" data-go="result">Simular conclusão</button></div></section>`
  },
  result: {
    id: "T23", title: "Resultado do ciclo", purpose: "Informar um encerramento confirmado sem inventar economia, volume ou temperatura.",
    status: ["proposed", "simulated"], questions: ["Qual mensagem representa melhor a conclusão?", "Cooldown deve aparecer nesta mesma tela?"],
    html: () => shell("Ciclo concluído", `<div class="screen-body centered"><div class="result-icon">✓</div><h2 class="empty-title">Pré-aquecimento concluído</h2><p class="empty-copy">O Revolushower confirmou o encerramento do ciclo.</p><div class="result-stats"><div class="stat"><small>Duração</small><strong>1 min 18 s</strong></div><div class="stat"><small>Origem</small><strong>Aplicativo</strong></div></div><button class="button" data-go="home">Voltar ao início</button><button class="text-button" data-go="event">Ver detalhes</button></div>`, {noNav:true})
  },
  flow: {
    id: "T24-F", title: "Uso mecânico detectado", purpose: "Mostrar que o Master detectou fluxo sem afirmar que o app iniciou o ciclo.",
    status: ["proposed", "validate", "simulated"], questions: ["Qual linguagem usar para acionamento mecânico?", "Qual aviso deve aparecer quando o limite mecânico for atingido?"],
    html: () => shell("Estado do sistema", `<div class="screen-body"><div class="alert-card flow"><span>≈</span><div><strong>Fluxo de água detectado</strong><br>O uso foi iniciado localmente pela abertura do registro.</div></div><div class="detail-list"><div class="detail-row"><span>Origem</span><strong>Acionamento mecânico</strong></div><div class="detail-row"><span>Bomba</span><strong>Estado confirmado pelo Master</strong></div><div class="detail-row"><span>Início</span><strong>Agora</strong></div></div><div class="safety-note"><span>!</span><span>A regra de limite do acionamento mecânico permanece pendente de validação.</span></div><button class="button secondary" data-go="home">Voltar ao início</button></div>`, {back:"home", nav:"home"})
  },
  offline: {
    id: "T20-O", title: "Master offline", purpose: "Distinguir falta de comunicação do estado físico real do equipamento.",
    status: ["proposed", "simulated"], questions: ["Após quanto tempo o equipamento será considerado offline?", "Quais orientações podem ser dadas sem induzir intervenção insegura?"],
    html: () => shell("Banheiro principal", `<div class="screen-body centered"><div class="illustration" style="color:#8b9a9e">⌁</div><h2 class="empty-title">Equipamento offline</h2><p class="empty-copy">Não foi possível confirmar o estado atual. As proteções locais continuam funcionando no Revolushower.</p><div class="alert-card warning"><span>!</span><div>Não enviaremos comandos enquanto o equipamento estiver offline.</div></div><button class="button" data-go="home">Tentar novamente</button><button class="text-button" data-go="help">Ver orientações</button></div>`, {nav:"home"})
  },
  history: {
    id: "T30", title: "Histórico", purpose: "Listar ciclos e eventos confirmados, distinguindo sua origem e resultado.",
    status: ["proposed"], questions: ["Qual período deve ser mantido no MVP?", "Usuário poderá filtrar por origem e resultado?"],
    html: () => shell("Histórico", `<div class="screen-body"><div class="history-day"><h3>Hoje</h3>${eventCard("≈","Pré-aquecimento concluído","14:32 · 1 min 18 s","event")}${eventCard("↟","Acionamento mecânico","08:14 · 6 min 03 s","event")}</div><div class="history-day"><h3>Ontem</h3>${eventCard("×","Comando cancelado","21:07 · Aplicativo","event")}${eventCard("≈","Pré-aquecimento concluído","07:02 · 1 min 25 s","event")}</div><div class="alert-card flow"><span>ⓘ</span><div>O histórico apresenta eventos e duração. Não contém litros, energia ou custo.</div></div></div>`, {nav:"history"})
  },
  event: {
    id: "T32", title: "Detalhe do evento", purpose: "Exibir rastreabilidade suficiente para o cliente e para o suporte.",
    status: ["proposed", "validate"], questions: ["O cliente deve visualizar códigos técnicos de suporte?", "Quais origens serão exibidas: app, botão local e fluxo?"],
    html: () => shell("Detalhe do evento", `<div class="screen-body"><div class="result-icon" style="width:70px;height:70px;font-size:30px">✓</div><h2 style="text-align:center;margin-top:0">Pré-aquecimento concluído</h2><p class="form-lead" style="text-align:center">29 de agosto de 2026, às 14:32</p><div class="detail-list"><div class="detail-row"><span>Instalação</span><strong>Banheiro principal</strong></div><div class="detail-row"><span>Origem</span><strong>Aplicativo</strong></div><div class="detail-row"><span>Duração</span><strong>1 min 18 s</strong></div><div class="detail-row"><span>Resultado</span><strong>Concluído</strong></div><div class="detail-row"><span>Referência</span><strong>EVT-10482</strong></div></div><button class="button secondary" style="margin-top:18px" data-go="history">Voltar ao histórico</button></div>`, {back:"history", nav:"history"})
  },
  schedules: {
    id: "T70", title: "Programações", purpose: "Consultar, criar, alterar e cancelar horários de pré-aquecimento.",
    status: ["proposed", "validate", "simulated"], questions: ["A execução será no backend, no Master ou híbrida?", "O que ocorre se o equipamento estiver offline no horário?"],
    html: () => shell("Programações", `<div class="screen-body"><div class="alert-card warning"><span>!</span><div>O horário apenas solicita o pré-aquecimento; o Master ainda valida segurança e disponibilidade.</div></div><div class="schedule-card"><div><span class="schedule-state">ATIVA</span><h3>Dias úteis</h3><strong>07:00</strong><p>Próxima: segunda-feira, 07:00</p></div><div class="schedule-actions"><button class="button small" data-go="schedule-edit">Editar</button><button class="text-button danger-text" data-go="schedule-cancel">Cancelar</button></div></div><div class="schedule-card"><div><span class="schedule-state once">UMA VEZ</span><h3>Banheiro principal</h3><strong>31/08 · 18:30</strong><p>Uma execução programada</p></div><div class="schedule-actions"><button class="button small" data-go="schedule-edit">Editar</button><button class="text-button danger-text" data-go="schedule-cancel">Cancelar</button></div></div><button class="button aqua" data-go="schedule-edit">+ Nova programação</button></div>`, {back:"home", nav:"home"})
  },
  "schedule-edit": {
    id: "T71", title: "Criar ou editar programação", purpose: "Definir se o pré-aquecimento ocorrerá uma vez ou se repetirá em dias escolhidos.",
    status: ["proposed", "validate", "simulated"], questions: ["Quais dias e horários devem ser permitidos?", "Pode haver mais de uma programação no mesmo dia?"],
    html: () => shell("Editar programação", `<div class="screen-body"><div class="field"><label>Repetição</label><select><option>Uma vez</option><option>Repetir semanalmente</option></select></div><div class="field"><label>Data (para uma vez)</label><input type="date" value="2026-08-31"></div><div class="field"><label>Horário</label><input type="time" value="07:00"></div><div class="field"><label>Dias da semana (para repetir)</label><div class="day-picker"><button class="selected">SEG</button><button class="selected">TER</button><button class="selected">QUA</button><button class="selected">QUI</button><button class="selected">SEX</button><button>SÁB</button><button>DOM</button></div></div><div class="alert-card flow"><span>i</span><div>Se o Master estiver ocupado, bloqueado ou sem comunicação, o resultado dependerá da política aprovada.</div></div><button class="button aqua" data-go="schedules">Salvar programação</button><button class="text-button" data-go="schedules">Cancelar edição</button></div>`, {back:"schedules", nav:"home"})
  },
  "schedule-cancel": {
    id: "T71A", title: "Cancelar programação", purpose: "Confirmar a remoção de uma programação antes de alterar o comportamento automático.",
    status: ["proposed", "validate", "simulated"], questions: ["O cancelamento exige confirmação adicional?", "O histórico deve preservar a programação cancelada?"],
    html: () => `<section class="app-screen modal-screen"><div class="sheet"><div class="sheet-handle"></div><div class="sheet-icon">!</div><h2>Cancelar programação?</h2><p>O horário não solicitará novos pré-aquecimentos. Ciclos já iniciados não serão interrompidos automaticamente.</p><div class="button-row"><button class="button secondary" data-go="schedules">Voltar</button><button class="button danger" data-go="schedules">Confirmar cancelamento</button></div></div></section>`
  },
  settings: {
    id: "T40", title: "Configurações", purpose: "Concentrar instalação, conta, notificações, ajuda e documentos legais.",
    status: ["proposed", "validate"], questions: ["Tempos avançados serão visíveis ao consumidor?", "Quem poderá desvincular o equipamento?"],
    html: () => shell("Configurações", `<div class="screen-body"><div class="settings-group"><h3>Minha instalação</h3><div class="settings-list">${setting("⌁","Banheiro principal","Online · Revolushower Master","device")}${setting("◉","Notificações","Avisos importantes","")}</div></div><div class="settings-group"><h3>Minha conta</h3><div class="settings-list">${setting("●","Conta e perfil","cliente@exemplo.com","account")}${setting("◇","Privacidade e segurança","Senha e dados","")}</div></div><div class="settings-group"><h3>Suporte</h3><div class="settings-list">${setting("?","Ajuda e atendimento","Guias e diagnóstico","help")}${setting("i","Sobre o Revolushower","Termos e privacidade","")}</div></div></div>`, {nav:"settings"})
  },
  device: {
    id: "T42", title: "Equipamento", purpose: "Apresentar identidade e conectividade sem expor segredos técnicos.",
    status: ["proposed", "validate"], questions: ["Device ID será visível integralmente?", "Versão do firmware será mostrada ao cliente ou somente ao suporte?"],
    html: () => shell("Banheiro principal", `<div class="screen-body"><div class="alert-card flow"><span>✓</span><div><strong>Equipamento online</strong><br>Última comunicação: agora</div></div><div class="detail-list"><div class="detail-row"><span>Nome</span><strong>Banheiro principal</strong></div><div class="detail-row"><span>Device ID</span><strong>AH_34AB…5678</strong></div><div class="detail-row"><span>Rede Wi‑Fi</span><strong>Casa Silva</strong></div><div class="detail-row"><span>Firmware</span><strong>Versão de demonstração</strong></div></div><button class="button secondary" style="margin-top:18px">Reconfigurar Wi‑Fi</button><button class="button danger" style="margin-top:10px">Desvincular equipamento</button></div>`, {back:"settings", nav:"settings"})
  },
  account: {
    id: "T47", title: "Conta e perfil", purpose: "Permitir gestão dos dados essenciais e acesso à exclusão da conta.",
    status: ["proposed", "validate"], questions: ["Quais dados de perfil são realmente necessários?", "Excluir conta também remove histórico e vínculo do Master?"],
    html: () => shell("Conta e perfil", `<div class="screen-body"><div class="field"><label>Nome</label><input value="Cliente Revolushower"></div><div class="field"><label>E-mail</label><input value="cliente@exemplo.com"></div><button class="button">Salvar alterações</button><div class="settings-group" style="margin-top:26px"><h3>Segurança e dados</h3><div class="settings-list">${setting("◇","Alterar senha","Proteja o acesso à conta","")}${setting("⇥","Sair da conta","Encerrar esta sessão","")}${setting("×","Excluir minha conta","Solicitar exclusão de dados","")}</div></div></div>`, {back:"settings", nav:"settings"})
  },
  help: {
    id: "T50", title: "Ajuda e suporte", purpose: "Orientar problemas comuns e reunir informações úteis para atendimento.",
    status: ["proposed", "validate"], questions: ["Quais canais e horários de suporte existirão?", "Quais diagnósticos poderão ser enviados com autorização?"],
    html: () => shell("Ajuda e suporte", `<div class="screen-body"><div class="field"><label>Como podemos ajudar?</label><input placeholder="Buscar uma orientação"></div><div class="settings-group"><h3>Orientações rápidas</h3><div class="settings-list">${setting("⌁","Equipamento offline","Verifique conexão e energia","")}${setting("▦","Configurar novamente","Wi‑Fi e identificação","")}${setting("≈","Pré-aquecimento","Estados e cancelamento","")}</div></div><div class="settings-group"><h3>Atendimento</h3><div class="settings-list">${setting("●","Falar com o suporte","Canal a definir","")}${setting("i","Informações para diagnóstico","Device ID e versão","")}</div></div><div class="alert-card warning"><span>!</span><div>Em caso de risco elétrico, hidráulico ou comportamento inesperado, não manipule o equipamento energizado.</div></div></div>`, {back:"settings", nav:"settings"})
  }
};

function shell(title, content, options = {}) {
  const back = options.back ? `<button class="back-button" data-go="${options.back}" aria-label="Voltar">←</button>` : `<span></span>`;
  const header = `<header class="app-header"><div>${back}</div><div style="text-align:center"><h2>${title}</h2><small>Revolushower</small></div><span class="header-icon">R</span></header>`;
  return `<section class="app-screen">${header}<div class="app-scroll">${content}</div>${options.noNav ? "" : bottomNav(options.nav || "")}</section>`;
}

function stepShell(title, step, content, back) {
  const bars = [1,2,3,4,5].map(i => `<span class="${i < step ? "done" : i === step ? "active" : ""}"></span>`).join("");
  return shell(title, `<div class="stepper">${bars}</div><div class="screen-body">${content}</div>`, {back, noNav:true});
}

function bottomNav(active) {
  return `<nav class="bottom-nav"><button class="${active === "home" ? "active" : ""}" data-go="home"><span>⌂</span>Início</button><button class="${active === "history" ? "active" : ""}" data-go="history"><span>◷</span>Histórico</button><button class="${active === "settings" ? "active" : ""}" data-go="settings"><span>⚙</span>Configurações</button></nav>`;
}

function eventCard(icon, title, detail, target) {
  return `<button class="event-card" data-go="${target}"><span class="event-icon">${icon}</span><div><strong>${title}</strong><small>${detail}</small></div><span>›</span></button>`;
}

function setting(icon, title, detail, target) {
  return `<button class="settings-item" ${target ? `data-go="${target}"` : ""}><span>${icon}</span><div><strong>${title}</strong><small>${detail}</small></div><span>›</span></button>`;
}

const requestedScreen = new URLSearchParams(window.location.search).get("screen");
let current = screens[requestedScreen] ? requestedScreen : "welcome";
const orderedScreens = groups.flatMap(group => group.screens);
const phone = document.querySelector("#phone-screen");
const screenList = document.querySelector("#screen-list");
const boardGrid = document.querySelector("#board-grid");

function renderNavigation() {
  screenList.innerHTML = groups.map(group => `<section class="nav-group"><h2 class="nav-group-title">${group.label}</h2>${group.screens.map(key => `<button class="screen-link" data-screen="${key}"><b>${screens[key].id}</b><span>${screens[key].title}</span></button>`).join("")}</section>`).join("");
}

function bindScreenActions(root = document) {
  root.querySelectorAll("[data-go]").forEach(button => button.addEventListener("click", () => showScreen(button.dataset.go)));
}

function showScreen(key) {
  if (!screens[key]) return;
  current = key;
  const screen = screens[key];
  phone.innerHTML = screen.html();
  bindScreenActions(phone);
  document.querySelectorAll(".screen-link").forEach(link => link.classList.toggle("active", link.dataset.screen === key));
  document.querySelector("#review-id").textContent = screen.id;
  document.querySelector("#review-title").textContent = screen.title;
  document.querySelector("#review-purpose").textContent = screen.purpose;
  document.querySelector("#review-questions").innerHTML = screen.questions.map(q => `<li>${q}</li>`).join("");
  document.querySelector("#review-status").innerHTML = screen.status.map(status => `<span class="review-tag ${status}">${statusLabel(status)}</span>`).join("");
}

function statusLabel(status) {
  return { proposed: "Proposto para MVP", validate: "Precisa de validação", simulated: "Estado simulado" }[status];
}

function adjacent(delta) {
  const index = orderedScreens.indexOf(current);
  showScreen(orderedScreens[(index + delta + orderedScreens.length) % orderedScreens.length]);
}

function renderBoards() {
  boardGrid.innerHTML = orderedScreens.map(key => {
    const screen = screens[key];
    return `<article class="board-card"><header class="board-card-header"><span>${screen.id}</span><h2>${screen.title}</h2><p>${screen.purpose}</p></header><div class="board-phone"><div class="phone-screen">${screen.html()}</div></div></article>`;
  }).join("");
}

document.querySelector("#previous-screen").addEventListener("click", () => adjacent(-1));
document.querySelector("#next-screen").addEventListener("click", () => adjacent(1));
document.querySelector("#toggle-notes").addEventListener("click", event => {
  const panel = document.querySelector("#review-panel");
  panel.hidden = !panel.hidden;
  event.currentTarget.textContent = panel.hidden ? "Mostrar notas" : "Ocultar notas";
});
document.querySelector("#presentation-mode").addEventListener("click", event => {
  document.body.classList.toggle("board-mode");
  event.currentTarget.textContent = document.body.classList.contains("board-mode") ? "Voltar ao protótipo" : "Ver pranchas";
});
document.querySelector("#print-prototype").addEventListener("click", () => {
  document.body.classList.add("board-mode");
  window.print();
});
window.addEventListener("afterprint", () => document.body.classList.remove("board-mode"));

renderNavigation();
renderBoards();
screenList.querySelectorAll("[data-screen]").forEach(button => button.addEventListener("click", () => showScreen(button.dataset.screen)));
showScreen(current);
