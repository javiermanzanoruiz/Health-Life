/* ============================================================
   HEALTH & LIFE — app.js
   Lógica completa: cuestionario, cálculo, resultados, radar
   ============================================================ */

'use strict';

// ── Data ────────────────────────────────────────────────────
const BLOCKS = [
  {
    id: 'estres',
    name: 'Estrés',
    icon: '🧠',
    questions: [
      {
        text: '¿Cómo describirías tu nivel de estrés diario?',
        options: ['Estrés muy alto casi todo el día','Estrés alto frecuente','Estrés moderado','Estrés bajo','Estrés muy bajo']
      },
      {
        text: '¿Sientes fatiga constante incluso después de descansar?',
        options: ['Siempre','Casi siempre','Algunos días','Rara vez','Nunca']
      },
      {
        text: '¿Te cuesta desconectar mentalmente al final del día?',
        options: ['Muchísimo','Bastante','Depende','Poco','Nada']
      },
      {
        text: '¿Sientes ansiedad o sobrecarga?',
        options: ['Muy frecuente','Frecuente','Ocasional','Rara','Nunca']
      },
      {
        text: '¿Cómo recuperas tras días exigentes?',
        options: ['No recupero','Muy lento','Irregular','Bien','Muy bien']
      }
    ]
  },
  {
    id: 'descanso',
    name: 'Descanso',
    icon: '🌙',
    questions: [
      {
        text: '¿Cuántas horas duermes de media por noche?',
        options: ['Menos de 5 horas','5–6 horas','6–7 horas','7–8 horas','8 horas o más']
      },
      {
        text: '¿Te despiertas por la noche con frecuencia?',
        options: ['Muchas veces','2–3 veces','1–2 veces','Rara vez','Nunca']
      },
      {
        text: '¿Te levantas descansado/a por la mañana?',
        options: ['Nunca','Rara vez','Algunos días','La mayoría de días','Siempre']
      },
      {
        text: '¿Tienes horarios de sueño regulares?',
        options: ['Nada regulares','Muy irregulares','Algo variables','Bastante regulares','Muy regulares']
      },
      {
        text: '¿Cómo valoras la calidad general de tu sueño?',
        options: ['Muy mala','Mala','Aceptable','Buena','Muy buena']
      }
    ]
  },
  {
    id: 'movimiento',
    name: 'Movimiento',
    icon: '⚡',
    questions: [
      {
        text: '¿Cuántos días a la semana realizas entrenamiento físico?',
        options: ['0 días','1 día','2 días','3–4 días','5 días o más']
      },
      {
        text: '¿Tu entrenamiento tiene estructura y progresión?',
        options: ['Ninguna','Muy escasa','Algo estructurado','Bastante estructurado','Muy bien estructurado']
      },
      {
        text: '¿Cuántas horas al día pasas sentado/a?',
        options: ['10 horas o más','8–10 horas','6–8 horas','4–6 horas','Menos de 4 horas']
      },
      {
        text: '¿Cuánto te mueves fuera del entrenamiento formal?',
        options: ['Nada','Muy poco','Algo','Bastante','Nivel muy alto']
      },
      {
        text: '¿Trabajas la movilidad y flexibilidad de forma regular?',
        options: ['Nunca','Muy poco','A veces','Con frecuencia','Siempre']
      }
    ]
  },
  {
    id: 'habitos',
    name: 'Hábitos',
    icon: '🌿',
    questions: [
      {
        text: '¿Cómo describirías tu alimentación habitual?',
        options: ['Muy mala','Mala','Aceptable','Buena','Muy buena']
      },
      {
        text: '¿Cómo es tu hidratación diaria?',
        options: ['Muy baja','Baja','Media','Buena','Óptima']
      },
      {
        text: '¿Cuántas horas usas pantallas fuera del trabajo?',
        options: ['5 horas o más','3–5 horas','2–3 horas','1–2 horas','Menos de 1 hora']
      },
      {
        text: '¿Tienes rutinas y hábitos estables en tu día a día?',
        options: ['Ninguna','Muy pocas','Irregulares','Bastante estables','Muy estructuradas']
      },
      {
        text: '¿Con qué frecuencia te expones a la luz natural?',
        options: ['Nunca','Muy poca','A veces','Con frecuencia','Diariamente']
      }
    ]
  },
  {
    id: 'estado-fisico',
    name: 'Estado Físico',
    icon: '💪',
    questions: [
      {
        text: '¿Cómo valoras tu estado físico general actual?',
        options: ['Muy malo','Malo','Aceptable','Bueno','Muy bueno']
      },
      {
        text: '¿Sufres dolores o molestias físicas frecuentes?',
        options: ['Mucho','Bastante','Algo','Poco','Ninguno']
      },
      {
        text: '¿Cómo es tu nivel de energía a lo largo del día?',
        options: ['Muy baja','Baja','Variable','Buena','Alta']
      },
      {
        text: '¿Cómo responde tu cuerpo al esfuerzo físico?',
        options: ['Muy mal','Mal','Aceptable','Bien','Muy bien']
      },
      {
        text: '¿Tienes limitaciones físicas que condicionen tu vida?',
        options: ['Muchas','Bastantes','Algunas','Pocas','Ninguna']
      }
    ]
  }
];

