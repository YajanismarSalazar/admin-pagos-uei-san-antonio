const STORAGE_KEY_PORTAL = "uei_san_antonio_portal_v4";
const STORAGE_KEY_SESION = "uei_san_antonio_admin_sesion";
const STORAGE_KEY_TASA = "uei_san_antonio_admin_tasa";
const STORAGE_KEY_DEMO_INIT = "uei_san_antonio_demo_inicializado_v1";

const CREDENCIALES_ADMIN = {
  usuariosValidos: ["adm1"],
  clave: "12345"
};

let tasaBCVActual = 45.00;
let alumnosAdmin = [];
let pagosReportados = [];
let alumnoManualActual = null;
let conceptosManualesDisponibles = [];
let ultimoConteoRevision = -1;
let intervaloSyncAdmin = null;

function obtenerTasaInicialSistema() {
  const tasaGuardada = localStorage.getItem(STORAGE_KEY_TASA);
  if (tasaGuardada && !isNaN(parseFloat(tasaGuardada)) && parseFloat(tasaGuardada) > 0) {
    return parseFloat(tasaGuardada);
  }
  if (typeof TASA_BCV_INICIAL !== "undefined" && Number(TASA_BCV_INICIAL) > 0) {
    return Number(TASA_BCV_INICIAL);
  }
  if (typeof CONFIG_COLEGIO !== "undefined" && Number(CONFIG_COLEGIO.tasaBCV) > 0) {
    return Number(CONFIG_COLEGIO.tasaBCV);
  }
  return 45.00;
}

function formatearUSD(valor) {
  return "$" + Number(valor || 0).toFixed(2);
}

function formatearBs(valorUSD) {
  const bs = Number(valorUSD || 0) * tasaBCVActual;
  return "Bs. " + bs.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function cargarDatosStorage() {
  tasaBCVActual = obtenerTasaInicialSistema();
  const inputTasa = document.getElementById("tasa-bcv-admin");
  if (inputTasa) inputTasa.value = tasaBCVActual.toFixed(2);

  const raw = localStorage.getItem(STORAGE_KEY_PORTAL);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      alumnosAdmin = Array.isArray(parsed.alumnos) && parsed.alumnos.length
        ? parsed.alumnos
        : JSON.parse(JSON.stringify(ALUMNOS_INICIALES));
      pagosReportados = Array.isArray(parsed.pagos) ? parsed.pagos : [];
      return;
    } catch (e) {
      console.warn("Error leyendo storage, cargando data inicial:", e);
    }
  }

  alumnosAdmin = JSON.parse(JSON.stringify(ALUMNOS_INICIALES));
  pagosReportados = [];
  guardarDatosStorage();
}

function guardarDatosStorage() {
  const payload = {
    alumnos: alumnosAdmin,
    pagos: pagosReportados
  };
  localStorage.setItem(STORAGE_KEY_PORTAL, JSON.stringify(payload));
}

function iniciarSesionAdmin(event) {
  event.preventDefault();
  const usuarioInput = document.getElementById("login-usuario").value.trim().toLowerCase();
  const claveInput = document.getElementById("login-clave").value.trim();
  const errorEl = document.getElementById("login-error");

  const usuarioOk = CREDENCIALES_ADMIN.usuariosValidos.includes(usuarioInput);
  const claveOk = claveInput === CREDENCIALES_ADMIN.clave;

  if (!usuarioOk || !claveOk) {
    errorEl.textContent = "Usuario o contraseña incorrectos.";
    errorEl.classList.remove("oculto");
    return;
  }

  errorEl.classList.add("oculto");
  sessionStorage.setItem(STORAGE_KEY_SESION, "activa");
  mostrarPanelAdmin();
}

function cerrarSesionAdmin() {
  guardarDatosStorage();
  sessionStorage.removeItem(STORAGE_KEY_SESION);
  if (intervaloSyncAdmin) {
    clearInterval(intervaloSyncAdmin);
    intervaloSyncAdmin = null;
  }
  document.getElementById("vista-admin").classList.add("oculto");
  document.getElementById("header-controles").classList.add("oculto");
  document.getElementById("vista-login").classList.remove("oculto");
  document.getElementById("login-clave").value = "";
}

