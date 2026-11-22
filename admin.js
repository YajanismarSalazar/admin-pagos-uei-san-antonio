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

function renderizarBandejaDirectaWhatsApp() {
  const tabManual = document.getElementById("tab-manual");
  if (!tabManual) return;

  let cajaDirecta = document.getElementById("bandeja-directa-whatsapp");
  if (!cajaDirecta) {
    cajaDirecta = document.createElement("div");
    cajaDirecta.id = "bandeja-directa-whatsapp";
    cajaDirecta.style.cssText =
      "margin-bottom:20px;padding:16px;border:1px solid #bfdbfe;border-radius:12px;background:#f8fafc;";
    tabManual.insertBefore(cajaDirecta, tabManual.firstChild);
  }

  const pendientes = pagosReportados.filter(p => p.estado === "En Revisión");

  if (!pendientes.length) {
    cajaDirecta.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;">
        <div>
          <strong style="color:#1e3a8a;font-size:1rem;">Pagos Reportados por Representantes (Vía WhatsApp / Portal)</strong>
          <div class="muted small">No hay comprobantes pendientes por conciliar en este momento.</div>
        </div>
      </div>
    `;
    return;
  }

  const itemsHtml = pendientes
    .map((p) => {
      const conceptosTxt = Array.isArray(p.conceptos)
        ? p.conceptos.map(c => c.descripcion || c.nombre || c).join(", ")
        : "Concepto pendiente";

      return `
        <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px;margin-top:10px;background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;flex-wrap:wrap;">
          <div style="min-width:220px;flex:1;">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <strong>${p.alumnoNombre}</strong>
              <span class="badge badge-revision">En Revisión</span>
            </div>
            <div class="muted small">Matrícula: <strong>${p.matricula}</strong> · Comprobante: <strong>${p.id}</strong> · ${p.fecha}</div>
            <div class="small" style="color:#1e3a8a;margin-top:3px;"><strong>Conceptos:</strong> ${conceptosTxt}</div>
            <div class="muted small">Método: ${p.metodo} · Ref: ${p.referencia || "N/A"}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:1.05rem;font-weight:700;color:#0f172a;">${formatearUSD(p.totalUSD)}</div>
            <div class="muted small" style="margin-bottom:8px;">${formatearBs(p.totalUSD)}</div>
            <div class="acciones-celda">
              <button type="button" class="btn btn-success" onclick="confirmarPago('${p.id}')">Confirmar</button>
              <button type="button" class="btn btn-danger" onclick="rechazarPago('${p.id}')">Rechazar</button>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  cajaDirecta.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;">
      <div>
        <strong style="color:#1e3a8a;font-size:1rem;">Pagos Reportados por Representantes (${pendientes.length} en revisión)</strong>
        <div class="muted small">Selecciona directamente para aprobar o rechazar sin tener que buscar por cédula o matrícula.</div>
      </div>
    </div>
    ${itemsHtml}
  `;
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
  } else {
    renderizarBandejaDirectaWhatsApp();
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

function actualizarTasaAdmin() {
  const input = document.getElementById("tasa-bcv-admin");
  const textoLimpio = String(input.value || "").replace(",", ".");
  const val = parseFloat(textoLimpio);

  if (isNaN(val) || val <= 0) {
    alert("Ingresa una tasa BCV válida mayor a 0.");
    return;
  }

  tasaBCVActual = val;
  input.value = tasaBCVActual.toFixed(2);
  localStorage.setItem(STORAGE_KEY_TASA, tasaBCVActual.toFixed(2));

  actualizarDashboardCompleto();
  recalcularTotalManual();
}

async function consultarTasaBCVAdmin() {
  const btn = document.getElementById("btn-consultar-bcv");
  const input = document.getElementById("tasa-bcv-admin");
  const textoOriginal = btn.textContent;

  btn.disabled = true;
  btn.textContent = "Consultando...";

  try {
    const resp = await fetch("https://ve.dolarapi.com/v1/dolares/oficial", { cache: "no-store" });
    if (!resp.ok) throw new Error("Respuesta no válida");
    const data = await resp.json();
    const promedio = parseFloat(data.promedio || data.venta || data.compra);

    if (!isNaN(promedio) && promedio > 0) {
      tasaBCVActual = promedio;
      input.value = tasaBCVActual.toFixed(2);
      localStorage.setItem(STORAGE_KEY_TASA, tasaBCVActual.toFixed(2));
      actualizarDashboardCompleto();
      recalcularTotalManual();
      alert(`Tasa BCV actualizada: Bs. ${tasaBCVActual.toFixed(2)}`);
    } else {
      throw new Error("Dato de tasa vacío");
    }
  } catch (err) {
    alert("No se pudo conectar en automático con el servidor BCV. Escribe la tasa del día en la casilla y pulsa 'Aplicar'.");
  } finally {
    btn.disabled = false;
    btn.textContent = textoOriginal;
  }
}

function cambiarTab(nombreTab) {
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.add("oculto"));

  const btn = document.getElementById("tab-btn-" + nombreTab);
  const panel = document.getElementById("tab-" + nombreTab);
  if (btn) btn.classList.add("active");
  if (panel) panel.classList.remove("oculto");

  if (nombreTab === "manual") {
    cargarDatosStorage();
    renderizarBandejaDirectaWhatsApp();
  }
}

function calcularDeudaAlumno(alumno) {
  let total = 0;
  if (!alumno.inscripcionPagada) {
    total += PRECIO_INSCRIPCION;
  }
  if (alumno.periodos) {
    Object.keys(alumno.periodos).forEach(per => {
      const info = alumno.periodos[per];
      total += Number(info.saldo || 0);
      if (Array.isArray(info.mesesPendientes)) {
        total += info.mesesPendientes.length * PRECIO_MENSUALIDAD;
      }
    });
  }
  return Number(total.toFixed(2));
}

function actualizarKPIs() {
  const enRevision = pagosReportados.filter(p => p.estado === "En Revisión");
  const confirmados = pagosReportados.filter(p => p.estado === "Confirmado");
  const rechazados = pagosReportados.filter(p => p.estado === "Rechazado");

  const sumaRevision = enRevision.reduce((acc, p) => acc + Number(p.totalUSD || 0), 0);
  const sumaConfirmados = confirmados.reduce((acc, p) => acc + Number(p.totalUSD || 0), 0);
  const sumaRechazados = rechazados.reduce((acc, p) => acc + Number(p.totalUSD || 0), 0);

  let deudaTotal = 0;
  let solventes = 0;
  alumnosAdmin.forEach(al => {
    const d = calcularDeudaAlumno(al);
    deudaTotal += d;
    if (d <= 0) solventes++;
  });

  const elRev = document.getElementById("kpi-revision");
  const elRevMonto = document.getElementById("kpi-revision-monto");
  if (elRev) elRev.textContent = enRevision.length;
  if (elRevMonto) elRevMonto.textContent = formatearUSD(sumaRevision) + " por confirmar";

  const elConf = document.getElementById("kpi-confirmados");
  const elConfMonto = document.getElementById("kpi-confirmados-monto");
  if (elConf) elConf.textContent = confirmados.length;
  if (elConfMonto) elConfMonto.textContent = formatearUSD(sumaConfirmados) + " conciliados";

  const elRech = document.getElementById("kpi-rechazados");
  const elRechMonto = document.getElementById("kpi-rechazados-monto");
  if (elRech) elRech.textContent = rechazados.length;
  if (elRechMonto) elRechMonto.textContent = formatearUSD(sumaRechazados) + " rechazados";

  const elDeudaUsd = document.getElementById("kpi-deuda-usd");
  const elDeudaBs = document.getElementById("kpi-deuda-bs");
  if (elDeudaUsd) elDeudaUsd.textContent = formatearUSD(deudaTotal);
  if (elDeudaBs) elDeudaBs.textContent = formatearBs(deudaTotal);

  const elSolv = document.getElementById("kpi-solventes");
  if (elSolv) elSolv.textContent = solventes + " / " + alumnosAdmin.length;
}

function renderizarTablaPagos() {
  const tbody = document.getElementById("tbody-pagos");
  const selectFiltro = document.getElementById("filtro-estado-pago");
  if (!tbody || !selectFiltro) return;

  if (![...selectFiltro.options].some(o => o.value === "Rechazado")) {
    const opt = document.createElement("option");
    opt.value = "Rechazado";
    opt.textContent = "Rechazado";
    selectFiltro.appendChild(opt);
  }

  const filtro = selectFiltro.value;
  tbody.innerHTML = "";

  const filtrados = pagosReportados.filter(p => filtro === "TODOS" || p.estado === filtro);

  if (!filtrados.length) {
    tbody.innerHTML = `<tr><td colspan="7" class="muted" style="text-align:center;padding:20px;">No hay pagos en este estado.</td></tr>`;
    return;
  }

  filtrados.forEach(pago => {
    const badgeClass =
      pago.estado === "Confirmado"
        ? "badge-confirmado"
        : pago.estado === "Rechazado"
        ? "badge-rechazado"
        : "badge-revision";

    const conceptosTexto = Array.isArray(pago.conceptos)
      ? pago.conceptos.map(c => c.descripcion || c.nombre || c).join(", ")
      : pago.conceptos || "Abono / Mensualidad";

    const botonesAccion =
      pago.estado === "En Revisión"
        ? `<div class="acciones-celda">
            <button type="button" class="btn btn-success" onclick="confirmarPago('${pago.id}')">Confirmar</button>
            <button type="button" class="btn btn-danger" onclick="rechazarPago('${pago.id}')">Rechazar</button>
           </div>`
        : `<span class="muted small">${pago.fechaConciliacion || "Procesado"}</span>`;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${pago.id}</strong><br><span class="muted small">${pago.fecha}</span></td>
      <td><strong>${pago.alumnoNombre}</strong><br><span class="muted small">Mat: ${pago.matricula} ${pago.cedula ? "· " + pago.cedula : ""}</span></td>
      <td>${conceptosTexto}</td>
      <td>${pago.metodo}<br><span class="muted small">Ref: ${pago.referencia || "N/A"}</span></td>
      <td><strong>${formatearUSD(pago.totalUSD)}</strong><br><span class="muted small">${formatearBs(pago.totalUSD)}</span></td>
      <td><span class="badge ${badgeClass}">${pago.estado}</span></td>
      <td>${botonesAccion}</td>
    `;
    tbody.appendChild(tr);
  });
}

