/**
 * Health & Life — receptor de leads (Google Apps Script)
 * Recibe el POST de app.js, guarda una fila en "Leads", avisa por email
 * y mantiene una pestaña "Resumen" con la distribución de resultados.
 */
const HEADERS = ['fecha', 'nombre', 'contacto', 'objetivo', 'scoreTotal', 'estado',
  'estres', 'descanso', 'movimiento', 'habitos', 'estadoFisico', 'perfil', 'palanca',
  'alertaSeguridad', 'modo', 'utm_source', 'utm_medium', 'utm_campaign', 'consentimiento', 'objetivoPrincipal', 'tiempoSemanal', 'freno'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    // Seguridad básica: sin consentimiento no se guarda nada
    if (d.web) return ContentService.createTextOutput('ignorado');
    if (d.consentimiento !== 'sí') return ContentService.createTextOutput('sin consentimiento');

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName('Leads');
    if (!sh) {
      sh = ss.insertSheet('Leads');
      sh.appendRow(HEADERS);
      sh.setFrozenRows(1);
    }
    sh.appendRow(HEADERS.map(h => d[h] !== undefined ? d[h] : ''));

    // Aviso solo para leads públicos; el modo 1:1 no genera aviso
    if (d.modo !== '1a1') {
      const to = Session.getEffectiveUser().getEmail();
      const wa = String(d.contacto).replace(/\D/g, '');
      MailApp.sendEmail(to,
        'Nuevo Health Score: ' + d.nombre + ' — ' + d.scoreTotal + '/100 (' + d.perfil + ')',
        'Nombre: ' + d.nombre + '\nContacto: ' + d.contacto + '\nObjetivo principal: ' + d.objetivoPrincipal + '\nTiempo semanal: ' + d.tiempoSemanal + '\nFreno: ' + d.freno + '\nComentario: ' + d.objetivo +
        '\nPuntuación: ' + d.scoreTotal + ' (' + d.estado + ')\nPerfil: ' + d.perfil +
        '\nPalanca: ' + d.palanca + '\nAlerta de seguridad: ' + d.alertaSeguridad +
        '\nOrigen: ' + (d.utm_source || '—') + ' / ' + (d.utm_campaign || '—') +
        (wa.length >= 9 ? '\nWhatsApp: https://wa.me/' + (wa.length === 9 ? '34' + wa : wa) : ''));
    }
    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}

/** Ejecútala una vez a mano para crear la pestaña Resumen. */
function crearResumen() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let r = ss.getSheetByName('Resumen') || ss.insertSheet('Resumen');
  r.clear();
  const L = "Leads!";
  const filas = [
    ['Total de evaluaciones', '=COUNTA(' + L + 'A2:A)'],
    ['Puntuación media', '=IFERROR(ROUND(AVERAGE(' + L + 'E2:E),1),0)'],
    ['Con alerta de seguridad', '=COUNTIF(' + L + 'N2:N,"sí")'],
    ['', ''],
    ['Por estado', 'Nº']
  ];
  ['Base frágil', 'Mejorable', 'Buen nivel', 'Muy buen nivel'].forEach(s =>
    filas.push([s, '=COUNTIF(' + L + 'F2:F,"' + s + '")']));
  filas.push(['', ''], ['Por perfil', 'Nº']);
  ['Alta carga, baja recuperación', 'Base activa, sistema desordenado', 'Cuerpo con limitaciones',
   'Buena recuperación, poco estímulo', 'Equilibrado con margen', 'Perfil mixto'].forEach(p =>
    filas.push([p, '=COUNTIF(' + L + 'L2:L,"' + p + '")']));
  filas.push(['', ''], ['Por palanca', 'Nº']);
  ['Descanso', 'Estrés', 'Hábitos', 'Movimiento', 'Estado físico'].forEach(p =>
    filas.push([p, '=COUNTIF(' + L + 'M2:M,"' + p + '")']));
  r.getRange(1, 1, filas.length, 2).setValues(filas);
  r.getRange('D1').setValue('Por origen (utm_source)');
  r.getRange('D2').setFormula('=IFERROR(QUERY(' + L + 'P2:P,"select P, count(P) where P <> \'\' group by P label count(P) \'Nº\'",0),"Sin datos de origen todavía")');
  r.autoResizeColumns(1, 4);
}
