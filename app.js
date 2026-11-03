'use strict';
// ── Configuración editable ───────────────────────────────────
const CFG = {
  endpoint: 'https://script.google.com/macros/s/AKfycbxJkYVVQVRv2b1-c39NLSIYYZgsQ-z_XHvgU6hxt1MaKAyu71cHPPmaUSaMrdCveTC2AA/exec',
  wa: '34679691337',
  precio: '95 €',
  incluye: ['Videollamada de 45 minutos para interpretar tu informe con tu contexto', 'Plan priorizado a 30 días']  // AJUSTAR a lo que incluya la valoración
};
const MODO = new URLSearchParams(location.search).get('modo') === '1a1' ? '1a1' : 'publico';

// ── Datos ────────────────────────────────────────────────────
const SAFETY = ['¿Te ha dicho un médico que tienes un problema de corazón o la tensión alta?', '¿Notas dolor en el pecho al hacer esfuerzo o en reposo?', '¿Has tenido mareos fuertes o pérdida de conocimiento al hacer ejercicio?', '¿Tienes un problema de huesos o articulaciones que empeora con el ejercicio?', '¿Tomas medicación para la tensión o el corazón?', '¿Estás embarazada o en posparto reciente (si aplica)?', '¿Hay alguna otra razón médica por la que no debas hacer ejercicio?'];
const NEG = ['Siempre', 'Casi siempre', 'A veces', 'Rara vez', 'Nunca'];
const POS = ['Nunca', 'Rara vez', 'A veces', 'Con frecuencia', 'Siempre'];
const QUAL = ['Muy mala', 'Mala', 'Aceptable', 'Buena', 'Muy buena'];
const BLOCKS = [
  { id: 'estres', name: 'Estrés', q: [
    ['Nivel de estrés en tu día a día', ['Muy alto casi todo el día', 'Alto con frecuencia', 'Moderado', 'Bajo', 'Muy bajo']],
    ['Sientes que tus responsabilidades superan tu capacidad de gestionarlas', NEG],
    ['Te cuesta desconectar mentalmente al acabar el día', NEG],
    ['Notas la mente acelerada o ansiedad', NEG],
    ['Recuperas bien tras días exigentes', POS]] },
  { id: 'descanso', name: 'Descanso', q: [
    ['Horas que duermes de media', ['Menos de 5 h', '5–6 h', '6–7 h', '7–8 h', '8 h o más']],
    ['Te despiertas de noche y te cuesta volver a dormir', NEG],
    ['Te levantas descansado/a', POS],
    ['Mantienes horarios de sueño regulares', POS],
    ['Calidad global de tu sueño', QUAL]] },
  { id: 'movimiento', name: 'Movimiento', q: [
    ['Días a la semana que entrenas', ['0 días', '1 día', '2 días', '3 días', '4 días o más']],
    ['Tu entrenamiento tiene estructura y progresión', ['Ninguna', 'Muy poca', 'Algo', 'Bastante', 'Mucha']],
    ['Horas al día que pasas sentado/a', ['10 h o más', '8–10 h', '6–8 h', '4–6 h', 'Menos de 4 h']],
    ['Haces trabajo de fuerza con carga al menos 2 veces por semana', POS],
    ['Trabajas la movilidad de forma regular', POS]] },
  { id: 'habitos', name: 'Hábitos', q: [
    ['Calidad de tu alimentación habitual', QUAL],
    ['Incluyes proteína y verdura en la mayoría de tus comidas', POS],
    ['Consumes ultraprocesados, dulces o bebidas azucaradas', NEG],
    ['Frecuencia de consumo de alcohol', ['A diario', 'Varias veces por semana', 'Fines de semana', 'Ocasionalmente', 'Casi nunca']],
    ['Pasas tiempo al aire libre con luz natural a diario', POS]] },
  { id: 'fisico', name: 'Estado físico', q: [
    ['Cómo valoras tu estado físico general', ['Muy malo', 'Malo', 'Aceptable', 'Bueno', 'Muy bueno']],
    ['Sufres dolores o molestias frecuentes', ['Muchos', 'Bastantes', 'Algunos', 'Pocos', 'Ninguno']],
    ['Tu nivel de energía a lo largo del día', ['Muy bajo', 'Bajo', 'Variable', 'Bueno', 'Alto']],
    ['Cómo responde tu cuerpo al esfuerzo físico', ['Muy mal', 'Mal', 'Aceptable', 'Bien', 'Muy bien']],
    ['Tienes limitaciones físicas que condicionan tu vida', ['Muchas', 'Bastantes', 'Algunas', 'Pocas', 'Ninguna']]] }
];
const CTX = [
  ['obj', 'Tu objetivo principal', ['Energía y vitalidad', 'Composición corporal', 'Rendimiento deportivo', 'Dolor o molestias', 'Estrés y sueño', 'Otro']],
  ['time', 'Tiempo semanal realista para cuidarte', ['Menos de 2 h', '2–4 h', '4–6 h', 'Más de 6 h']],
  ['block', 'Qué te ha frenado antes', ['Falta de tiempo', 'Falta de constancia', 'Lesiones o molestias', 'No saber por dónde empezar', 'Falta de motivación', 'Otro']]
];
const QS = BLOCKS.flatMap(b => b.q.map(q => ({ b: b.id, t: q[0], o: q[1] })));
// Palanca: entre las dos áreas más bajas, se prioriza la que está más "aguas arriba"
const UPSTREAM = ['descanso', 'estres', 'habitos', 'movimiento', 'fisico'];
const ACTIONS = {
  descanso: ['Levántate a la misma hora los 7 días, con un margen máximo de 30–45 minutos.', 'Busca luz natural durante la primera hora tras despertar.', 'Toma cafeína solo en la primera mitad del día y deja al menos 6 horas antes de dormir.'],
  estres: ['Dedica 10 minutos diarios a respiración lenta o a un paseo sin pantallas.', 'Reserva 30–60 minutos de desconexión antes de dormir.', 'Elimina o delega un compromiso no esencial esta semana.'],
  habitos: ['Incluye una fuente de proteína en cada comida principal.', 'Deja preparadas dos comidas de la semana para no improvisar.', 'Elige un hábito a reducir: alcohol o ultraprocesados.'],
  movimiento: ['Haz dos sesiones de fuerza básica esta semana, con una progresión pequeña.', 'Interrumpe el sedentarismo cada 45–60 minutos con 2–3 minutos de movimiento.', 'Camina 20–30 minutos al día como base (referencia: 7.000–8.000 pasos).'],
  fisico: ['Anota qué movimientos te molestan y evita forzarlos.', 'Haz 10 minutos de movilidad suave, sin dolor.', 'Camina o haz cardio suave 20–30 minutos. Si el dolor persiste, consulta con un profesional.']
};
const METRIC = { descanso: 'Hora de acostarte y energía matinal (1–10)', estres: 'Tensión percibida cada noche (1–10)', habitos: 'Comidas con proteína por semana', movimiento: 'Sesiones de fuerza y pasos medios', fisico: 'Dolor y energía (0–10)' };
const SAFE_ACTIONS = ['Antes de empezar un programa de ejercicio, consulta con tu médico.', 'Mientras tanto, camina a ritmo cómodo 20–30 minutos al día.', 'No hagas esfuerzos intensos hasta tener su valoración.'];
const NOMED = ['Tu historial y contexto médico y laboral', 'Medidas objetivas: composición, fuerza, movilidad, respuesta al esfuerzo', 'Por qué tus bloques se comportan así en tu caso', 'Un plan ajustado a tu agenda y recursos reales'];