function aplicarDescuentoDeudaAlumno(pago) {
  const alumno = alumnosAdmin.find(a => String(a.matricula) === String(pago.matricula));
  if (!alumno) return;

  const listaConceptos = Array.isArray(pago.conceptos) ? pago.conceptos : [];

  listaConceptos.forEach(item => {
    const tipo = String(item.tipo || "").toUpperCase();
    const periodo = item.periodo || "2026-2027";
    const desc = String(item.descripcion || item.nombre || "").toUpperCase();

    if (tipo === "INSCRIPCION" || desc.includes("INSCRIPCIÓN") || desc.includes("INSCRIPCION")) {
      alumno.inscripcionPagada = true;
      alumno.inscripcionEnRevision = false;
      return;
    }

    if (!alumno.periodos) {
      alumno.periodos = {};
    }
    if (!alumno.periodos[periodo]) {
      alumno.periodos[periodo] = {
        saldo: 0,
        saldoEnRevision: false,
        mesesPendientes: [],
        mesesEnRevision: []
      };
    }

    const p = alumno.periodos[periodo];

    if (tipo === "SALDO" || tipo === "SALDO_PERIODO" || desc.includes("SALDO")) {
      const montoDesc = Number(item.monto || p.saldo || 0);
      p.saldo = Math.max(0, Number((Number(p.saldo || 0) - montoDesc).toFixed(2)));
      p.saldoEnRevision = false;
      return;
    }

    if (tipo === "MES" || tipo === "MENSUALIDAD") {
      const mesNombre = String(item.mes || item.mesRaw || item.nombre || "").trim();
      if (Array.isArray(p.mesesPendientes) && mesNombre) {
        p.mesesPendientes = p.mesesPendientes.filter(m => String(m).trim().toUpperCase() !== mesNombre.toUpperCase());
      }
      if (Array.isArray(p.mesesEnRevision) && mesNombre) {
        p.mesesEnRevision = p.mesesEnRevision.filter(m => String(m).trim().toUpperCase() !== mesNombre.toUpperCase());
      }
      return;
    }

    alumno.inscripcionEnRevision = false;
    p.saldoEnRevision = false;
    if (Array.isArray(p.mesesEnRevision)) {
      p.mesesEnRevision = [];
    }
  });

  alumno.inscripcionEnRevision = false;
  if (alumno.periodos) {
    Object.keys(alumno.periodos).forEach(per => {
      const p = alumno.periodos[per];
      if (p) {
        if (Number(p.saldo || 0) <= 0) {
          p.saldoEnRevision = false;
        }
        if (Array.isArray(p.mesesEnRevision) && Array.isArray(p.mesesPendientes)) {
          p.mesesEnRevision = p.mesesEnRevision.filter(m => p.mesesPendientes.includes(m));
        }
      }
    });
  }
}