const RECOMMENDATIONS = {
  estres: [
    { icon: '🧘', text: 'Introduce 10 minutos de respiración diafragmática o meditación al despertar para regular el sistema nervioso.' },
    { icon: '📵', text: 'Establece una "ventana de desconexión" de al menos 1 hora antes de dormir, sin pantallas ni correos.' },
    { icon: '📅', text: 'Planifica tu semana los domingos con bloques de trabajo y bloques de recuperación activa.' },
    { icon: '🚶', text: 'Incorpora caminatas de 20 minutos al aire libre tras las comidas para bajar el cortisol.' },
    { icon: '🗓️', text: 'Revisa y reduce compromisos no esenciales que generan carga mental sin retorno real.' }
  ],
  descanso: [
    { icon: '🕙', text: 'Fija una hora de acostarte y levantarte constante 7 días a la semana, incluyendo fines de semana.' },
    { icon: '🌡️', text: 'Mantén tu habitación entre 17–19 °C y completamente oscura para optimizar la secreción de melatonina.' },
    { icon: '☕', text: 'Elimina la cafeína después de las 14:00 h y el alcohol a partir de las 20:00 h.' },
    { icon: '📱', text: 'Apaga el wifi del dormitorio y usa modo avión en el móvil mientras duermes.' },
    { icon: '🌅', text: 'Exponte a luz solar directa en los primeros 30 minutos tras despertar para anclar tu ritmo circadiano.' }
  ],
  movimiento: [
    { icon: '🏋️', text: 'Sigue un programa de entrenamiento con progresión de carga semanal estructurado por mesociclos.' },
    { icon: '⏱️', text: 'Interrumpe el sedentarismo cada 45–60 minutos con 2–3 minutos de movimiento activo.' },
    { icon: '🧩', text: 'Añade movilidad articular de 10 minutos al inicio o final de cada sesión de entrenamiento.' },
    { icon: '👣', text: 'Alcanza un mínimo de 7.000–8.000 pasos diarios como base de actividad no estructurada.' },
    { icon: '📊', text: 'Registra tus entrenamientos semanalmente para detectar estancamientos y ajustar el volumen.' }
  ],
  habitos: [
    { icon: '🥩', text: 'Asegura al menos 1,6–2 g de proteína por kg de peso corporal distribuidos en 3–4 tomas diarias.' },
    { icon: '💧', text: 'Bebe un vaso de agua al despertar y mantén una botella visible para alcanzar 35 ml/kg de peso.' },
    { icon: '🌞', text: 'Sal a caminar 15 minutos por la mañana para exponer tu piel y ojos a la luz natural.' },
    { icon: '📋', text: 'Diseña una rutina matutina de 15–20 minutos que ancle el resto del día con intención y estructura.' },
    { icon: '📺', text: 'Limita el consumo de pantallas recreativas a 1–2 horas diarias y sustitúyelas por actividad o lectura.' }
  ],
  'estado-fisico': [
    { icon: '📈', text: 'Realiza una valoración funcional cada 8–12 semanas para medir tu evolución real y ajustar objetivos.' },
    { icon: '💆', text: 'Incorpora al menos 1 sesión semanal de trabajo preventivo: foam roller, estiramientos activos o yoga.' },
    { icon: '🍽️', text: 'Revisa tu protocolo nutricional asegurando suficiente densidad energética para sostener tu actividad.' },
    { icon: '😴', text: 'Prioriza la recuperación como parte del entrenamiento: el cuerpo mejora mientras descansa, no mientras trabaja.' },
    { icon: '🩺', text: 'Consulta con un profesional ante cualquier dolor persistente; ignorarlo solo amplifica el problema.' }
  ]
};

