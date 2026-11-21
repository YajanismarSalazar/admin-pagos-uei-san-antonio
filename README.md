# Panel Administrativo de Pagos — U.E.I SAN ANTONIO C.A.

Aplicación web administrativa para la gestión, conciliación y control de pagos reportados por representantes, actualización de tasa oficial BCV, registro manual de comprobantes recibidos por WhatsApp o taquilla y generación de reportes de estado de cuenta en PDF.
web site: https://yajanismarsalazar.github.io/admin-pagos-uei-san-antonio/

## Datos institucionales
- **Institución:** U.E.I SAN ANTONIO C.A.
- **RIF:** J-30392701-7
- **Teléfono / Administración:** 0424-8912975
- **Ubicación:** Upata, Estado Bolívar, Venezuela

## Credenciales de acceso (Demo)
- **Usuario:** `administrador1`
- **Contraseña:** `123456`

## Estructura del proyecto
- `index.html`: Interfaz de inicio de sesión y panel administrativo con pestañas de conciliación, registro manual y estado de cuenta general.
- `styles.css`: Estilos visuales institucionales y diseño adaptable.
- `admin.js`: Lógica de autenticación, actualización de tasa BCV (manual y consulta automática), conciliación de pagos (`En Revisión`, `Confirmado`, `Rechazado`), descuento automático de saldos y generación de reporte PDF.
- `data.js`: Base de datos compartida con los 99 registros estudiantiles (`ALUMNOS_INICIALES`) y tarifas institucionales.
- `logo.jpg`: Logotipo oficial de la institución.

## Funcionalidades principales
1. **Indicadores en tiempo real (KPIs):** Resumen de pagos en revisión, pagos confirmados, cartera total por cobrar en USD y Bs., y conteo de alumnos solventes.
2. **Conciliación de pagos:** Filtrado automático por estado (`En Revisión`, `Confirmado`, `Rechazado`, `Todos`) con confirmación o rechazo directo que actualiza el saldo del estudiante.
3. **Registro de pagos externos:** Carga y validación de comprobantes recibidos vía WhatsApp o taquilla (Pago Móvil, Transferencia Bancaria, Efectivo USD, Cashea y Punto de Venta).
4. **Estado de cuenta general y PDF:** Consulta de los 99 registros con búsqueda por nombre, cédula o matrícula, filtros por año/sección y solvencia, y exportación directa a PDF.
5. **Control de tasa BCV:** Actualización manual o consulta en línea de la tasa del día con conversión automática de todos los montos a Bolívares.

## Uso y pruebas
1. Abre `index.html` en el navegador o mediante GitHub Pages.
2. Inicia sesión con las credenciales provisionales (`administrador1` / `123456`).
3. Revisa los pagos pendientes en **1. Conciliación de Pagos**, registra un pago nuevo en **2. Registrar Pago Recibido** o filtra y descarga el reporte en **3. Estado de Cuenta General**.