function limpiarBanderasRechazoAlumno(pago) {
  const alumno = alumnosAdmin.find(a => String(a.matricula) === String(pago.matricula));
  if (!alumno) return;

  const listaConceptos = Array.isArray(pago.conceptos) ? pago.conceptos : [];

  listaConceptos.forEach(item => {
    const tipo = String(item.tipo || "").toUpperCase();
    const periodo = item.periodo || "2026-2027";
    const desc = String(item.descripcion || item.nombre || "").toUpperCase();

    if (tipo === "INSCRIPCION" || desc.includes("INSCRIPCIÓN") || desc.includes("INSCRIPCION")) {
      alumno.inscripcionEnRevision = false;
      return;
    }

    if (alumno.periodos && alumno.periodos[periodo]) {
      const p = alumno.periodos[periodo];
      if (tipo === "SALDO" || tipo === "SALDO_PERIODO" || desc.includes("SALDO")) {
        p.saldoEnRevision = false;
      }
      if (tipo === "MES" || tipo === "MENSUALIDAD") {
        const mesNombre = String(item.mes || item.mesRaw || item.nombre || "").trim();
        if (Array.isArray(p.mesesEnRevision) && mesNombre) {
          p.mesesEnRevision = p.mesesEnRevision.filter(m => String(m).trim().toUpperCase() !== mesNombre.toUpperCase());
        }
      }
    }
  });
}