const STATUS_MAP = [
  { max: 40,  key: 'desregulacion', label: 'Desregulación',  headline: 'Tu sistema necesita atención urgente',       desc: 'Tu organismo muestra señales claras de estrés acumulado y desequilibrio general. Es el momento de actuar con un enfoque integral.' },
  { max: 60,  key: 'mejorable',     label: 'Mejorable',      headline: 'Hay margen importante de mejora',            desc: 'Tienes algunas bases sólidas pero existen áreas que están limitando tu rendimiento y bienestar diario de forma significativa.' },
  { max: 80,  key: 'buen-nivel',    label: 'Buen Nivel',     headline: 'Sólido, con espacio para optimizar',         desc: 'Tu estilo de vida es saludable en su conjunto. Con ajustes específicos puedes dar un salto cualitativo en tu calidad de vida.' },
  { max: 100, key: 'optimo',        label: 'Óptimo',         headline: 'Excelente equilibrio entre todos los pilares', desc: 'Tu estilo de vida refleja hábitos consolidados y una gestión eficiente de los principales vectores de salud. Mantén el rumbo.' }
];

// ── State ────────────────────────────────────────────────────
let answers = {};
let totalQuestions = 0;

// ── DOM helpers ──────────────────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ── Build form ───────────────────────────────────────────────
function buildForm() {
  const container = $('#questionnaire');
  let qGlobal = 0;

  BLOCKS.forEach((block, bIdx) => {
    totalQuestions += block.questions.length;
    const section = document.createElement('div');
    section.className = 'block-section';
    section.dataset.block = block.id;

    section.innerHTML = `
      <div class="block-header">
        <div class="block-icon">${block.icon}</div>
        <div class="block-meta">
          <div class="block-number">Bloque ${bIdx + 1} de 5</div>
          <h2 class="block-name">${block.name}</h2>
        </div>
      </div>
    `;

    block.questions.forEach((q, qIdx) => {
      qGlobal++;
      const card = document.createElement('div');
      card.className = 'question-card';
      card.dataset.qid = `${block.id}_${qIdx}`;

      const optionsHTML = q.options.map((opt, oIdx) => `
        <div class="option-item">
          <input type="radio" name="q_${block.id}_${qIdx}" id="q_${block.id}_${qIdx}_${oIdx}" value="${oIdx}">
          <label class="option-label" for="q_${block.id}_${qIdx}_${oIdx}">
            <span class="option-score">${oIdx}</span>
            <span class="option-text">${opt}</span>
          </label>
        </div>
      `).join('');

      card.innerHTML = `
        <div class="question-number">Pregunta ${qGlobal}</div>
        <p class="question-text">${q.text}</p>
        <div class="options-grid">${optionsHTML}</div>
      `;

      section.appendChild(card);
    });

    container.appendChild(section);
  });

  // Events
  $$('input[type="radio"]').forEach(input => {
    input.addEventListener('change', handleAnswer);
  });
}

// ── Handle answer ────────────────────────────────────────────
function handleAnswer(e) {
  const name = e.target.name;
  const val  = parseInt(e.target.value);
  answers[name] = val;

  // Mark card as answered
  const card = e.target.closest('.question-card');
  card.classList.add('answered');
  card.classList.remove('unanswered-error');

  updateProgress();
}

// ── Update progress bar ──────────────────────────────────────
function updateProgress() {
  const answered = Object.keys(answers).length;
  const pct = Math.round((answered / totalQuestions) * 100);
  $('#progressFill').style.width = pct + '%';
  $('#progressCount').textContent = `${answered} / ${totalQuestions}`;
}

// ── Calculate results ────────────────────────────────────────
function calculateResults() {
  const blockScores = {};
  let total = 0;

  BLOCKS.forEach(block => {
    let blockSum = 0;
    block.questions.forEach((_, qIdx) => {
      const key = `q_${block.id}_${qIdx}`;
      blockSum += answers[key] ?? 0;
    });
    blockScores[block.id] = blockSum;
    total += blockSum;
  });

  // Priority block: lowest score
  const priorityId = Object.entries(blockScores)
    .sort(([,a],[,b]) => a - b)[0][0];

  const status = STATUS_MAP.find(s => total <= s.max) || STATUS_MAP[STATUS_MAP.length - 1];

  return { total, blockScores, priorityId, status };
}