// ── Lógica ───────────────────────────────────────────────────
const $ = s => document.querySelector(s);
let ans = [], step = 0, meta = {}, safetyAlert = false;

function status(t) {
  if (t <= 40) return ['Base frágil', 'Hay varias áreas que limitan tu bienestar. La buena noticia: con orden, mejoran rápido.', '#e05c5c'];
  if (t <= 60) return ['Mejorable', 'Tienes bases, pero algunas áreas frenan tu rendimiento diario.', '#e0a44c'];
  if (t <= 80) return ['Buen nivel', 'Un sistema sólido con margen claro de optimización.', '#6dc98a'];
  return ['Muy buen nivel', 'Hábitos consolidados. Toca afinar y mantener.', '#c9a84c'];
}
function profile(s) {
  const min = Math.min(...Object.values(s));
  if (s.estres <= 11 && s.descanso <= 11) return ['Alta carga, baja recuperación', 'Tu sistema gasta más de lo que recupera. Antes de exigir más, conviene recuperar capacidad.'];
  if (s.movimiento >= 13 && (s.habitos <= 11 || s.descanso <= 11)) return ['Base activa, sistema desordenado', 'Te mueves, pero el entorno de hábitos o descanso resta rendimiento a ese esfuerzo.'];
  if (s.fisico <= 10) return ['Cuerpo con limitaciones', 'Tu estado físico condiciona el resto. El orden de intervención importa mucho.'];
  if (s.movimiento <= 9 && s.descanso >= 12) return ['Buena recuperación, poco estímulo', 'Descansas razonablemente bien, pero falta movimiento estructurado.'];
  if (min >= 12) return ['Equilibrado con margen', 'Sin grandes cuellos de botella. El progreso viene de afinar lo medible.'];
  return ['Perfil mixto', 'Combinas áreas fuertes y débiles. Conviene priorizar una sola palanca.'];
}
function lever(s) {
  const low = Object.entries(s).sort((a, b) => a[1] - b[1]).slice(0, 2).map(e => e[0]);
  return low.sort((a, b) => UPSTREAM.indexOf(a) - UPSTREAM.indexOf(b))[0];
}
function calc() {
  const s = {}, per = QS.length / BLOCKS.length;
  BLOCKS.forEach((b, i) => s[b.id] = ans.slice(i * per, (i + 1) * per).reduce((x, y) => x + y, 0));
  const total = Object.values(s).reduce((x, y) => x + y, 0);
  return { s, total, st: status(total), pf: profile(s), lv: lever(s) };
}