function confirmarPago(pagoId) {
  const pago = pagosReportados.find(p => p.id === pagoId);
  if (!pago || pago.estado !== "En Revisión") return;

  pago.estado = "Confirmado";
  pago.fechaConciliacion = "Aprobado · " + new Date().toLocaleDateString("es-VE");
  aplicarDescuentoDeudaAlumno(pago);

  guardarDatosStorage();
  ultimoConteoRevision = pagosReportados.filter(p => p.estado === "En Revisión").length;
  actualizarDashboardCompleto();
  mostrarNotificacionAdmin(`Pago ${pago.id} (${pago.alumnoNombre}) aprobado y sincronizado con el portal.`, "info");
}

function rechazarPago(pagoId) {
  const pago = pagosReportados.find(p => p.id === pagoId);
  if (!pago || pago.estado !== "En Revisión") return;

  const motivo = prompt("Motivo del rechazo (se mostrará al representante):", "Referencia no localizada en banco");
  if (motivo === null) return;

  pago.estado = "Rechazado";
  pago.fechaConciliacion = motivo || "Rechazado por administración";
  limpiarBanderasRechazoAlumno(pago);

  guardarDatosStorage();
  ultimoConteoRevision = pagosReportados.filter(p => p.estado === "En Revisión").length;
  actualizarDashboardCompleto();
  mostrarNotificacionAdmin(`Pago ${pago.id} (${pago.alumnoNombre}) rechazado y sincronizado con el portal.`, "info");
}

function cargarPagosDemoIniciales() {
  pagosReportados = [
    {
      id: "REC-1001",
      fecha: new Date().toLocaleDateString("es-VE"),
      matricula: "2024218",
      cedula: "",
      alumnoNombre: "GUZMAN ACEVEDO, YOSMER JOSE",
      metodo: "Pago Móvil",
      referencia: "00894512",
      totalUSD: 98.00,
      estado: "En Revisión",
      conceptos: [
        { tipo: "saldo", periodo: "2026-2027", descripcion: "Saldo Período 2026-2027", monto: 98.00 }
      ]
    },
    {
      id: "REC-1002",
      fecha: new Date().toLocaleDateString("es-VE"),
      matricula: "2026045",
      cedula: "V-34901234",
      alumnoNombre: "GUTIERREZ SILVA, CAMILA ANDREA",
      metodo: "Transferencia Bancaria",
      referencia: "45120987",
      totalUSD: 100.00,
      estado: "En Revisión",
      conceptos: [
        { tipo: "inscripcion", descripcion: "Inscripción 2026-2027", monto: 50.00 },
        { tipo: "mes", periodo: "2026-2027", mes: "Mayo 2027", descripcion: "Mensualidad Mayo 2027", monto: 50.00 }
      ]
    }
  ];
  guardarDatosStorage();
}