// ── Render results ────────────────────────────────────────────
function renderResults(data) {
  const { total, blockScores, priorityId, status } = data;

  // Score ring
  const circumference = 502;
  const offset = circumference - (total / 100) * circumference;
  setTimeout(() => {
    $('#scoreRingFill').style.strokeDashoffset = offset;
    animateCount($('#scoreNumber'), 0, total, 1200);
  }, 300);

  // Color ring by status
  const ringColors = {
    desregulacion: '#e05c5c',
    mejorable:     '#e0a44c',
    'buen-nivel':  '#6dc98a',
    optimo:        '#c9a84c'
  };
  $('#scoreRingFill').style.stroke = ringColors[status.key];

  // Status badge
  const badge = $('#resultStatus');
  badge.textContent = status.label;
  badge.className = `result-status status-${status.key}`;

  // Headline & description
  $('#resultHeadline').textContent   = status.headline;
  $('#resultDescription').textContent = status.desc;

  // Block scores
  const grid = $('#blocksGrid');
  grid.innerHTML = '';
  BLOCKS.forEach(block => {
    const score = blockScores[block.id];
    const isPriority = block.id === priorityId;
    const pct = (score / 20) * 100;
    const fillColor = pct < 40 ? '#e05c5c' : pct < 60 ? '#e0a44c' : pct < 80 ? '#6dc98a' : '#c9a84c';

    const card = document.createElement('div');
    card.className = 'block-score-card' + (isPriority ? ' priority' : '');
    card.innerHTML = `
      <span class="block-score-icon">${block.icon}</span>
      <span class="block-score-name">${block.name}</span>
      <span class="block-score-value">${score}</span>
      <span class="block-score-max">/ 20</span>
      <div class="block-score-bar">
        <div class="block-score-fill" data-width="${pct}" style="background: ${fillColor};"></div>
      </div>
      ${isPriority ? '<span class="priority-badge">⚠ Prioritario</span>' : ''}
    `;
    grid.appendChild(card);

    setTimeout(() => {
      card.classList.add('visible');
      card.querySelector('.block-score-fill').style.width = pct + '%';
    }, 100 + BLOCKS.indexOf(block) * 120);
  });

  // Priority block section
  const priorityBlock = BLOCKS.find(b => b.id === priorityId);
  $('#priorityIcon').textContent  = priorityBlock.icon;
  $('#priorityName').textContent  = priorityBlock.name;
  $('#priorityScore').textContent = `Puntuación: ${blockScores[priorityId]} / 20 puntos`;

  const recList = $('#recommendationsList');
  recList.innerHTML = (RECOMMENDATIONS[priorityId] || []).map(r => `
    <li>
      <span class="rec-icon">${r.icon}</span>
      <span>${r.text}</span>
    </li>
  `).join('');

  // Radar chart
  drawRadar(blockScores);
}

