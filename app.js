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
let clientMeta = {};
let lastResults = null;

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


function getClientMeta() {
  const name = ($('#clientName')?.value || '').trim();
  const contact = ($('#clientContact')?.value || '').trim();
  const goal = ($('#clientGoal')?.value || '').trim();
  return { name, contact, goal };
}

function getScoreLevel(score, max = 20) {
  const pct = (score / max) * 100;
  if (pct < 40) return 'crítico';
  if (pct < 60) return 'limitante';
  if (pct < 80) return 'estable';
  return 'fuerte';
}

function buildClinicalSummary(total, blockScores, priorityId, status) {
  const priorityBlock = BLOCKS.find(b => b.id === priorityId);
  const strongest = Object.entries(blockScores).sort(([,a],[,b]) => b - a)[0];
  const strongestBlock = BLOCKS.find(b => b.id === strongest[0]);
  const name = clientMeta.name || 'La persona evaluada';
  const goalText = clientMeta.goal ? ` El objetivo declarado es: “${clientMeta.goal}”.` : '';
  return `${name} obtiene un Health Score de ${total}/100, clasificado como ${status.label}. El bloque más limitante es ${priorityBlock.name} (${blockScores[priorityId]}/20), mientras que el área más sólida es ${strongestBlock.name} (${strongest[1]}/20).${goalText} La lectura principal no debe ser “hacer más”, sino ordenar el sistema: reducir el principal factor limitante, estabilizar hábitos base y progresar con una estrategia medible.`;
}

function buildRiskItems(blockScores) {
  return Object.entries(blockScores)
    .sort(([,a],[,b]) => a - b)
    .slice(0, 3)
    .map(([id, score]) => {
      const block = BLOCKS.find(b => b.id === id);
      const level = getScoreLevel(score);
      return `${block.name}: ${score}/20 — nivel ${level}. Requiere intervención prioritaria o seguimiento específico.`;
    });
}

function buildStrengthItems(blockScores) {
  const strong = Object.entries(blockScores)
    .sort(([,a],[,b]) => b - a)
    .filter(([, score]) => score >= 12)
    .slice(0, 3);

  if (!strong.length) {
    return ['No aparecen fortalezas consolidadas todavía. Esto no es un juicio: indica que la primera fase debe centrarse en construir base antes de exigir rendimiento.'];
  }

  return strong.map(([id, score]) => {
    const block = BLOCKS.find(b => b.id === id);
    if (score >= 16) return `${block.name}: ${score}/20 — fortaleza clara. Pilar consolidado que conviene mantener y usar como apoyo del proceso.`;
    if (score >= 14) return `${block.name}: ${score}/20 — base sólida. Área funcional que puede sostener la progresión si se mantiene estable.`;
    return `${block.name}: ${score}/20 — base funcional. No es el foco prioritario, pero debe mantenerse para evitar regresión.`;
  });
}