function mostrarNotificacionAdmin(texto, tipo = "info") {
  let banner = document.getElementById("banner-notificacion-admin");
  if (!banner) {
    const vistaAdmin = document.getElementById("vista-admin");
    if (!vistaAdmin) return;
    banner = document.createElement("div");
    banner.id = "banner-notificacion-admin";
    banner.style.cssText =
      "margin:12px 0;padding:12px 16px;border-radius:10px;font-weight:600;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;box-shadow:0 4px 12px rgba(0,0,0,0.08);";
    vistaAdmin.insertBefore(banner, vistaAdmin.firstChild);
  }

  if (tipo === "alerta") {
    banner.style.background = "#fff7ed";
    banner.style.border = "1px solid #fdba74";
    banner.style.color = "#9a3412";
  } else {
    banner.style.background = "#eff6ff";
    banner.style.border = "1px solid #93c5fd";
    banner.style.color = "#1e3a8a";
  }

  banner.innerHTML = `
    <span>${texto}</span>
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      <button type="button" class="btn btn-primary" style="padding:5px 10px;font-size:0.8rem;" onclick="navegarDesdeKPI('REVISION')">En Revisión</button>
      <button type="button" class="btn" style="padding:5px 10px;font-size:0.8rem;background:#e2e8f0;color:#0f172a;" onclick="navegarDesdeKPI('TODOS')">Ver Todo Historial</button>
    </div>
  `;
  banner.classList.remove("oculto");
}

function verificarNuevosPagosEnTiempoReal() {
  if (sessionStorage.getItem(STORAGE_KEY_SESION) !== "activa") return;
  const conteoActual = pagosReportados.filter(p => p.estado === "En Revisión").length;
  const totalActual = pagosReportados.length;
  cargarDatosStorage();
  const conteoNuevo = pagosReportados.filter(p => p.estado === "En Revisión").length;

  if (ultimoConteoRevision !== -1 && conteoNuevo > ultimoConteoRevision) {
    const diff = conteoNuevo - ultimoConteoRevision;
    mostrarNotificacionAdmin(
      `Nuevo pago reportado por representante: hay ${diff} comprobante(s) adicional(es) pendiente(s) por revisar (${conteoNuevo} en revisión).`,
      "alerta"
    );
  }

  ultimoConteoRevision = conteoNuevo;
  if (conteoNuevo !== conteoActual || pagosReportados.length !== totalActual) {
    actualizarDashboardCompleto();
  }
}

