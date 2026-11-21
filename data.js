const PERIODOS_ESCOLARES = [
  "2023-2024",
  "2024-2025",
  "2025-2026",
  "2026-2027"
];

const MESES_ESCOLARES = [
  "Septiembre 2026",
  "Octubre 2026",
  "Noviembre 2026",
  "Diciembre 2026",
  "Enero 2027",
  "Febrero 2027",
  "Marzo 2027",
  "Abril 2027",
  "Mayo 2027",
  "Junio 2027",
  "Julio 2027",
  "Agosto 2027"
];

const PRECIO_INSCRIPCION = 50;
const PRECIO_MENSUALIDAD = 50;
const TASA_BCV_INICIAL = 45.00;
const WHATSAPP_ADMINISTRACION = "584248912975";

const DATOS_TRANSFERENCIA = {
  titular: "UNIDAD EDUCATIVA INSTITUTO SAN ANTONIO CA",
  banco: "BANCAMIGA",
  rif: "J303927017",
  telefono: "04248912975",
  cuenta: "01720801288015254074"
};

const DATOS_PAGO_MOVIL = {
  titular: "UNIDAD EDUCATIVA INSTITUTO SAN ANTONIO CA",
  banco: "0172 (BANCAMIGA)",
  rif: "J303927017",
  telefono: "04248912975"
};