function buscarAlumnoParaPagoManual(event) {
  event.preventDefault();
  const q = document.getElementById("manual-busqueda").value.trim().toUpperCase().replace(/[^A-Z0-9-]/g, "");
  const msg = document.getElementById("manual-msg");
  const box = document.getElementById("manual-formulario-box");

  if (!q) {
    msg.textContent = "Ingresa una cédula o matrícula";
    box.classList.add("oculto");
    return;
  }

  const encontrado = alumnosAdmin.find(al => {
    const mat = (al.matricula || "").toUpperCase();
    const ced = (al.cedula || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
    const qSinGuion = q.replace(/[^A-Z0-9]/g, "");
    return mat === q || (ced && ced === qSinGuion);
  });

  if (!encontrado) {
    msg.textContent = "No se encontró ningún estudiante con esa cédula o matrícula.";
    box.classList.add("oculto");
    return;
  }

  alumnoManualActual = encontrado;
  msg.textContent = "Estudiante localizado.";
  box.classList.remove("oculto");

  const deudaTotal = calcularDeudaAlumno(encontrado);
  document.getElementById("manual-alumno-anio").textContent = encontrado.anio;
  document.getElementById("manual-alumno-nombre").textContent = encontrado.nombre;
  document.getElementById("manual-alumno-meta").textContent =
    `Matrícula: ${encontrado.matricula} · Cédula: ${encontrado.cedula || "Sin cédula"} · Rep: ${encontrado.representante}`;

  const pill = document.getElementById("manual-alumno-deuda");
  pill.textContent = deudaTotal > 0 ? `Deuda: ${formatearUSD(deudaTotal)}` : "Solvente ($0.00)";
  pill.className = "status-pill " + (deudaTotal > 0 ? "deuda" : "solvente");

  conceptosManualesDisponibles = [];
  if (!encontrado.inscripcionPagada) {
    conceptosManualesDisponibles.push({
      id: "insc",
      tipo: "inscripcion",
      descripcion: "Inscripción 2026-2027",
      monto: PRECIO_INSCRIPCION
    });
  }

  Object.keys(encontrado.periodos).forEach(per => {
    const info = encontrado.periodos[per];
    if (Number(info.saldo || 0) > 0) {
      conceptosManualesDisponibles.push({
        id: "saldo-" + per,
        tipo: "saldo",
        periodo: per,
        descripcion: `Saldo Período ${per}`,
        monto: Number(info.saldo)
      });
    }
    if (Array.isArray(info.mesesPendientes)) {
      info.mesesPendientes.forEach(mes => {
        conceptosManualesDisponibles.push({
          id: `mes-${per}-${mes}`,
          tipo: "mes",
          periodo: per,
          mes: mes,
          descripcion: `Mensualidad ${mes}`,
          monto: PRECIO_MENSUALIDAD
        });
      });
    }
  });

  const listaEl = document.getElementById("manual-conceptos-lista");
  listaEl.innerHTML = "";

  if (!conceptosManualesDisponibles.length) {
    listaEl.innerHTML = `<p class="muted">Este estudiante está solvente y no tiene conceptos pendientes.</p>`;
  } else {
    conceptosManualesDisponibles.forEach((c, idx) => {
      const label = document.createElement("label");
      label.className = "check-item";
      label.innerHTML = `
        <span><input type="checkbox" class="chk-manual" data-idx="${idx}" checked onchange="recalcularTotalManual()" /> <strong>${c.descripcion}</strong></span>
        <span>${formatearUSD(c.monto)}</span>
      `;
      listaEl.appendChild(label);
    });
  }

  recalcularTotalManual();
}

function recalcularTotalManual() {
  let total = 0;
  document.querySelectorAll(".chk-manual:checked").forEach(chk => {
    const idx = Number(chk.dataset.idx);
    if (conceptosManualesDisponibles[idx]) {
      total += conceptosManualesDisponibles[idx].monto;
    }
  });
  document.getElementById("manual-total-usd").textContent = formatearUSD(total);
  document.getElementById("manual-total-bs").textContent = formatearBs(total);
}

function guardarPagoManual() {
  if (!alumnoManualActual) return;

  const seleccionados = [];
  document.querySelectorAll(".chk-manual:checked").forEach(chk => {
    const idx = Number(chk.dataset.idx);
    if (conceptosManualesDisponibles[idx]) {
      seleccionados.push(conceptosManualesDisponibles[idx]);
    }
  });

  if (!seleccionados.length) {
    alert("Selecciona al menos un concepto pendiente para registrar el pago.");
    return;
  }

  const metodo = document.getElementById("manual-metodo").value;
  const referencia = document.getElementById("manual-referencia").value.trim();
  const estadoInicial = document.getElementById("manual-estado-inicial").value;
  const totalUSD = seleccionados.reduce((acc, c) => acc + c.monto, 0);

  const nuevoPago = {
    id: "REC-" + (1000 + pagosReportados.length + 1),
    fecha: new Date().toLocaleDateString("es-VE"),
    matricula: alumnoManualActual.matricula,
    cedula: alumnoManualActual.cedula || "",
    alumnoNombre: alumnoManualActual.nombre,
    metodo,
    referencia: referencia || "Taquilla",
    totalUSD,
    estado: estadoInicial,
    fechaConciliacion: estadoInicial === "Confirmado" ? "Aprobado · " + new Date().toLocaleDateString("es-VE") : "",
    conceptos: seleccionados
  };

  if (estadoInicial === "Confirmado") {
    aplicarDescuentoDeudaAlumno(nuevoPago);
  }

  pagosReportados.unshift(nuevoPago);
  guardarDatosStorage();
  ultimoConteoRevision = pagosReportados.filter(p => p.estado === "En Revisión").length;
  actualizarDashboardCompleto();

  document.getElementById("manual-referencia").value = "";
  document.getElementById("manual-formulario-box").classList.add("oculto");
  document.getElementById("manual-busqueda").value = "";
  document.getElementById("manual-msg").textContent = "Comprobante registrado correctamente.";
  cambiarTab("conciliacion");
}

function poblarFiltroAnios() {
  const select = document.getElementById("filtro-anio-alumno");
  if (!select) return;
  const aniosUnicos = [...new Set(alumnosAdmin.map(a => a.anio))];
  select.innerHTML = `<option value="TODOS">Todos los años</option>`;
  aniosUnicos.forEach(anio => {
    const opt = document.createElement("option");
    opt.value = anio;
    opt.textContent = anio;
    select.appendChild(opt);
  });
}

function obtenerAlumnosFiltrados() {
  const texto = (document.getElementById("filtro-texto-alumno")?.value || "").trim().toUpperCase();
  const anioFiltro = document.getElementById("filtro-anio-alumno")?.value || "TODOS";
  const solvenciaFiltro = document.getElementById("filtro-solvencia-alumno")?.value || "TODOS";

  return alumnosAdmin.filter(al => {
    const deuda = calcularDeudaAlumno(al);
    const coincideTexto =
      !texto ||
      al.nombre.toUpperCase().includes(texto) ||
      al.matricula.toUpperCase().includes(texto) ||
      (al.cedula && al.cedula.toUpperCase().includes(texto));

    const coincideAnio = anioFiltro === "TODOS" || al.anio === anioFiltro;
    const coincideSolvencia =
      solvenciaFiltro === "TODOS" ||
      (solvenciaFiltro === "PENDIENTE" && deuda > 0) ||
      (solvenciaFiltro === "SOLVENTE" && deuda <= 0);

    return coincideTexto && coincideAnio && coincideSolvencia;
  });
}

function renderizarTablaAlumnos() {
  const tbody = document.getElementById("tbody-alumnos");
  if (!tbody) return;
  tbody.innerHTML = "";

  const lista = obtenerAlumnosFiltrados();

  lista.forEach(al => {
    const deuda = calcularDeudaAlumno(al);
    const badge =
      deuda > 0
        ? `<span class="badge badge-revision">Pendiente</span>`
        : `<span class="badge badge-confirmado">Solvente</span>`;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${al.matricula}</strong></td>
      <td>${al.cedula || "Sin cédula"}</td>
      <td>${al.nombre}</td>
      <td>${al.anio}</td>
      <td>${al.representante}</td>
      <td><strong>${formatearUSD(deuda)}</strong></td>
      <td>${formatearBs(deuda)}</td>
      <td>${badge}</td>
    `;
    tbody.appendChild(tr);
  });
}

function descargarEstadoCuentaPDF() {
  const lista = obtenerAlumnosFiltrados();
  const anioSel = document.getElementById("filtro-anio-alumno")?.value || "TODOS";
  const solvenciaSel = document.getElementById("filtro-solvencia-alumno")?.value || "TODOS";
  const fechaEmision = new Date().toLocaleDateString("es-VE");

  let totalUSD = 0;
  const filasHTML = lista.map((al, i) => {
    const deuda = calcularDeudaAlumno(al);
    totalUSD += deuda;
    return `
      <tr>
        <td>${i + 1}</td>
        <td>${al.matricula}</td>
        <td>${al.cedula || "Sin cédula"}</td>
        <td>${al.nombre}</td>
        <td>${al.anio}</td>
        <td>${al.representante}</td>
        <td style="text-align:right;font-weight:bold;">${formatearUSD(deuda)}</td>
        <td style="text-align:right;">${formatearBs(deuda)}</td>
        <td>${deuda > 0 ? "Pendiente" : "Solvente"}</td>
      </tr>
    `;
  }).join("");

  const ventanaPDF = window.open("", "_blank");
  if (!ventanaPDF) {
    alert("Permite las ventanas emergentes en tu navegador para generar el PDF.");
    return;
  }

  ventanaPDF.document.write(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <title>Estado de Cuenta General - U.E.I SAN ANTONIO C.A.</title>
      <style>
        body { font-family: "Segoe UI", Arial, sans-serif; color: #1e293b; padding: 24px; font-size: 11px; }
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #1545b8; padding-bottom: 12px; margin-bottom: 16px; }
        .header h1 { margin: 0; font-size: 16px; color: #1545b8; }
        .header p { margin: 2px 0; color: #475569; }
        .resumen { background: #f1f5f9; padding: 10px 14px; border-radius: 6px; margin-bottom: 14px; display: flex; justify-content: space-between; font-weight: bold; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #cbd5e1; padding: 6px 7px; text-align: left; }
        th { background: #1545b8; color: #ffffff; font-size: 10px; }
        tr:nth-child(even) { background: #f8fafc; }
        @media print {
          @page { size: landscape; margin: 10mm; }
          body { padding: 0; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <h1>U.E.I SAN ANTONIO C.A. — ESTADO DE CUENTA GENERAL</h1>
          <p>RIF: J303927017 · Telf: 0424-8912975 · Upata, Estado Bolívar</p>
        </div>
        <div style="text-align:right;">
          <p><strong>Fecha de emisión:</strong> ${fechaEmision}</p>
          <p><strong>Tasa BCV aplicada:</strong> Bs. ${tasaBCVActual.toFixed(2)} / $</p>
          <p><strong>Filtro:</strong> ${anioSel} · ${solvenciaSel}</p>
        </div>
      </div>

      <div class="resumen">
        <span>Total registros en reporte: ${lista.length}</span>
        <span>Total Cartera USD: ${formatearUSD(totalUSD)}</span>
        <span>Total Cartera Bs.: ${formatearBs(totalUSD)}</span>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Matrícula</th>
            <th>Cédula</th>
            <th>Estudiante</th>
            <th>Año / Sección</th>
            <th>Representante</th>
            <th>Deuda USD</th>
            <th>Deuda Bs.</th>
            <th>Estatus</th>
          </tr>
        </thead>
        <tbody>${filasHTML}</tbody>
      </table>

      <script>
        window.onload = function() {
          window.print();
        };
      </script>
    </body>
    </html>
  `);
  ventanaPDF.document.close();
}

function actualizarDashboardCompleto() {
  actualizarKPIs();
  renderizarTablaPagos();
  renderizarTablaAlumnos();
  renderizarBandejaDirectaWhatsApp();
}

window.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem(STORAGE_KEY_SESION) === "activa") {
    mostrarPanelAdmin();
  }
});