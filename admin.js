function limpiarBanderasRevisionAlumno(alumno, periodo, mes) {
  if (!alumno) return;

  if (periodo && alumno.periodos && alumno.periodos[periodo]) {
    const p = alumno.periodos[periodo];
    if (Number(p.saldo || 0) <= 0) {
      p.saldoEnRevision = false;
    }
    if (mes && Array.isArray(p.mesesEnRevision)) {
      p.mesesEnRevision = p.mesesEnRevision.filter((m) => m !== mes);
    }
  }
}

function aplicarDescuentoDeudaAlumno(pago) {
  const alumno = alumnosAdmin.find((a) => a.matricula === pago.matricula);
  if (!alumno) return;

  const listaConceptos = Array.isArray(pago.conceptos) ? pago.conceptos : [];

  listaConceptos.forEach((item) => {
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
      if (p.saldo <= 0) {
        p.saldoEnRevision = false;
      }
      return;
    }

    if (tipo === "MES" || tipo === "MENSUALIDAD") {
      const mesNombre = item.mes || item.mesRaw || item.nombre || "";
      if (Array.isArray(p.mesesPendientes) && mesNombre) {
        p.mesesPendientes = p.mesesPendientes.filter((m) => m !== mesNombre);
      }
      if (Array.isArray(p.mesesEnRevision) && mesNombre) {
        p.mesesEnRevision = p.mesesEnRevision.filter((m) => m !== mesNombre);
      }
      return;
    }

    // Limpieza general de revisión si viene con otro formato de concepto
    p.saldoEnRevision = false;
    alumno.inscripcionEnRevision = false;
    if (Array.isArray(p.mesesEnRevision)) {
      p.mesesEnRevision = [];
    }
  });

  // Si ya no queda deuda pendiente ni conceptos en revisión, asegura que no quede marcado en revisión
  if (calcularDeudaAlumno(alumno) <= 0) {
    alumno.inscripcionEnRevision = false;
    if (alumno.periodos) {
      Object.keys(alumno.periodos).forEach((per) => {
        alumno.periodos[per].saldoEnRevision = false;
        alumno.periodos[per].mesesEnRevision = [];
      });
    }
  }
}