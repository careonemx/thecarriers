/**
 * Recibe el formulario de acceso anticipado del sitio y guarda cada solicitud
 * como una fila en la hoja de Google donde vive este script.
 *
 * Instalación: Extensiones → Apps Script en la hoja, pegar este archivo,
 * Implementar → Nueva implementación → Aplicación web, "Ejecutar como: yo" y
 * "Quién tiene acceso: cualquier usuario". La URL que termina en /exec es el
 * valor de NEXT_PUBLIC_FORM_ENDPOINT.
 *
 * Cada cambio a este script exige una implementación nueva (o editar la
 * existente y elegir "Nueva versión"): la URL publicada sirve la versión con la
 * que se implementó, no la que está guardada.
 */

/** Los campos que manda el formulario, en el orden de las columnas. */
const CAMPOS = ["nombre", "email", "empresa", "envios_por_mes", "canales", "paqueterias"];

/** A quién avisar de cada solicitud. Vacío para no mandar correo. */
const AVISAR_A = "";

function doPost(e) {
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (hoja.getLastRow() === 0) hoja.appendRow(["fecha", ...CAMPOS]);

  const p = e.parameter;
  const fila = [new Date(), ...CAMPOS.map((c) => p[c] || "")];
  hoja.appendRow(fila);

  if (AVISAR_A) {
    MailApp.sendEmail(
      AVISAR_A,
      `Acceso anticipado: ${p.empresa || p.nombre || "nueva solicitud"}`,
      CAMPOS.map((c) => `${c}: ${p[c] || ""}`).join("\n"),
    );
  }

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