const ALUMNOS_INICIALES = [
  {
    matricula: "2023001",
    cedula: "V-28110234",
    nombre: "MENDOZA RIVAS, VALERIA SOFIA",
    anio: "Retirado (3er Año)",
    representante: "RIVAS CARMEN",
    telefono: "0414-8521470",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 145.00, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 0, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024064-P",
    cedula: "",
    nombre: "BOLIVAR GONZALEZ, JEFERSON JOSUE (CASO 2024-2025)",
    anio: "Retirado (1er Año)",
    representante: "GONZALEZ ROSMARY",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 500.00, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 0, mesesPendientes: [] }
    }
  },
  {
    matricula: "2025019",
    cedula: "V-31884512",
    nombre: "CASTILLO PEREZ, DIEGO ALEJANDRO",
    anio: "Retirado (4to Año)",
    representante: "PEREZ MARIBEL",
    telefono: "0424-9632580",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 220.00, mesesPendientes: [] },
      "2026-2027": { saldo: 0, mesesPendientes: [] }
    }
  },
  {
    matricula: "2026045",
    cedula: "V-34901234",
    nombre: "GUTIERREZ SILVA, CAMILA ANDREA",
    anio: "2do Año",
    representante: "SILVA YOHANA",
    telefono: "0424-8877665",
    inscripcionPagada: false,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": {
        saldo: 0,
        mesesPendientes: ["Mayo 2027", "Junio 2027", "Julio 2027", "Agosto 2027"]
      }
    }
  },
  {
    matricula: "2024251",
    cedula: "V-34729201",
    nombre: "REQUENA BOATSWAIN, DANNA",
    anio: "5to Año",
    representante: "BOATSWAIN DORIS",
    telefono: "0424-9504811",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 300.00, mesesPendientes: [] },
      "2026-2027": {
        saldo: 0,
        mesesPendientes: ["Marzo 2027", "Abril 2027", "Mayo 2027", "Junio 2027", "Julio 2027", "Agosto 2027"]
      }
    }
  },
  {
    matricula: "2026099",
    cedula: "V-32456789",
    nombre: "TORRES BLANCO, SANTIAGO JOSE",
    anio: "5to Año",
    representante: "BLANCO ANA MARIA",
    telefono: "0412-5544332",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 0, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024588",
    cedula: "",
    nombre: "CARDENAS RENDON, DEIBIS ANDRES",
    anio: "1er Año A",
    representante: "RENDON MAYORGA, MARIANNY JOSEFINA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 48.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024597",
    cedula: "",
    nombre: "LIMAYMANTA GONZALEZ, JOSUE NAHIL",
    anio: "1er Año A",
    representante: "GONZALEZ ORTIZ, ESTHEFANIA MAYDARLYN (eg3453239@gmail.com)",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024617",
    cedula: "",
    nombre: "ZAPATA MUNOZ, YEFERSON DANIEL",
    anio: "1er Año A",
    representante: "MUNOZ ASCANIO, YESSI CAROLINA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 48.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024637",
    cedula: "",
    nombre: "CEDENO MUNOZ, YUVISMAR ISABEL",
    anio: "1er Año B",
    representante: "MUNOZ BLANCA, YUBIRMA DEL CARMEN",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024644",
    cedula: "",
    nombre: "GIL PINTO, ESTER VALENTINA",
    anio: "1er Año B",
    representante: "PINTO AULAR, CORINA MERARI",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024623",
    cedula: "",
    nombre: "RIVAS RIVAS, ISABELLA VALENTINA",
    anio: "1er Año B",
    representante: "RIVAS MONTILLA, ROYMAR MAIYARIT",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024627",
    cedula: "",
    nombre: "RODRIGUEZ AGUILERA, EVELIANNYS CRISTINA",
    anio: "1er Año B",
    representante: "RODRIGUEZ, IRACELYS DEL VALLE",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 100.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024641",
    cedula: "",
    nombre: "RODRIGUEZ RUIZ, VALERY SOFIA",
    anio: "1er Año B",
    representante: "RUIZ MARTINEZ, YUSLEIDA DEL CARMEN",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024526",
    cedula: "",
    nombre: "GIRON CORRALES, CARLOS LUIS",
    anio: "2do Año A",
    representante: "CORRALES YAMIN (yamincorrales@gmail.com)",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024527",
    cedula: "",
    nombre: "GONZALEZ GONZALEZ, EFRAIN JEROHAN",
    anio: "2do Año A",
    representante: "GONZALEZ ROGELKIS",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 100.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024533",
    cedula: "",
    nombre: "GUTIERREZ GUTIERREZ, JEREMY XAVIEL",
    anio: "2do Año A",
    representante: "GUTIERREZ NAIKA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024541",
    cedula: "",
    nombre: "PEREZ REQUENA, MAURICIO EMMANUEL",
    anio: "2do Año A",
    representante: "REQUENA ANA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024557",
    cedula: "",
    nombre: "REVILLA GONZALEZ, YERRIKA VALERIA",
    anio: "2do Año A",
    representante: "GONZALEZ MARLYN",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024658",
    cedula: "",
    nombre: "ASTUDILLO RODRIGUEZ, KENDRA NAHOMI",
    anio: "2do Año B",
    representante: "RODRIGUEZ NARANJO, KENIA INDIRA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024560",
    cedula: "",
    nombre: "FIGUERAS GUTIERREZ, FRANCIELYS ADRIANNA",
    anio: "2do Año B",
    representante: "GUTIERREZ MADELEYN",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 100.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024538",
    cedula: "",
    nombre: "FIGUEROA NASSEF, FABIAN ANTONIO",
    anio: "2do Año B",
    representante: "NASSEF VERUZKA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024656",
    cedula: "",
    nombre: "GIL MUNOZ, ADRIAN ANTONIO",
    anio: "2do Año B",
    representante: "MUNOZ RIVAS, ANDREINA DE LOS ANGELES",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024551",
    cedula: "",
    nombre: "GOUDET BETANCOURT, NERYMAR GABRIELLA",
    anio: "2do Año B",
    representante: "BETANCOURT MARIA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024558",
    cedula: "",
    nombre: "MAURERA PEREZ, NICOL ESTEFANIA",
    anio: "2do Año B",
    representante: "MAURERA MILAGROS",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024553",
    cedula: "",
    nombre: "OLIVEROS PEREZ, DARIANNYS BETZABETH",
    anio: "2do Año B",
    representante: "PEREZ YANELIS",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024547",
    cedula: "",
    nombre: "TORRELLES HERNANDEZ, ANTHONELLA DEL VALLE",
    anio: "2do Año B",
    representante: "HERNANDEZ ROXANA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024546",
    cedula: "",
    nombre: "YEPEZ DEL VALLE, ANA PAULA",
    anio: "2do Año B",
    representante: "DEL VALLE MABEL",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 98.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024011",
    cedula: "",
    nombre: "GIL PINTO, CARLOS ISAAC",
    anio: "3er Año A",
    representante: "PINTO CORINA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024608",
    cedula: "",
    nombre: "GUZMAN COLON, ADRIAN DANIEL",
    anio: "3er Año A",
    representante: "COLON BONALDE, ADRIANA JOSEFINA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 20.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024068",
    cedula: "",
    nombre: "MONTIEL NUTO, YEIDER ATILIO",
    anio: "3er Año A",
    representante: "NUTO YENNALI",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 100.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024607",
    cedula: "",
    nombre: "PEREZ VALDEZ, NILSON ALEXANDER",
    anio: "3er Año A",
    representante: "AULAR MARTINEZ, NEOMAY ROSANNA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 100.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024583",
    cedula: "",
    nombre: "PEREZ YEPEZ, LAURA SOPHIA",
    anio: "3er Año A",
    representante: "YEPEZ, LISBETH SUSANA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024609",
    cedula: "",
    nombre: "PENA MAURERA, ALEXANDRY YELIANNYS",
    anio: "3er Año A",
    representante: "MAURERA AULAR, ANNAYELIS YUSSETH",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024073",
    cedula: "",
    nombre: "ZAMORA BOLIVAR, LOYANNA NAZARETH",
    anio: "3er Año A",
    representante: "BOLIVAR ALIBEMAR",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024059",
    cedula: "",
    nombre: "ARO VILLAR, SEBASTIAN DAVID",
    anio: "3er Año B",
    representante: "VILLAR, MARCELA ALEJANDRA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 25.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024653",
    cedula: "",
    nombre: "CAPELLA, SEBASTIAN DAVID",
    anio: "3er Año B",
    representante: "MUNOZ ASCANIO, YESSI CAROLINA DOLORES",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024055",
    cedula: "",
    nombre: "DIAZ QUINCHOA, JEREMIAS ISRAEL",
    anio: "3er Año B",
    representante: "QUINCHOA YARITZA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024043",
    cedula: "",
    nombre: "FRANCESCHI BOLIVAR, JUAN DIEGO",
    anio: "3er Año B",
    representante: "BOLIVAR DIANA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024053",
    cedula: "",
    nombre: "GUZMAN CASTRO, ISABELLA MARITXEL",
    anio: "3er Año B",
    representante: "CASTRO ISAMAR",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024571",
    cedula: "",
    nombre: "LARA TORRELLES, ANNARELLA VICTORIA",
    anio: "3er Año B",
    representante: "TORRLLES HERNAIN",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024048",
    cedula: "",
    nombre: "LEIVA ASITIMBAY, FRANYELI ORIANA",
    anio: "3er Año B",
    representante: "ASITIMBAY FRANYELI",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 98.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024075",
    cedula: "",
    nombre: "MUNOZ SALAMANCA, SANTIAGO DAVID",
    anio: "3er Año B",
    representante: "MUNOZ GRECIA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024040",
    cedula: "",
    nombre: "PEREZ RODRIGUEZ, EDUARDO IGNACIO",
    anio: "3er Año B",
    representante: "RODRIGUEZ IRACELYSA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 100.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024610",
    cedula: "",
    nombre: "SALAS RODRIGUEZ, JHOANNYS ANAHIZ",
    anio: "3er Año B",
    representante: "RODRIGUEZ CARDOZA, FRANCIANNYS FIORELLA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024616",
    cedula: "",
    nombre: "ZAPATA MUNOZ, YEFREN DAVID",
    anio: "3er Año B",
    representante: "MUNOZ ASCANIO, YESSI CAROLINA DOLORES (munozyessi67@gmail.com)",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 48.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024093",
    cedula: "",
    nombre: "ANDARA DASILVA, FRANKLIN ALEJANDRO",
    anio: "4to Año A",
    representante: "DASILVA, MARIA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024101",
    cedula: "",
    nombre: "BONALDE LINARES, LEONISMAR CAMILA",
    anio: "4to Año A",
    representante: "LINARES, WENDIS",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024515",
    cedula: "",
    nombre: "CASTILLO ASTUDILLO, GABRIEL JOSE",
    anio: "4to Año A",
    representante: "ASTUDILLO, ROSA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024136",
    cedula: "",
    nombre: "CASTRO LANZ, JOE DANIEL",
    anio: "4to Año A",
    representante: "LANZ VERUSHKA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 100.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024651",
    cedula: "",
    nombre: "GUTIERREZ MARQUEZ, LUZIANA VICTORIA",
    anio: "4to Año A",
    representante: "GUTIERREZ MARQUE, ANA DEL VALLE",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 100.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024084",
    cedula: "",
    nombre: "MENDEZ FERNANDEZ, MARIA FERNANDA",
    anio: "4to Año A",
    representante: "FERNANDEZ MARIA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 100.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024146",
    cedula: "",
    nombre: "MENDEZ BRAVO, ILIA MADELEN",
    anio: "4to Año A",
    representante: "BRAVO MAGBIS",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024108",
    cedula: "",
    nombre: "PEREZ RODRIGUEZ, SEBASTIAN RAFAEL",
    anio: "4to Año A",
    representante: "RODRIGUEZ, LIONELA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024098",
    cedula: "",
    nombre: "RAMIREZ RENDON, SIMON ANDRES",
    anio: "4to Año A",
    representante: "RENDON MARIANNY",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 48.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024092",
    cedula: "",
    nombre: "RODRIGUEZ DASILVA, FABIAN JOSE",
    anio: "4to Año A",
    representante: "DASILVA YAIRYS",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 100.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024081",
    cedula: "",
    nombre: "RONDON FERNANDEZ, SAMUEL DAVID",
    anio: "4to Año A",
    representante: "FERNANDEZ DE RONDON, ANA YAMILEX",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024159",
    cedula: "",
    nombre: "RONDON GONZALEZ, ABRAHANNIEL JESUS",
    anio: "4to Año A",
    representante: "GONZALEZ MARILIN",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024163",
    cedula: "",
    nombre: "SALAZAR JIMENEZ, GABRIEL DAVID",
    anio: "4to Año A",
    representante: "JIMENEZ YRMARIS",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024086",
    cedula: "",
    nombre: "VARELA GRIMON, VALERIA VALENTINA",
    anio: "4to Año A",
    representante: "GRIMON YOJANNIS",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 75.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024153",
    cedula: "",
    nombre: "VARGAS LINARES, FRANSHESKA RASHELL",
    anio: "4to Año A",
    representante: "LINARES, LETIS",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024573",
    cedula: "",
    nombre: "WILCHEZ JIMENEZ, CAMILA VALENTINA",
    anio: "4to Año A",
    representante: "JIMENEZ MILAGROS",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 100.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024110",
    cedula: "",
    nombre: "YEPEZ DEL VALLE, SANTIAGO JOSE",
    anio: "4to Año A",
    representante: "DEL VALLE GARCIA, MABEL COROMOTO",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 48.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024160",
    cedula: "",
    nombre: "ARTEAGA DALLE CORT, SEBASTIAN RAFAEL",
    anio: "4to Año B",
    representante: "DALLE CORT VASQUEZ, MARI CARMEN LISETH",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024130",
    cedula: "",
    nombre: "ASCANIO AULAR, NEOMAR ALEXIS",
    anio: "4to Año B",
    representante: "AULAR NEOMARY",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 100.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024114",
    cedula: "",
    nombre: "BERMUDEZ GARCIA, FRANCIELYS VALENTINA",
    anio: "4to Año B",
    representante: "GARCIA NAYADESTH",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024121",
    cedula: "",
    nombre: "BOUBOU ODREMAN, ARLIANIS CHIQUINQUIRA",
    anio: "4to Año B",
    representante: "ODREMAN, ANNABEL",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 48.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024122",
    cedula: "",
    nombre: "BOUBOU ODREMAN, CARLIANIS CHIQUINQUIRA",
    anio: "4to Año B",
    representante: "ODREMAN, ANNABEL",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 48.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024112",
    cedula: "",
    nombre: "CAMPEROS QUISPE, EIMY VICTORIA",
    anio: "4to Año B",
    representante: "QUISPE EVELIN",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024144",
    cedula: "",
    nombre: "GUTIERREZ FERRER, ROSAURA DE LOS ANGELES",
    anio: "4to Año B",
    representante: "FERRER, GENESIS",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024123",
    cedula: "",
    nombre: "GUZMAN ACEVEDO, FRANCIELYS CHIQUINQUIRA",
    anio: "4to Año B",
    representante: "ACEVEDO, YUXANDRA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 48.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024119",
    cedula: "",
    nombre: "MARIN RODRIGUEZ, MARCOS ANTHUAN",
    anio: "4to Año B",
    representante: "RODRIGUEZ, ELIMAR",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 150.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024131",
    cedula: "",
    nombre: "MARTINEZ ARAY, FANYILIS ISAIMAR",
    anio: "4to Año B",
    representante: "ARAY FABIANNYS",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024135",
    cedula: "",
    nombre: "MARTINEZ BOLIVAR, MOISES GASTON",
    anio: "4to Año B",
    representante: "BOLIVAR YOSAIRA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 100.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024120",
    cedula: "",
    nombre: "NAVAS DASILVA, MARIAFERNANDA DE LOS ANGELES",
    anio: "4to Año B",
    representante: "NAVAS CARLOS",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024132",
    cedula: "",
    nombre: "RODRIGUEZ LAPALMA, SEBASTIAN GREGORIO",
    anio: "4to Año B",
    representante: "LAPALMA ALEJANDRA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 150.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024124",
    cedula: "",
    nombre: "RODRIGUEZ RODRIGUEZ, MARCO AURELIO",
    anio: "4to Año B",
    representante: "RODRIGUEZ KARELYS",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 100.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024645",
    cedula: "",
    nombre: "SANDOVAL YNFANTE, AARON JAVIER",
    anio: "4to Año B",
    representante: "YNFANTE PARRA, YORHANA BETSABETH",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024214",
    cedula: "",
    nombre: "ARA SALAZAR, ADRIANO ANDRES",
    anio: "5to Año A",
    representante: "ARA GABRIEL",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024176",
    cedula: "",
    nombre: "ASTUDILLO RODRIGUEZ, SANTIAGO ALBERTO",
    anio: "5to Año A",
    representante: "RODRIGUEZ KENIA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024613",
    cedula: "",
    nombre: "BELIZARIO SUAREZ, JULIO GERARDO",
    anio: "5to Año A",
    representante: "SUAREZ OCHOA, MARBELIS CAROLINA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024178",
    cedula: "",
    nombre: "COA BANDU, JULIANA VALENTINA",
    anio: "5to Año A",
    representante: "BANDU, YOSAIDA DEL CARMEN",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 100.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024179",
    cedula: "",
    nombre: "CORO REPIZZO, SOFIA ESTEFANIA",
    anio: "5to Año A",
    representante: "REPIZZO, MARIA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024183",
    cedula: "",
    nombre: "LEIVA ASITIMBAY, SAMMYR ALEXANDER",
    anio: "5to Año A",
    representante: "ASITIMBAY ASTHER",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 98.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024190",
    cedula: "",
    nombre: "MALAVE GONZALEZ, RONNIEL ALEXANDER",
    anio: "5to Año A",
    representante: "GONZALEZ SINDI",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024513",
    cedula: "",
    nombre: "MARQUEZ JIMENEZ, LUIS ALFREDO",
    anio: "5to Año A",
    representante: "MARQUEZ GREGORI",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024188",
    cedula: "",
    nombre: "MORENO BARRIOS, RICCARDO ADOLFO",
    anio: "5to Año A",
    representante: "LILIANA BARRIOS",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 100.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024185",
    cedula: "",
    nombre: "RIVAS GARCIA, LEORVIS VALENTINA",
    anio: "5to Año A",
    representante: "RIVAS LEONARDO",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 35.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024512",
    cedula: "",
    nombre: "VALLADARES VALLADARES, CAMILA VALENTINA",
    anio: "5to Año A",
    representante: "VALLADARES, ANNA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024182",
    cedula: "",
    nombre: "VIAMONTE MALAVE, JEREMY MOISES",
    anio: "5to Año A",
    representante: "MALAVE LITZABETH",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024194",
    cedula: "",
    nombre: "ASCANIO LOPEZ, JUAN DIEGO",
    anio: "5to Año B",
    representante: "LOPEZ YARELYS",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024196",
    cedula: "",
    nombre: "BRAVO VELIZ, VERONICA ISABELLA",
    anio: "5to Año B",
    representante: "VELIZ RAIZA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024208",
    cedula: "",
    nombre: "CARVAJAL PINTO, KARISBELYS ISABEL",
    anio: "5to Año B",
    representante: "PINTO KARINA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024220",
    cedula: "",
    nombre: "COA CONTRERAS, RAYNER JOSUE",
    anio: "5to Año B",
    representante: "CONTRERAS EVELYN",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 48.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024192",
    cedula: "",
    nombre: "GAMEZ VARGAS, YEIZIBEL MARVELIA",
    anio: "5to Año B",
    representante: "VARGAS DE GAMEZ, YELITZA MARVELIA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 100.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024219",
    cedula: "",
    nombre: "GUTIERREZ BRACHO, CARLOS JESUS",
    anio: "5to Año B",
    representante: "BRACHO ARELIS",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 100.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024218",
    cedula: "",
    nombre: "GUZMAN ACEVEDO, YOSMER JOSE",
    anio: "5to Año B",
    representante: "GUZMAN FRANKLIN",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 98.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024201",
    cedula: "",
    nombre: "MARQUEZ CARVAJAL, HUGO FERNANDO",
    anio: "5to Año B",
    representante: "CARVAJAL LERIANA",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024211",
    cedula: "",
    nombre: "MARTINEZ TORRES, REINALDO ALEJANDRO",
    anio: "5to Año B",
    representante: "MARTINEZ TORRES, LUZ MARY",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  },
  {
    matricula: "2024226",
    cedula: "",
    nombre: "TORRES LANZ, LUNA ANDREYNEL",
    anio: "5to Año",
    representante: "LANZ NELY",
    telefono: "No registrado",
    inscripcionPagada: true,
    periodos: {
      "2023-2024": { saldo: 0, mesesPendientes: [] },
      "2024-2025": { saldo: 0, mesesPendientes: [] },
      "2025-2026": { saldo: 0, mesesPendientes: [] },
      "2026-2027": { saldo: 50.00, mesesPendientes: [] }
    }
  }
];