function buildActionPlan(priorityId) {
  const plans = {
    estres: [
      'Días 1–2: reducir carga mental visible: agenda, límites y 10 min de respiración diaria.',
      'Días 3–5: añadir caminata suave postcomida y bloqueo real de desconexión nocturna.',
      'Días 6–7: revisar energía, sueño y sensación de control antes de subir exigencia.'
    ],
    descanso: [
      'Días 1–2: fijar hora de acostarse y levantarse con margen máximo de 30–45 min.',
      'Días 3–5: luz natural por la mañana, cafeína antes de las 14:00 y dormitorio más oscuro.',
      'Días 6–7: registrar despertares, energía matinal y continuidad del sueño.'
    ],
    movimiento: [
      'Días 1–2: establecer mínimo viable: pasos diarios y 2 sesiones de fuerza estructurada.',
      'Días 3–5: cortar sedentarismo cada 60 min y añadir movilidad básica.',
      'Días 6–7: medir adherencia y ajustar volumen sin castigar la recuperación.'
    ],
    habitos: [
      'Días 1–2: ordenar proteína, hidratación y primera comida del día.',
      'Días 3–5: reducir pantallas nocturnas y preparar entorno alimentario.',
      'Días 6–7: revisar cumplimiento real, no intención: comidas, agua, luz y rutina.'
    ],
    'estado-fisico': [
      'Días 1–2: identificar molestias, limitaciones y ejercicios que no conviene forzar.',
      'Días 3–5: introducir trabajo correctivo y fuerza básica sin dolor.',
      'Días 6–7: valorar respuesta al esfuerzo y decidir progresión o derivación si hay dolor persistente.'
    ]
  };
  return plans[priorityId] || [];
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
  lastResults = data;

  const resultDate = new Date().toLocaleDateString('es-ES', { day:'numeric', month:'long', year:'numeric' });
  $('#resultClientName').textContent = clientMeta.name ? `Informe de ${clientMeta.name}` : 'Evaluación individual';
  $('#resultDate').textContent = resultDate;
  $('#clinicalSummary').textContent = buildClinicalSummary(total, blockScores, priorityId, status);
  $('#risksList').innerHTML = buildRiskItems(blockScores).map(item => `<li>${item}</li>`).join('');
  const strengthsEl = $('#strengthsList');
  if (strengthsEl) strengthsEl.innerHTML = buildStrengthItems(blockScores).map(item => `<li>${item}</li>`).join('');

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

  $('#actionPlanList').innerHTML = buildActionPlan(priorityId).map(item => `<li>${item}</li>`).join('');

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

  clientMeta = getClientMeta();
  const data = calculateResults();

  // Save to localStorage
  const saved = {
    date: new Date().toISOString(),
    clientMeta,
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

// ── Export PDF Premium PRO ───────────────────────────────────
const PDF_THEME = {
  ink:[22,24,27], softInk:[58,62,69], muted:[104,109,118], line:[223,224,226],
  paper:[255,255,255], ivory:[250,248,241], paleGold:[246,240,222],
  gold:[183,143,48], goldDark:[132,101,32], red:[185,64,64], green:[55,130,82], amber:[196,128,40], blueGrey:[83,98,112]
};

function safeText(value, fallback) {
  return String(value || fallback || '').replace(/[\u{1F300}-\u{1FAFF}]/gu, '').trim();
}
function getBlockById(id) { return BLOCKS.find(function(b){ return b.id === id; }); }
function getStrongestBlock(blockScores) {
  var entries = Object.entries(blockScores).sort(function(a,b){ return b[1] - a[1]; });
  return { block:getBlockById(entries[0][0]), score:entries[0][1] };
}
function getWeakestBlocks(blockScores, n) {
  return Object.entries(blockScores).sort(function(a,b){ return a[1]-b[1]; }).slice(0,n || 3).map(function(e){ return { block:getBlockById(e[0]), score:e[1] }; });
}
function getStrongBlocks(blockScores, n) {
  return Object.entries(blockScores).sort(function(a,b){ return b[1]-a[1]; }).filter(function(e){ return e[1] >= 12; }).slice(0,n || 3).map(function(e){ return { block:getBlockById(e[0]), score:e[1] }; });
}
function getBlockInterpretation(score) {
  var pct=(score/20)*100;
  if(pct<40) return {label:'Crítico', color:PDF_THEME.red, desc:'Interferencia alta. Requiere estabilización inicial antes de aumentar exigencia.'};
  if(pct<60) return {label:'Limitante', color:PDF_THEME.amber, desc:'Condiciona la eficiencia del sistema y puede frenar el progreso.'};
  if(pct<80) return {label:'Base funcional', color:PDF_THEME.green, desc:'Área útil y relativamente estable, con margen de optimización.'};
  return {label:'Fortaleza', color:PDF_THEME.gold, desc:'Pilar consolidado que puede sostener la progresión.'};
}
function buildSevenDayPlan(priorityId) {
  var p = {
    estres:[['Día 1','Vaciar carga mental en una lista única','Reducir ruido cognitivo visible','Tensión mental 1-10'],['Día 2','10 min de respiración nasal lenta','Bajar activación simpática','Frecuencia / calma percibida'],['Día 3','Bloquear una ventana sin pantallas','Recuperar control atencional','Minutos sin pantalla'],['Día 4','Caminata suave postcomida','Mejorar regulación y glucemia','Minutos caminados'],['Día 5','Eliminar un compromiso no esencial','Reducir carga no rentable','Compromiso eliminado'],['Día 6','Revisión de sueño, energía y estrés','Identificar patrón limitante','Registro 1-10'],['Día 7','Plan semanal con bloques de recuperación','Prevenir recaída por saturación','Bloques planificados']],
    descanso:[['Día 1','Fijar hora de sueño y despertar','Regular ritmo circadiano','Hora de acostarse'],['Día 2','Luz natural 10-15 min al despertar','Anclar reloj biológico','Minutos de luz exterior'],['Día 3','Cortar cafeína después de las 14:00','Reducir interferencias del sueño','Hora última cafeína'],['Día 4','Dormitorio oscuro y fresco','Mejorar sueño profundo','Despertares nocturnos'],['Día 5','Rutina nocturna de 20 min','Asociar noche con recuperación','Calidad subjetiva 1-10'],['Día 6','Siesta cero o controlada <20 min','Aumentar presión de sueño nocturna','Somnolencia nocturna'],['Día 7','Revisión semanal del sueño','Detectar patrón limitante','Horas medias dormidas']],
    movimiento:[['Día 1','Medir pasos actuales sin cambiar nada','Definir línea base real','Pasos diarios'],['Día 2','Añadir 2 pausas activas','Cortar sedentarismo','Pausas realizadas'],['Día 3','Sesión de fuerza básica','Crear estímulo mínimo eficaz','Ejercicios completados'],['Día 4','Movilidad 10 min','Mejorar tolerancia articular','Minutos realizados'],['Día 5','Caminata de 25 min','Aumentar NEAT sin fatiga','Minutos caminados'],['Día 6','Segunda sesión de fuerza','Consolidar frecuencia mínima','RPE sesión'],['Día 7','Revisión de adherencia','Ajustar volumen realista','Sesiones cumplidas']],
    habitos:[['Día 1','Definir proteína en cada comida','Estabilizar saciedad y masa muscular','Comidas con proteína'],['Día 2','Botella visible y objetivo de agua','Mejorar hidratación','Litros aproximados'],['Día 3','Compra base sin ultraprocesados clave','Ordenar entorno alimentario','Alimentos preparados'],['Día 4','Luz natural por la mañana','Mejorar energía y ritmo diario','Minutos de luz'],['Día 5','Reducir pantalla nocturna 30 min','Mejorar descanso indirecto','Minutos reducidos'],['Día 6','Preparar 2 comidas estratégicas','Evitar decisiones impulsivas','Comidas preparadas'],['Día 7','Revisión de cumplimiento real','Detectar fricción principal','Porcentaje cumplido']],
    'estado-fisico':[['Día 1','Identificar molestias y movimientos sensibles','Evitar progresar sobre dolor','Zonas/molestias'],['Día 2','Movilidad suave sin dolor','Recuperar rango útil','Dolor 0-10'],['Día 3','Fuerza técnica básica','Mejorar confianza motriz','RPE y dolor'],['Día 4','Caminata o cardio zona suave','Aumentar tolerancia al esfuerzo','Minutos completados'],['Día 5','Trabajo preventivo específico','Reducir riesgo de recaída','Ejercicios hechos'],['Día 6','Repetir fuerza controlada','Comprobar respuesta','Energía post'],['Día 7','Revisión de respuesta corporal','Decidir progresión o derivación','Dolor/energía 0-10']]
  };
  return (p[priorityId] || []).map(function(r){ return {day:r[0], action:r[1], objective:r[2], metric:r[3]}; });
}
function pdfText(doc, text, x, y, maxWidth, lineHeight) {
  var lines=doc.splitTextToSize(safeText(text), maxWidth);
  doc.text(lines,x,y);
  return y + lines.length * (lineHeight || 5);
}
function pdfCard(doc, x, y, w, h, fill, stroke, radius) {
  doc.setFillColor.apply(doc, fill || PDF_THEME.paper);
  doc.setDrawColor.apply(doc, stroke || PDF_THEME.line);
  doc.setLineWidth(0.35);
  doc.roundedRect(x,y,w,h,radius || 3,radius || 3,'FD');
}
function pdfHeader(doc, pageNo, title) {
  var w=doc.internal.pageSize.getWidth();
  doc.setFillColor.apply(doc, PDF_THEME.paper); doc.rect(0,0,w,297,'F');
  doc.setDrawColor.apply(doc, PDF_THEME.gold); doc.setLineWidth(0.45); doc.line(16,18,w-16,18);
  doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor.apply(doc,PDF_THEME.goldDark); doc.text('HEALTH & LIFE SYSTEM',16,12);
  doc.setFont('helvetica','normal'); doc.setTextColor.apply(doc,PDF_THEME.muted); doc.text('Informe integral · Página '+pageNo,w-16,12,{align:'right'});
  if(title){ doc.setFont('times','bold'); doc.setFontSize(20); doc.setTextColor.apply(doc,PDF_THEME.ink); doc.text(title,16,34); }
}
function pdfFooter(doc) {
  var h=doc.internal.pageSize.getHeight(), w=doc.internal.pageSize.getWidth();
  doc.setDrawColor.apply(doc,PDF_THEME.line); doc.line(16,h-15,w-16,h-15);
  doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor.apply(doc,PDF_THEME.muted);
  doc.text('Evaluación orientativa. No constituye diagnóstico médico.',16,h-9);
  doc.text('Health & Life by Javier Manzano',w-16,h-9,{align:'right'});
}
function addMiniMetric(doc, x, y, label, value, color) {
  pdfCard(doc,x,y,40,22,PDF_THEME.ivory,[232,228,216]);
  doc.setFont('helvetica','normal'); doc.setFontSize(6.8); doc.setTextColor.apply(doc,PDF_THEME.muted); doc.text(label.toUpperCase(),x+4,y+7);
  doc.setFont('helvetica','bold'); doc.setFontSize(10.5); doc.setTextColor.apply(doc,color || PDF_THEME.ink); doc.text(safeText(value),x+4,y+16,{maxWidth:33});
}
function addScoreSeal(doc,total,x,y,r) {
  var color=total<=40?PDF_THEME.red:total<=60?PDF_THEME.amber:total<=80?PDF_THEME.green:PDF_THEME.gold;
  doc.setFillColor(255,255,255); doc.circle(x,y,r,'F');
  doc.setDrawColor.apply(doc,color); doc.setLineWidth(1.4); doc.circle(x,y,r,'S');
  doc.setFont('times','bold'); doc.setFontSize(27); doc.setTextColor.apply(doc,color); doc.text(String(total),x,y+2,{align:'center'});
  doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor.apply(doc,PDF_THEME.muted); doc.text('/100',x,y+13,{align:'center'});
}
function professionalSummary(total, blockScores, priorityId, status) {
  var strong = getStrongestBlock(blockScores), weak = getBlockById(priorityId), name=safeText(clientMeta.name,'El cliente'), goal=safeText(clientMeta.goal,'no especificado');
  return name + ' presenta un Health Score de ' + total + '/100, clasificado como ' + status.label + '. El sistema muestra su mejor base en ' + strong.block.name + ' (' + strong.score + '/20), lo que indica que existe capacidad real de progresión si la intervención se estructura correctamente. El principal factor limitante es ' + weak.name + ' (' + blockScores[priorityId] + '/20), que actualmente está reduciendo la eficiencia global del sistema. Objetivo declarado: “' + goal + '”. La lectura no debe centrarse en hacer más, sino en intervenir en el punto correcto, estabilizar la base y progresar con una estrategia medible.';
}
function centralDiagnosis(blockScores, priorityId) {
  var spread = getStrongestBlock(blockScores).score - blockScores[priorityId];
  if(spread >= 8) return 'El sistema presenta una descompensación clara entre capacidad y recuperación. Existe potencial suficiente para progresar, pero la falta de equilibrio entre bloques está limitando el retorno del esfuerzo. Mientras el bloque limitante no se estabilice, el sistema seguirá funcionando por debajo de su capacidad real.';
  if(spread >= 5) return 'El sistema presenta una diferencia relevante entre áreas fuertes y áreas limitantes. Existe base para progresar, pero el rendimiento global depende de reducir primero el principal cuello de botella.';
  return 'El sistema presenta un perfil relativamente homogéneo. La mejora dependerá de optimizaciones pequeñas, sostenidas y medibles, sin introducir cambios extremos innecesarios.';
}
function keyInsight(blockScores, priorityId) {
  var spread = getStrongestBlock(blockScores).score - blockScores[priorityId];
  if(spread >= 5) return 'El progreso no dependerá de hacer más, sino de intervenir en el punto correcto en el momento adecuado. No falta capacidad. Falta estructura.';
  return 'El progreso dependerá de sostener una estructura simple, medible y realista. No se trata de hacer más, sino de hacer mejor lo esencial.';
}
function strengthNarrative(item) {
  if(!item) return 'No aparecen fortalezas consolidadas todavía. La primera fase debe construir base antes de subir exigencia.';
  if(item.score>=16) return item.block.name + ' destaca como fortaleza clara (' + item.score + '/20). Es una base sólida que permite sostener el proceso de mejora sin interferencias relevantes.';
  if(item.score>=14) return item.block.name + ' aparece como base sólida (' + item.score + '/20). Permite sostener progresión si se mantiene estable.';
  return item.block.name + ' funciona como base funcional (' + item.score + '/20). Tiene margen de optimización, pero no representa el foco principal actual.';
}
function weaknessNarrative(item) {
  if(item.score<8) return item.block.name + ' actúa como el principal cuello de botella del sistema (' + item.score + '/20). Mientras no se estabilice, limitará la progresión global.';
  if(item.score<12) return item.block.name + ' condiciona la consistencia del proceso (' + item.score + '/20) y puede frenar la adaptación si no se corrige.';
  return item.block.name + ' tiene margen de mejora (' + item.score + '/20), aunque no representa el principal riesgo actual.';
}
function drawPdfRadar(doc, blockScores, centerX, centerY, radius) {
  var values=BLOCKS.map(function(b){return blockScores[b.id];}); var n=BLOCKS.length;
  function pt(i,val,r){ var angle=(Math.PI*2*i/n)-Math.PI/2; var rr=(val/20)*(r||radius); return [centerX+rr*Math.cos(angle), centerY+rr*Math.sin(angle)]; }

  // Anillos de fondo
  [4,8,12,16,20].forEach(function(v){
    var poly=[]; for(var i=0;i<n;i++) poly.push(pt(i,v));
    doc.setDrawColor(220,220,220); doc.setLineWidth(0.2);
    for(var j=0;j<n;j++){ var p1=poly[j], p2=poly[(j+1)%n]; doc.line(p1[0],p1[1],p2[0],p2[1]); }
  });

  // Ejes
  for(var k=0;k<n;k++){ var p=pt(k,20); doc.setDrawColor(230,230,230); doc.setLineWidth(0.2); doc.line(centerX,centerY,p[0],p[1]); }

  // Polígono de datos — trazado completo sin triángulos (evita artefactos de costura)
  var poly2=values.map(function(v,i){return pt(i,v);});
  // Fill: usar líneas acumuladas con setFillColor + beginPath no disponible en jsPDF básico
  // Solución limpia: dibujar con lines[] array que jsPDF acepta para polígono cerrado
  var lineCoords = [];
  for(var e=0;e<poly2.length;e++){
    var from=poly2[e], to=poly2[(e+1)%poly2.length];
    lineCoords.push([to[0]-from[0], to[1]-from[1], 0]);
  }
  doc.setFillColor(248,240,220);
  doc.lines(lineCoords, poly2[0][0], poly2[0][1], [1,1], 'FD', true);
  doc.setDrawColor.apply(doc,PDF_THEME.gold); doc.setLineWidth(1.0);
  doc.lines(lineCoords, poly2[0][0], poly2[0][1], [1,1], 'S', true);

  // Puntos sobre vértices
  for(var m=0;m<n;m++){ doc.setFillColor.apply(doc,PDF_THEME.gold); doc.circle(poly2[m][0],poly2[m][1],1.6,'F'); }

  // Etiquetas
  doc.setFont('helvetica','bold'); doc.setFontSize(8);
  BLOCKS.forEach(function(b,i){
    var angle=(Math.PI*2*i/n)-Math.PI/2;
    var lx=centerX+(radius+22)*Math.cos(angle), ly=centerY+(radius+22)*Math.sin(angle);
    doc.setTextColor.apply(doc,PDF_THEME.ink); doc.text(safeText(b.name),lx,ly,{align:'center'});
    doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor.apply(doc,PDF_THEME.goldDark); doc.text(values[i]+'/20',lx,ly+5,{align:'center'});
    doc.setFont('helvetica','bold'); doc.setFontSize(8);
  });
}

function loadJsPDF(callback) {
  if (window.jspdf && window.jspdf.jsPDF) { callback(window.jspdf.jsPDF); return; }
  var sources = [
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
    'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js',
    'https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js'
  ];
  var tried = 0;
  function tryNext() {
    if (tried >= sources.length) { showToast('⚠️ Sin conexión o bloqueado. Prueba desde otra red.'); return; }
    var s = document.createElement('script');
    s.src = sources[tried++];
    s.onload = function() { if (window.jspdf && window.jspdf.jsPDF) callback(window.jspdf.jsPDF); else tryNext(); };
    s.onerror = function() { tryNext(); };
    document.head.appendChild(s);
  }
  tryNext();
}

function generatePremiumPDF(jsPDFLib) {
  if(!lastResults){ return null; }
  if(!jsPDFLib){ return null; }
  var doc=new jsPDFLib({orientation:'portrait',unit:'mm',format:'a4'});
  var total=lastResults.total, blockScores=lastResults.blockScores, priorityId=lastResults.priorityId, status=lastResults.status;
  var priorityBlock=getBlockById(priorityId), strongest=getStrongestBlock(blockScores), weak=getWeakestBlocks(blockScores,3), strengths=getStrongBlocks(blockScores,3);
  var clientName=safeText(clientMeta.name,'Cliente'), clientGoal=safeText(clientMeta.goal,'No especificado');
  var reportDate=new Date().toLocaleDateString('es-ES',{day:'numeric',month:'long',year:'numeric'});

  // ═══════════════════════════════════════════════════════════
  // PORTADA PREMIUM — Health & Life System
  // ═══════════════════════════════════════════════════════════
  doc.setFillColor(252,250,245); doc.rect(0,0,210,297,'F');

  // Marco editorial exterior
  doc.setDrawColor.apply(doc, PDF_THEME.gold); doc.setLineWidth(0.45);
  doc.rect(14,14,182,269,'S');
  doc.setDrawColor(230,224,210); doc.setLineWidth(0.25);
  doc.rect(18,18,174,261,'S');

  // Banda superior sobria
  doc.setFillColor.apply(doc, PDF_THEME.ink); doc.rect(18,18,174,34,'F');
  doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.setTextColor.apply(doc,PDF_THEME.gold);
  doc.text('HEALTH & LIFE SYSTEM',105,32,{align:'center'});
  doc.setFont('helvetica','normal'); doc.setFontSize(7.5); doc.setTextColor(230,224,210);
  doc.text('INFORME INTEGRAL DE SALUD Y BIENESTAR',105,42,{align:'center'});

  // Título editorial
  doc.setFont('times','bold'); doc.setFontSize(30); doc.setTextColor.apply(doc,PDF_THEME.ink);
  doc.text('Informe Integral',105,73,{align:'center'});
  doc.setFont('times','italic'); doc.setFontSize(21); doc.setTextColor.apply(doc,PDF_THEME.goldDark);
  doc.text('de Salud y Bienestar',105,86,{align:'center'});

  doc.setDrawColor.apply(doc, PDF_THEME.gold); doc.setLineWidth(0.35);
  doc.line(64,96,146,96);

  // Score protagonista — contenedor visual explícito
  var coverColor = total<=40?PDF_THEME.red:total<=60?PDF_THEME.amber:total<=80?PDF_THEME.green:PDF_THEME.gold;
  // Fondo tenue detrás del score para anclarlo visualmente
  doc.setFillColor(245,242,234); doc.roundedRect(72,100,66,64,6,6,'F');
  doc.setDrawColor.apply(doc,coverColor); doc.setLineWidth(0.6); doc.roundedRect(72,100,66,64,6,6,'S');
  doc.setFont('times','bold'); doc.setFontSize(58); doc.setTextColor.apply(doc,coverColor);
  doc.text(String(total),105,138,{align:'center'});
  doc.setFont('helvetica','normal'); doc.setFontSize(10); doc.setTextColor.apply(doc,PDF_THEME.muted);
  doc.text('de 100 puntos',105,150,{align:'center'});

  // Badge de estado — más ancho y con mejor padding
  doc.setFillColor.apply(doc, coverColor);
  doc.roundedRect(68,158,74,12,6,6,'F');
  doc.setFont('helvetica','bold'); doc.setFontSize(8.5); doc.setTextColor(255,255,255);
  doc.text(status.label.toUpperCase(),105,166,{align:'center'});

  // Frase interpretativa — cubre los 4 rangos de forma explícita
  var coverInsight;
  if(total <= 40)      coverInsight = 'El sistema muestra una desregulación importante. La prioridad es estabilizar la base antes de aumentar cualquier exigencia.';
  else if(total <= 60) coverInsight = 'El sistema presenta capacidad de mejora real. Ordenar prioridades y atacar el bloque limitante desbloqueará el progreso.';
  else if(total <= 80) coverInsight = 'El sistema tiene una base sólida. El siguiente salto depende de afinar prioridades y reducir las descompensaciones existentes.';
  else                 coverInsight = 'El sistema presenta un nivel óptimo. La prioridad ahora es sostener la estructura y prevenir posibles regresiones.';
  doc.setFont('helvetica','normal'); doc.setFontSize(9.2); doc.setTextColor.apply(doc,PDF_THEME.softInk);
  doc.text(doc.splitTextToSize(coverInsight,130),105,186,{align:'center'});

  // Datos del cliente — altura dinámica para evitar solapamiento con objetivo largo
  var goalLines = doc.splitTextToSize(clientGoal, 82);
  var goalBlockH = goalLines.length * 5.2;
  var clientBoxH = Math.max(38, 20 + goalBlockH + 8); // mínimo 38mm
  var clientBoxY = 208;
  doc.setFillColor(255,255,255); doc.roundedRect(34,clientBoxY,142,clientBoxH,4,4,'F');
  doc.setDrawColor(232,228,216); doc.setLineWidth(0.35); doc.roundedRect(34,clientBoxY,142,clientBoxH,4,4,'S');
  var rowY1 = clientBoxY + 11;
  var rowY2 = rowY1 + 11;
  var rowY3 = rowY2 + goalBlockH + 2;
  doc.setFont('helvetica','normal'); doc.setFontSize(8); doc.setTextColor.apply(doc,PDF_THEME.muted);
  doc.text('CLIENTE',44,rowY1); doc.text('OBJETIVO',44,rowY2); doc.text('FECHA',44,rowY3);
  doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.setTextColor.apply(doc,PDF_THEME.ink);
  doc.text(clientName,82,rowY1);
  doc.text(goalLines,82,rowY2);
  doc.text(reportDate,82,rowY3);

  // Firma / posicionamiento
  doc.setFont('times','italic'); doc.setFontSize(13); doc.setTextColor.apply(doc,PDF_THEME.goldDark);
  doc.text('La clave está en el equilibrio',105,263,{align:'center'});
  doc.setFont('helvetica','normal'); doc.setFontSize(7.2); doc.setTextColor.apply(doc,PDF_THEME.muted);
  doc.text('Health & Life by Javier Manzano',105,272,{align:'center'});
  doc.addPage(); pdfHeader(doc,2,'Lectura profesional'); pdfFooter(doc);
  doc.setFont('helvetica','normal'); doc.setFontSize(9.5); doc.setTextColor.apply(doc,PDF_THEME.muted); doc.text('Resumen ejecutivo del Health Score y lectura del sistema.',16,43);
  pdfCard(doc,16,54,178,48,PDF_THEME.ivory,[232,228,216]);
  doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.setTextColor.apply(doc,PDF_THEME.goldDark); doc.text('RESUMEN EJECUTIVO',26,66);
  doc.setFont('helvetica','normal'); doc.setFontSize(8.6); doc.setTextColor.apply(doc,PDF_THEME.ink); pdfText(doc,professionalSummary(total,blockScores,priorityId,status),26,76,158,4.1);
  pdfCard(doc,16,110,178,40,PDF_THEME.paleGold,[232,218,176]);
  doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.setTextColor.apply(doc,PDF_THEME.goldDark); doc.text('DIAGNÓSTICO CENTRAL',26,123);
  doc.setFont('helvetica','normal'); doc.setFontSize(8.8); doc.setTextColor.apply(doc,PDF_THEME.ink); pdfText(doc,centralDiagnosis(blockScores,priorityId),26,134,158,4.25);
  pdfCard(doc,16,158,86,34,[250,255,251],[218,235,222]); pdfCard(doc,108,158,86,34,[255,248,248],[236,200,200]);
  doc.setFont('helvetica','bold'); doc.setFontSize(8.3); doc.setTextColor.apply(doc,PDF_THEME.green); doc.text('FORTALEZA PRINCIPAL',26,170);
  doc.setTextColor.apply(doc,PDF_THEME.red); doc.text('LIMITANTE PRINCIPAL',118,170);
  doc.setFont('helvetica','normal'); doc.setFontSize(8.2); doc.setTextColor.apply(doc,PDF_THEME.ink); pdfText(doc,strengthNarrative(strengths[0] || strongest),26,181,66,3.8); pdfText(doc,weaknessNarrative(weak[0]),118,181,66,3.8);
  pdfCard(doc,16,202,178,27,[255,255,255],PDF_THEME.line);
  doc.setFont('helvetica','bold'); doc.setFontSize(8.5); doc.setTextColor.apply(doc,PDF_THEME.goldDark); doc.text('LECTURA CLAVE',26,214);
  doc.setFont('helvetica','normal'); doc.setFontSize(8.9); doc.setTextColor.apply(doc,PDF_THEME.ink); pdfText(doc,keyInsight(blockScores,priorityId),26,224,158,4.2);
  addMiniMetric(doc,16,242,'Health Score',total+'/100'); addMiniMetric(doc,62,242,'Estado',status.label); addMiniMetric(doc,108,242,'Más bajo',priorityBlock.name+' '+blockScores[priorityId]+'/20',PDF_THEME.red); addMiniMetric(doc,154,242,'Más alto',strongest.block.name+' '+strongest.score+'/20',PDF_THEME.green);

  doc.addPage(); pdfHeader(doc,3,'Fortalezas y limitantes'); pdfFooter(doc);
  doc.setFont('helvetica','normal'); doc.setFontSize(9.5); doc.setTextColor.apply(doc,PDF_THEME.muted); doc.text('Doble lectura: lo que ya sostiene el proceso y lo que está frenando la adaptación.',16,43);
  doc.setFont('helvetica','bold'); doc.setFontSize(10); doc.setTextColor.apply(doc,PDF_THEME.green); doc.text('PUNTOS FUERTES DETECTADOS',16,60);
  var y=68;
  var strengthsToShow = strengths.length ? strengths : [strongest];
  var PAGE_SAFE_LIMIT = 248;
  strengthsToShow.forEach(function(item){
    if(y + 34 > PAGE_SAFE_LIMIT){ doc.addPage(); pdfHeader(doc,3,'Fortalezas y limitantes (cont.)'); pdfFooter(doc); y=48; }
    pdfCard(doc,16,y,178,27,[250,255,251],[218,235,222]);
    doc.setFont('helvetica','bold'); doc.setFontSize(10); doc.setTextColor.apply(doc,PDF_THEME.ink); doc.text(item.block.name.toUpperCase(),24,y+9);
    doc.setFont('helvetica','normal'); doc.setFontSize(8.5); doc.setTextColor.apply(doc,PDF_THEME.softInk); pdfText(doc,strengthNarrative(item),24,y+17,116,4);
    doc.setFont('helvetica','bold'); doc.setFontSize(14); doc.setTextColor.apply(doc,PDF_THEME.green); doc.text(item.score+'/20',180,y+13,{align:'right'});
    y+=34;
  });
  y += 6;
  if(y + 8 > PAGE_SAFE_LIMIT){ doc.addPage(); pdfHeader(doc,3,'Limitantes'); pdfFooter(doc); y=48; }
  doc.setFont('helvetica','bold'); doc.setFontSize(10); doc.setTextColor.apply(doc,PDF_THEME.red); doc.text('PUNTOS A TRABAJAR',16,y); y+=8;
  weak.forEach(function(item, idx){
    if(y + 36 > PAGE_SAFE_LIMIT){ doc.addPage(); pdfHeader(doc,3,'Limitantes (cont.)'); pdfFooter(doc); y=48; }
    pdfCard(doc,16,y,178,29,idx===0?[255,248,248]:[255,255,255],idx===0?[236,200,200]:PDF_THEME.line);
    doc.setFont('helvetica','bold'); doc.setFontSize(10); doc.setTextColor.apply(doc,PDF_THEME.ink); doc.text(item.block.name.toUpperCase(),24,y+9);
    doc.setFont('helvetica','normal'); doc.setFontSize(8.5); doc.setTextColor.apply(doc,PDF_THEME.softInk); pdfText(doc,weaknessNarrative(item),24,y+17,118,4);
    doc.setFont('helvetica','bold'); doc.setFontSize(14); doc.setTextColor.apply(doc,idx===0?PDF_THEME.red:PDF_THEME.amber); doc.text(item.score+'/20',180,y+13,{align:'right'});
    if(idx===0){ doc.setFont('helvetica','bold'); doc.setFontSize(7); doc.text('PRIORITARIO',180,y+23,{align:'right'}); }
    y+=36;
  });
  if(y < PAGE_SAFE_LIMIT){
    pdfCard(doc,16,y+2,178,28,PDF_THEME.paleGold,[232,218,176]);
    doc.setFont('helvetica','bold'); doc.setFontSize(8.5); doc.setTextColor.apply(doc,PDF_THEME.goldDark); doc.text('PRIORIDAD REAL',26,y+13);
    doc.setFont('helvetica','normal'); doc.setFontSize(8.4); doc.setTextColor.apply(doc,PDF_THEME.ink); pdfText(doc,'La prioridad no es mejorar todo a la vez. La prioridad es reducir la limitación principal para desbloquear el sistema. En este caso, '+priorityBlock.name+' debe guiar la primera fase de intervención.',26,y+23,158,3.9);
  }

  doc.addPage(); pdfHeader(doc,4,'Resultados por bloque'); pdfFooter(doc);
  doc.setFont('helvetica','normal'); doc.setFontSize(9.5); doc.setTextColor.apply(doc,PDF_THEME.muted); doc.text('Puntuación, porcentaje, interpretación y prioridad del sistema.',16,43);
  y=56;
  BLOCKS.forEach(function(block){
    var score=blockScores[block.id], pct=Math.round((score/20)*100), level=getBlockInterpretation(score), isPriority=block.id===priorityId;
    pdfCard(doc,16,y,178,29,isPriority?[255,248,248]:[255,255,255],isPriority?[236,200,200]:PDF_THEME.line);
    doc.setFont('helvetica','bold'); doc.setFontSize(10); doc.setTextColor.apply(doc,PDF_THEME.ink); doc.text(safeText(block.name).toUpperCase(),24,y+9);
    doc.setFont('helvetica','normal'); doc.setFontSize(8); doc.setTextColor.apply(doc,PDF_THEME.muted); doc.text(level.desc,24,y+16,{maxWidth:88});
    doc.setFont('helvetica','bold'); doc.setFontSize(13); doc.setTextColor.apply(doc,level.color); doc.text(score+'/20',114,y+11,{align:'right'}); doc.setFontSize(8.5); doc.text(pct+'%',114,y+21,{align:'right'});
    // Barra de progreso como rectángulo fino (más precisa y premium que line)
    doc.setFillColor(232,232,232); doc.rect(124,y+13,57,2,'F');
    doc.setFillColor.apply(doc,level.color); doc.rect(124,y+13,57*(pct/100),2,'F');
    doc.setFont('helvetica','bold'); doc.setFontSize(7.5); doc.setTextColor.apply(doc,isPriority?PDF_THEME.red:PDF_THEME.muted); doc.text(isPriority?'PRIORITARIO':level.label.toUpperCase(),181,y+24,{align:'right'});
    y+=36;
  });

  pdfCard(doc,16,238,178,28,PDF_THEME.ivory,[232,228,216]);
  doc.setFont('helvetica','normal'); doc.setFontSize(8.3); doc.setTextColor.apply(doc,PDF_THEME.ink); pdfText(doc,'Cada bloque no debe analizarse de forma aislada. El rendimiento del sistema depende del equilibrio entre ellos. Un único bloque por debajo del resto puede reducir la eficiencia global, aunque existan fortalezas en otras áreas.',26,249,158,3.9);

  doc.addPage(); pdfHeader(doc,5,'Mapa de Salud'); pdfFooter(doc);
  doc.setFont('helvetica','normal'); doc.setFontSize(9.5); doc.setTextColor.apply(doc,PDF_THEME.muted); doc.text('Visión radial de los 5 pilares principales.',16,43);
  drawPdfRadar(doc,blockScores,105,122,52);
  pdfCard(doc,22,196,166,52,PDF_THEME.ivory,[232,228,216]);
  doc.setFont('helvetica','bold'); doc.setFontSize(8.5); doc.setTextColor.apply(doc,PDF_THEME.goldDark); doc.text('LECTURA DEL MAPA',32,211);
  doc.setFont('helvetica','normal'); doc.setFontSize(9.4); doc.setTextColor.apply(doc,PDF_THEME.ink); pdfText(doc,'El objetivo no es maximizar un bloque, sino equilibrar el sistema. Cuando existe descompensación, el rendimiento global se adapta al nivel del bloque más bajo. Por eso el foco inicial debe estar en reducir la distancia entre fortalezas y limitantes.',32,222,146,4.7);

  doc.addPage(); pdfHeader(doc,6,'Estrategia inicial recomendada'); pdfFooter(doc);
  doc.setFont('helvetica','normal'); doc.setFontSize(9.5); doc.setTextColor.apply(doc,PDF_THEME.muted); doc.text('Bloque prioritario: '+priorityBlock.name+'. Objetivo: convertir el diagnóstico en primeras acciones medibles.',16,43);
  pdfCard(doc,16,56,178,35,PDF_THEME.paleGold,[232,218,176]);
  doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.setTextColor.apply(doc,PDF_THEME.goldDark); doc.text('CRITERIO DE INTERVENCIÓN',26,69);
  doc.setFont('helvetica','normal'); doc.setFontSize(9.2); doc.setTextColor.apply(doc,PDF_THEME.ink); pdfText(doc,'La intervención no debe centrarse en añadir más carga, sino en mejorar la eficiencia del sistema. La primera fase debe reducir el principal factor limitante sin comprometer las áreas que ya funcionan correctamente. Optimizar el sistema es más efectivo que aumentarlo.',26,80,158,4.5);
  y=104;
  (RECOMMENDATIONS[priorityId]||[]).forEach(function(rec,i){ pdfCard(doc,16,y,178,24,[255,255,255],PDF_THEME.line); doc.setFillColor.apply(doc,PDF_THEME.gold); doc.circle(27,y+12,4.5,'F'); doc.setFont('helvetica','bold'); doc.setFontSize(7.5); doc.setTextColor(255,255,255); doc.text(String(i+1),27,y+14.4,{align:'center'}); doc.setFont('helvetica','normal'); doc.setFontSize(8.8); doc.setTextColor.apply(doc,PDF_THEME.ink); pdfText(doc,rec.text,38,y+9,145,4.1); y+=29; });

  doc.addPage(); pdfHeader(doc,7,'Plan inicial de 7 días'); pdfFooter(doc);
  doc.setFont('helvetica','normal'); doc.setFontSize(9.5); doc.setTextColor.apply(doc,PDF_THEME.muted); doc.text('Mini intervención de arranque: acción, objetivo e indicador de control.',16,43);
  y=55;
  buildSevenDayPlan(priorityId).forEach(function(d){
    pdfCard(doc,16,y,178,25,[255,255,255],PDF_THEME.line);
    doc.setFillColor.apply(doc,PDF_THEME.ink); doc.roundedRect(22,y+6,19,13,3,3,'F');
    doc.setFont('helvetica','bold'); doc.setFontSize(7.8); doc.setTextColor(255,255,255); doc.text(d.day.replace('Día ','D'),31.5,y+14.5,{align:'center'});
    doc.setFont('helvetica','bold'); doc.setFontSize(8.2); doc.setTextColor.apply(doc,PDF_THEME.ink); doc.text('Acción',48,y+8); doc.text('Objetivo',96,y+8); doc.text('Control',145,y+8);
    doc.setFont('helvetica','normal'); doc.setFontSize(8); doc.setTextColor.apply(doc,PDF_THEME.softInk); doc.text(doc.splitTextToSize(d.action,40),48,y+16); doc.text(doc.splitTextToSize(d.objective,40),96,y+16); doc.text(doc.splitTextToSize(d.metric,36),145,y+16);
    y+=29;
  });

  doc.addPage(); pdfHeader(doc,8,'Cierre del informe'); pdfFooter(doc);
  doc.setFont('times','bold'); doc.setFontSize(25); doc.setTextColor.apply(doc,PDF_THEME.ink); doc.text('De los datos al plan real',105,62,{align:'center'});
  doc.setFont('times','bold'); doc.setFontSize(18); doc.setTextColor.apply(doc,PDF_THEME.goldDark); doc.text('No necesitas hacer más.',105,88,{align:'center'});
  doc.text('Necesitas hacer lo correcto en el momento adecuado.',105,101,{align:'center'});
  doc.setFont('helvetica','normal'); doc.setFontSize(10.3); doc.setTextColor.apply(doc,PDF_THEME.softInk); pdfText(doc,'Este informe es una primera lectura orientativa. Para transformar estos datos en resultados reales, es necesario interpretar el contexto, ajustar prioridades, medir la respuesta y construir un plan personalizado.',42,121,126,5.3);
  pdfCard(doc,32,164,146,58,PDF_THEME.ivory,[232,228,216]);
  doc.setFont('helvetica','bold'); doc.setFontSize(12); doc.setTextColor.apply(doc,PDF_THEME.goldDark); doc.text('Solicitar análisis personalizado con Javier Manzano',105,183,{align:'center'});
  doc.setFont('helvetica','normal'); doc.setFontSize(10); doc.setTextColor.apply(doc,PDF_THEME.ink); doc.text('WhatsApp: 679 69 13 37',105,200,{align:'center'}); doc.text('Email: javiermanzanoruiz@hotmail.com',105,211,{align:'center'});
  doc.setFont('times','italic'); doc.setFontSize(13); doc.setTextColor.apply(doc,PDF_THEME.goldDark); doc.text('Health & Life by Javier Manzano',105,241,{align:'center'});
  // Devolver blob para que exportPDF lo gestione en el hilo del evento
  try {
    return doc.output('blob');
  } catch(e) {
    return null;
  }
}

function exportPDF() {
  if (!lastResults) { showToast('⚠️ Primero calcula el Health Score'); return; }
  showToast('📄 Cargando generador...');
  loadJsPDF(function(jsPDFLib) {
    showToast('📄 Generando informe...');
    var clientName = safeText(clientMeta ? clientMeta.name : '', 'Cliente');
    var fileName = 'Health-Life-' + clientName.replace(/\s+/g, '-') + '.pdf';
    var blob = generatePremiumPDF(jsPDFLib);
    if (!blob) { showToast('⚠️ Error generando el PDF. Recarga e inténtalo.'); return; }
    try {
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function(){ URL.revokeObjectURL(url); }, 30000);
      showToast('✅ PDF descargado correctamente');
    } catch(e) {
      // Fallback: abrir en nueva pestaña
      try {
        var url2 = URL.createObjectURL(blob);
        window.open(url2, '_blank');
        showToast('📄 PDF abierto — guárdalo desde la pestaña');
      } catch(e2) {
        showToast('⚠️ No se pudo generar. Prueba desde el ordenador.');
      }
    }
  });
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