// ── Animate number count ──────────────────────────────────────
function animateCount(el, from, to, duration) {
  const start = performance.now();
  const update = (time) => {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(from + (to - from) * ease);
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

// ── Draw radar chart ──────────────────────────────────────────
function drawRadar(blockScores) {
  const canvas = $('#radarChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const size = canvas.width;
  const cx = size / 2, cy = size / 2;
  const maxVal = 20;
  const numAxes = BLOCKS.length;
  const labels = BLOCKS.map(b => b.name);
  const values = BLOCKS.map(b => blockScores[b.id]);
  const maxR = size * 0.38;
  const labelR = size * 0.47;

  ctx.clearRect(0, 0, size, size);

  function getPoint(idx, val, radius) {
    const angle = (Math.PI * 2 * idx / numAxes) - Math.PI / 2;
    const r = (val / maxVal) * radius;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  }

  // Grid rings
  [4, 8, 12, 16, 20].forEach(v => {
    ctx.beginPath();
    for (let i = 0; i < numAxes; i++) {
      const p = getPoint(i, v, maxR);
      i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  // Axes
  for (let i = 0; i < numAxes; i++) {
    const p = getPoint(i, maxVal, maxR);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(p.x, p.y);
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Data polygon (filled)
  ctx.beginPath();
  values.forEach((v, i) => {
    const p = getPoint(i, v, maxR);
    i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
  });
  ctx.closePath();
  ctx.fillStyle = 'rgba(201,168,76,0.15)';
  ctx.fill();
  ctx.strokeStyle = '#c9a84c';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Data points
  values.forEach((v, i) => {
    const p = getPoint(i, v, maxR);
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#c9a84c';
    ctx.fill();
    ctx.strokeStyle = '#0a0c0f';
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  // Labels
  ctx.font = '600 12px DM Sans, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let i = 0; i < numAxes; i++) {
    const angle = (Math.PI * 2 * i / numAxes) - Math.PI / 2;
    const lx = cx + labelR * Math.cos(angle);
    const ly = cy + labelR * Math.sin(angle);
    ctx.fillStyle = 'rgba(240,236,228,0.7)';
    ctx.fillText(labels[i], lx, ly);

    // Score below label
    const score = values[i];
    ctx.font = '500 10px DM Sans, sans-serif';
    ctx.fillStyle = '#c9a84c';
    ctx.fillText(`${score}/20`, lx, ly + 14);
    ctx.font = '600 12px DM Sans, sans-serif';
  }
}

// ── Submit ────────────────────────────────────────────────────
function handleSubmit() {
  // Validate
  const unanswered = [];
  BLOCKS.forEach(block => {
    block.questions.forEach((_, qIdx) => {
      const key = `q_${block.id}_${qIdx}`;
      if (answers[key] === undefined) {
        const card = $(`[data-qid="${block.id}_${qIdx}"]`);
        if (card) {
          card.classList.add('unanswered-error');
          unanswered.push(card);
        }
      }
    });
  });

  if (unanswered.length > 0) {
    unanswered[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    showToast(`⚠️ Faltan ${unanswered.length} pregunta${unanswered.length > 1 ? 's' : ''} por responder`);
    return;
  }

  const data = calculateResults();

  // Save to localStorage
  const saved = {
    date: new Date().toISOString(),
    answers,
    results: data
  };
  localStorage.setItem('healthlife_last', JSON.stringify(saved));
  showToast('✅ Evaluación completada y guardada');

  // Switch views
  $('#questionnaire-section').style.display = 'none';
  $('#submit-section').style.display = 'none';

  const resultsEl = $('#results-section');
  resultsEl.style.display = 'block';
  resultsEl.scrollIntoView({ behavior: 'smooth' });

  renderResults(data);
}

// ── Retake ────────────────────────────────────────────────────
function retakeAssessment() {
  answers = {};
  $$('input[type="radio"]').forEach(r => r.checked = false);
  $$('.question-card').forEach(c => c.classList.remove('answered', 'unanswered-error'));
  updateProgress();

  $('#results-section').style.display = 'none';
  $('#questionnaire-section').style.display = 'block';
  $('#submit-section').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Export PDF ────────────────────────────────────────────────
function exportPDF() {
  showToast('📄 Preparando exportación...');
  setTimeout(() => {
    window.print();
  }, 400);
}

// ── Toast ─────────────────────────────────────────────────────
function showToast(msg) {
  const toast = $('#toast');
  $('#toastMsg').textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ── Load saved (optional restore) ────────────────────────────
function checkSaved() {
  const raw = localStorage.getItem('healthlife_last');
  if (!raw) return;
  try {
    const saved = JSON.parse(raw);
    const date  = new Date(saved.date);
    const diff  = (Date.now() - date.getTime()) / 1000 / 60 / 60 / 24;
    if (diff < 30) {
      // Show last result date info on header (optional)
      const badge = document.createElement('div');
      badge.style.cssText = `font-size:11px;color:#8a8a8a;margin-top:12px;`;
      badge.textContent = `Última evaluación: ${date.toLocaleDateString('es-ES', { day:'numeric', month:'long', year:'numeric' })}`;
      $('.app-subtitle').after(badge);
    }
  } catch(e) {}
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildForm();
  checkSaved();
  updateProgress();

  $('#btnSubmit').addEventListener('click', handleSubmit);
  $('#btnRetake').addEventListener('click', retakeAssessment);
  $('#btnExportPDF').addEventListener('click', exportPDF);
});