function navegarDesdeKPI(destino) {
  const selectEstadoPago = document.getElementById("filtro-estado-pago");
  if (destino === "REVISION") {
    cambiarTab("conciliacion");
    if (selectEstadoPago) selectEstadoPago.value = "En Revisión";
    renderizarTablaPagos();
    const tabla = document.getElementById("tab-conciliacion");
    if (tabla) tabla.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (destino === "CONFIRMADOS") {
    cambiarTab("conciliacion");
    if (selectEstadoPago) selectEstadoPago.value = "Confirmado";
    renderizarTablaPagos();
    const tabla = document.getElementById("tab-conciliacion");
    if (tabla) tabla.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (destino === "RECHAZADOS") {
    cambiarTab("conciliacion");
    if (selectEstadoPago) selectEstadoPago.value = "Rechazado";
    renderizarTablaPagos();
    const tabla = document.getElementById("tab-conciliacion");
    if (tabla) tabla.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (destino === "TODOS") {
    cambiarTab("conciliacion");
    if (selectEstadoPago) selectEstadoPago.value = "TODOS";
    renderizarTablaPagos();
    const tabla = document.getElementById("tab-conciliacion");
    if (tabla) tabla.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (destino === "PENDIENTE") {
    cambiarTab("alumnos");
    const filtroSolv = document.getElementById("filtro-solvencia-alumno");
    if (filtroSolv) filtroSolv.value = "PENDIENTE";
    renderizarTablaAlumnos();
    const tabla = document.getElementById("tab-alumnos");
    if (tabla) tabla.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (destino === "SOLVENTES") {
    cambiarTab("alumnos");
    const filtroSolv = document.getElementById("filtro-solvencia-alumno");
    if (filtroSolv) filtroSolv.value = "SOLVENTE";
    renderizarTablaAlumnos();
    const tabla = document.getElementById("tab-alumnos");
    if (tabla) tabla.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function crearTarjetaRechazadosSiNoExiste() {
  const kpiConfirmados = document.getElementById("kpi-confirmados");
  if (!kpiConfirmados || document.getElementById("kpi-rechazados")) return;

  const tarjetaRef = kpiConfirmados.closest(".kpi-card, .card, div") || kpiConfirmados.parentElement;
  if (!tarjetaRef || !tarjetaRef.parentElement) return;

  const nuevaTarjeta = tarjetaRef.cloneNode(true);
  nuevaTarjeta.removeAttribute("data-kpi-vinculado");

  const spans = nuevaTarjeta.querySelectorAll("span, div, p, h2, h3, strong");
  let asignadoId = false;
  spans.forEach((node) => {
    if (node.id === "kpi-confirmados") {
      node.id = "kpi-rechazados";
      node.textContent = "0";
      asignadoId = true;
    } else if (!asignadoId && /^\d+/.test(node.textContent.trim())) {
      node.id = "kpi-rechazados";
      node.textContent = "0";
      asignadoId = true;
    } else if (node.id === "kpi-confirmados-monto") {
      node.id = "kpi-rechazados-monto";
      node.textContent = "$0.00 rechazados";
    } else if (/rechazad|confirmad|conciliad/i.test(node.textContent)) {
      node.textContent = node.textContent.replace(/Confirmad[oa]s?/i, "Rechazados").replace(/conciliados/i, "rechazados");
    }
  });

  if (!asignadoId) {
    const valEl = document.createElement("div");
    valEl.id = "kpi-rechazados";
    valEl.style.fontWeight = "700";
    valEl.textContent = "0";
    nuevaTarjeta.appendChild(valEl);
  }

  tarjetaRef.parentElement.appendChild(nuevaTarjeta);
}

function activarTarjetasKPIClicables() {
  crearTarjetaRechazadosSiNoExiste();

  const mapaKPIs = [
    { idValor: "kpi-revision", accion: "REVISION", titulo: "Ver pagos en revisión" },
    { idValor: "kpi-confirmados", accion: "CONFIRMADOS", titulo: "Ver historial de pagos aprobados/confirmados" },
    { idValor: "kpi-rechazados", accion: "RECHAZADOS", titulo: "Ver historial de pagos rechazados" },
    { idValor: "kpi-deuda-usd", accion: "PENDIENTE", titulo: "Ver lista de alumnos con cartera pendiente" },
    { idValor: "kpi-solventes", accion: "SOLVENTES", titulo: "Ver lista de alumnos solventes" }
  ];

  mapaKPIs.forEach(({ idValor, accion, titulo }) => {
    const el = document.getElementById(idValor);
    if (!el) return;
    const tarjeta = el.closest(".kpi-card, .card, div") || el.parentElement;
    if (!tarjeta || tarjeta.dataset.kpiVinculado === "1") return;

    tarjeta.dataset.kpiVinculado = "1";
    tarjeta.style.cursor = "pointer";
    tarjeta.style.transition = "transform 0.15s ease, box-shadow 0.15s ease";
    tarjeta.title = titulo;

    tarjeta.addEventListener("mouseenter", () => {
      tarjeta.style.transform = "translateY(-2px)";
      tarjeta.style.boxShadow = "0 8px 20px rgba(21, 69, 184, 0.14)";
    });
    tarjeta.addEventListener("mouseleave", () => {
      tarjeta.style.transform = "";
      tarjeta.style.boxShadow = "";
    });
    tarjeta.addEventListener("click", () => navegarDesdeKPI(accion));
  });
}

function mostrarPanelAdmin() {
  document.getElementById("vista-login").classList.add("oculto");
  document.getElementById("vista-admin").classList.remove("oculto");
  document.getElementById("header-controles").classList.remove("oculto");

  cargarDatosStorage();
  if (pagosReportados.length === 0 && !localStorage.getItem(STORAGE_KEY_DEMO_INIT)) {
    cargarPagosDemoIniciales();
    localStorage.setItem(STORAGE_KEY_DEMO_INIT, "1");
  }

  // Al iniciar sesión mostramos TODO el historial (En Revisión, Confirmado y Rechazado)
  const selectFiltro = document.getElementById("filtro-estado-pago");
  if (selectFiltro) {
    if (![...selectFiltro.options].some(o => o.value === "TODOS")) {
      const optTodos = document.createElement("option");
      optTodos.value = "TODOS";
      optTodos.textContent = "Todos (Historial completo)";
      selectFiltro.insertBefore(optTodos, selectFiltro.firstChild);
    }
    if (![...selectFiltro.options].some(o => o.value === "Rechazado")) {
      const optRech = document.createElement("option");
      optRech.value = "Rechazado";
      optRech.textContent = "Rechazado";
      selectFiltro.appendChild(optRech);
    }
    selectFiltro.value = "TODOS";
  }

  ultimoConteoRevision = pagosReportados.filter(p => p.estado === "En Revisión").length;

  poblarFiltroAnios();
  activarTarjetasKPIClicables();
  actualizarDashboardCompleto();

  if (ultimoConteoRevision > 0) {
    mostrarNotificacionAdmin(
      `Tienes ${ultimoConteoRevision} pago(s) pendiente(s) por revisar. También puedes consultar todo el historial de aprobados y rechazados.`,
      "alerta"
    );
  } else {
    mostrarNotificacionAdmin(
      `Historial cargado (${pagosReportados.length} registro(s) en total entre aprobados, rechazados y en revisión).`,
      "info"
    );
  }

  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY_PORTAL) {
      verificarNuevosPagosEnTiempoReal();
    }
  });

  if (intervaloSyncAdmin) clearInterval(intervaloSyncAdmin);
  intervaloSyncAdmin = setInterval(verificarNuevosPagosEnTiempoReal, 2500);
}