// ── Vistas ───────────────────────────────────────────────────
function init() {
  $('#safetyList').innerHTML = SAFETY.map((t, i) => `<div class="sq"><span>${t}</span><div class="yn"><label><input type="radio" name="s${i}" value="1"><span>Sí</span></label><label><input type="radio" name="s${i}" value="0"><span>No</span></label></div></div>`).join('');
  $('#ctx').innerHTML = CTX.map(c => `<label>${c[1]}<select id="c_${c[0]}" required><option value="">Elige una opción</option>${c[2].map(o => `<option>${o}</option>`).join('')}</select></label>`).join('');
  $('#intake').addEventListener('submit', e => {
    e.preventDefault();
    const name = $('#name').value.trim(), contact = $('#contact').value.trim();
    const answered = SAFETY.every((_, i) => document.querySelector(`input[name=s${i}]:checked`));
    const okMail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact), okTel = contact.replace(/\D/g, '').length >= 9 && !/[a-z]/i.test(contact);
    if (!name || !(okMail || okTel)) return err('Indica tu nombre y un email o un teléfono válido.');
    if (CTX.some(c => !$('#c_' + c[0]).value)) return err('Elige una opción en las tres preguntas de contexto.');
    if (!answered) return err('Responde las siete preguntas del filtro de seguridad.');
    if (!$('#consent').checked) return err('Necesitamos tu consentimiento para generar el informe.');
    err('');
    safetyAlert = SAFETY.some((_, i) => document.querySelector(`input[name=s${i}]:checked`).value === '1');
    meta = { name, contact, goal: $('#goal').value.trim(), obj: $('#c_obj').value, time: $('#c_time').value, block: $('#c_block').value, bot: !!$('#web').value };
    $('#start').hidden = true; $('#quiz').hidden = false; show();
  });
  $('#back').addEventListener('click', () => { if (step > 0) { step--; show(); } });
}
function err(m) { $('#err').textContent = m; }
function show() {
  const q = QS[step], b = BLOCKS.find(x => x.id === q.b);
  $('#bar').style.width = (step / QS.length * 100) + '%';
  $('#qmeta').textContent = `${b.name} · pregunta ${step + 1} de ${QS.length}`;
  $('#qtext').textContent = q.t;
  $('#opts').innerHTML = q.o.map((o, i) => `<button type="button" class="opt${ans[step] === i ? ' sel' : ''}" data-i="${i}">${o}</button>`).join('');
  $('#back').hidden = step === 0;
  document.querySelectorAll('.opt').forEach(btn => btn.addEventListener('click', () => {
    ans[step] = +btn.dataset.i;
    if (step < QS.length - 1) { step++; show(); } else finish();
  }));
}
function radar(s) {
  const c = 130, r = 90, n = BLOCKS.length, pt = (i, v) => { const a = Math.PI * 2 * i / n - Math.PI / 2; return [c + r * v / 20 * Math.cos(a), c + r * v / 20 * Math.sin(a)]; };
  const ring = v => BLOCKS.map((_, i) => pt(i, v).join(',')).join(' ');
  const data = BLOCKS.map((b, i) => pt(i, s[b.id]).join(',')).join(' ');
  const labels = BLOCKS.map((b, i) => { const [x, y] = pt(i, 24); return `<text x="${x}" y="${y}" fill="#9a9ea6" font-size="11" text-anchor="middle">${b.name}</text>`; }).join('');
  return `<svg viewBox="0 0 260 260" width="100%" style="max-width:300px;display:block;margin:auto" aria-label="Mapa de salud">${[5, 10, 15, 20].map(v => `<polygon points="${ring(v)}" fill="none" stroke="#232830"/>`).join('')}<polygon points="${data}" fill="rgba(201,168,76,.2)" stroke="#c9a84c" stroke-width="2"/>${labels}</svg>`;
}
function finish() {
  $('#quiz').hidden = true;
  const R = calc(), { s, total, st, pf, lv } = R, lb = BLOCKS.find(b => b.id === lv).name;
  const acts = (safetyAlert && (lv === 'movimiento' || lv === 'fisico')) ? SAFE_ACTIONS : ACTIONS[lv];
  const wa = `https://wa.me/${CFG.wa}?text=` + encodeURIComponent(`Hola Javier, soy ${meta.name}. Mi Health Score es ${total}/100 (${st[0]}), perfil "${pf[0]}" y palanca principal: ${lb}. Mi objetivo: ${meta.obj}. Tiempo semanal: ${meta.time}. Quiero analizarlo contigo.`);
  const bars = BLOCKS.map(b => { const v = s[b.id], c = v < 8 ? '#e05c5c' : v < 12 ? '#e0a44c' : v < 16 ? '#6dc98a' : '#c9a84c'; return `<div><span>${b.name}</span><span><i style="width:${v * 5}%;background:${c}"></i></span><span>${v}/20</span></div>`; }).join('');
  const cta = MODO === '1a1'
    ? `<p class="note">Informe de valoración inicial · ${new Date().toLocaleDateString('es-ES')}</p>`
    : `<div class="card"><h3>Lo que este informe no puede medir</h3><ul class="nomed">${NOMED.map(x => `<li>${x}</li>`).join('')}</ul><h3>Valoración personalizada · ${CFG.precio}</h3><ul>${CFG.incluye.map(x => `<li>${x}</li>`).join('')}</ul><a class="btn" href="${wa}" target="_blank" rel="noopener">Reservar mi valoración</a></div>`;
  $('#result').innerHTML = `
    <div class="card"><div class="ring"><b style="color:${st[2]}">${total}</b><div><h2>${st[0]}</h2><p class="note">${st[1]}</p></div></div>
    <h3>Tu perfil: ${pf[0]}</h3><p>${pf[1]}</p></div>
    ${safetyAlert ? '<div class="card alert"><h3>Antes de entrenar</h3><p>Has marcado al menos una señal en el filtro de seguridad. Consulta con tu médico antes de empezar un programa de ejercicio: tu plan se limita a actividad suave.</p></div>' : ''}
    <div class="card">${radar(s)}<div class="bars">${bars}</div></div>
    <div class="card lev"><h3>Tu palanca principal: ${lb}</h3><p class="note">Tu objetivo: ${meta.obj} · Tiempo disponible: ${meta.time} · Lo que más te ha frenado: ${meta.block}</p><p class="note">Entre tus áreas más bajas, esta es la que más condiciona al resto.</p><ul>${acts.map(a => `<li>${a}</li>`).join('')}</ul><p class="note"><b>Qué medir:</b> ${METRIC[lv]}</p></div>
    ${cta}
    <button class="ghost noprint" type="button" onclick="window.print()">Guardar como PDF</button>
    <p class="note">Evaluación orientativa basada en tus respuestas. No es un diagnóstico ni sustituye una valoración médica.</p>`;
  $('#result').hidden = false; window.scrollTo(0, 0);
  const u = new URLSearchParams(location.search);
  if (meta.bot) return;
  fetch(CFG.endpoint, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
    fecha: new Date().toLocaleDateString('es-ES'), nombre: meta.name, contacto: meta.contact, objetivo: meta.goal || '—',
    scoreTotal: total, estado: st[0], estres: s.estres, descanso: s.descanso, movimiento: s.movimiento, habitos: s.habitos, estadoFisico: s.fisico,
    prioritario: lb, perfil: pf[0], palanca: lb, alertaSeguridad: safetyAlert ? 'sí' : 'no', consentimiento: 'sí', modo: MODO, objetivoPrincipal: meta.obj, tiempoSemanal: meta.time, freno: meta.block,
    utm_source: u.get('utm_source') || '', utm_medium: u.get('utm_medium') || '', utm_campaign: u.get('utm_campaign') || ''
  }) }).catch(() => {});
}
document.addEventListener('DOMContentLoaded', init);
