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

// ── Export PDF Premium ───────────────────────────────────────
const PDF_THEME = { dark:[10,12,15], card:[17,20,24], gold:[201,168,76], goldSoft:[230,205,128], text:[31,34,38], muted:[105,110,118], line:[224,226,230], pale:[248,246,239], red:[224,92,92], green:[86,156,112], amber:[206,145,58] };
function safeText(value, fallback) { return String(value || fallback || '').replace(/[🌀-🫿]/gu, '').trim(); }
function getBlockById(id) { return BLOCKS.find(function(b){ return b.id === id; }); }
function getStrongestBlock(blockScores) { var entries = Object.entries(blockScores).sort(function(a,b){ return b[1] - a[1]; }); return { block:getBlockById(entries[0][0]), score:entries[0][1] }; }
function getBlockInterpretation(score) { var pct=(score/20)*100; if(pct<40) return {label:'Crítico', color:PDF_THEME.red, desc:'Requiere intervención prioritaria.'}; if(pct<60) return {label:'Limitante', color:PDF_THEME.amber, desc:'Condiciona el progreso global.'}; if(pct<80) return {label:'Estable', color:PDF_THEME.green, desc:'Base funcional con margen de mejora.'}; return {label:'Fuerte', color:PDF_THEME.gold, desc:'Pilar consolidado del sistema.'}; }
function buildSevenDayPlan(priorityId) {
  var base = {
    estres: [['Respiración 10 min + descarga mental escrita','Reducir activación del sistema nervioso','Nivel de tensión 1-10'],['Bloquear 2 ventanas sin móvil','Bajar estímulos y recuperar control atencional','Minutos reales sin pantalla'],['Caminata suave postcomida 20 min','Favorecer regulación glucémica y mental','Energía después de comer'],['Revisar agenda y eliminar 1 compromiso no esencial','Reducir carga invisible','Carga mental 1-10'],['Desconexión 60 min antes de dormir','Mejorar transición al descanso','Hora real de apagado'],['Sesión ligera o movilidad 20 min','Recuperar sin añadir estrés','Sensación corporal 1-10'],['Revisión semanal: sueño, energía y control','Decidir el siguiente ajuste','Promedio de estrés semanal']],
    descanso: [['Fijar hora de sueño y despertar','Regular ritmo circadiano','Hora de acostarse'],['Luz natural por la mañana 10-15 min','Anclar el reloj biológico','Minutos de luz exterior'],['Cortar cafeína después de las 14:00','Reducir interferencias del sueño','Hora última cafeína'],['Dormitorio oscuro y fresco','Mejorar calidad del sueño profundo','Despertares nocturnos'],['Rutina nocturna de 20 min','Asociar noche con recuperación','Calidad subjetiva 1-10'],['Siesta cero o controlada <20 min','Aumentar presión de sueño nocturna','Somnolencia nocturna'],['Revisión del sueño semanal','Detectar patrón limitante','Horas medias dormidas']],
    movimiento: [['Objetivo mínimo de pasos','Aumentar actividad base','Pasos del día'],['Sesión de fuerza básica','Crear estímulo muscular claro','RPE de la sesión'],['Pausas activas cada 60 min','Reducir sedentarismo acumulado','Número de pausas'],['Movilidad 10 min','Mejorar rango y control articular','Rigidez 1-10'],['Segunda sesión de fuerza o técnica','Consolidar adherencia','Ejercicios completados'],['Actividad aeróbica suave 30 min','Mejorar base cardiorrespiratoria','Pulso o percepción'],['Revisión de volumen semanal','Ajustar carga sin improvisar','Sesiones completadas']],
    habitos: [['Planificar 3 comidas base','Reducir decisiones impulsivas','Comidas planificadas'],['Agua visible durante todo el día','Estabilizar hidratación','Litros aproximados'],['Proteína en cada comida principal','Mejorar saciedad y composición corporal','Tomas de proteína'],['Luz natural + paseo corto','Mejorar energía y regulación circadiana','Minutos exteriores'],['Reducir pantallas recreativas 30%','Liberar atención y descanso','Horas de pantalla'],['Preparar entorno alimentario','Facilitar adherencia','Opciones saludables disponibles'],['Revisión de adherencia','Identificar el hábito con más retorno','% cumplimiento semanal']],
    'estado-fisico': [['Registro de dolor, energía y molestias','Objetivar el punto de partida','Dolor 1-10'],['Movilidad suave 15 min','Reducir rigidez y mejorar percepción corporal','Rango percibido'],['Fuerza controlada sin dolor','Recuperar capacidad funcional','Ejercicios sin molestia'],['Caminata zona cómoda 20-30 min','Mejorar tolerancia al esfuerzo','Fatiga posterior'],['Trabajo preventivo zona débil','Reducir riesgo de recaída','Molestia tras sesión'],['Recuperación activa + sueño','Consolidar adaptación','Energía al despertar'],['Revisión funcional','Decidir progresión segura','Limitaciones detectadas']]
  };
  return (base[priorityId] || base.estres).map(function(row, idx){ return { day:'Día ' + (idx + 1), action:row[0], objective:row[1], metric:row[2] }; });
}
function pdfAddHeader(doc, pageNo) { var w=doc.internal.pageSize.getWidth(); doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor.apply(doc, PDF_THEME.gold); doc.text('HEALTH & LIFE SYSTEM',16,12); doc.setFont('helvetica','normal'); doc.setTextColor.apply(doc, PDF_THEME.muted); doc.text('Página ' + pageNo,w-16,12,{align:'right'}); doc.setDrawColor.apply(doc, PDF_THEME.line); doc.line(16,16,w-16,16); }
function pdfAddFooter(doc) { var h=doc.internal.pageSize.getHeight(), w=doc.internal.pageSize.getWidth(); doc.setDrawColor.apply(doc, PDF_THEME.line); doc.line(16,h-15,w-16,h-15); doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor.apply(doc, PDF_THEME.muted); doc.text('Evaluación orientativa. No constituye diagnóstico médico.',16,h-9); doc.text('Health & Life by Javier Manzano',w-16,h-9,{align:'right'}); }
function pdfText(doc, text, x, y, maxWidth, lineHeight) { var lines=doc.splitTextToSize(safeText(text), maxWidth); doc.text(lines,x,y); return y + lines.length * (lineHeight || 5); }
function pdfCard(doc, x, y, w, h, fill, stroke) { doc.setFillColor.apply(doc, fill || [255,255,255]); doc.setDrawColor.apply(doc, stroke || PDF_THEME.line); doc.roundedRect(x,y,w,h,4,4,'FD'); }
function addScoreBadge(doc,total,x,y,size,dark){ var color=total<=40?PDF_THEME.red:total<=60?PDF_THEME.amber:total<=80?PDF_THEME.green:PDF_THEME.gold; doc.setDrawColor.apply(doc,color); doc.setLineWidth(2.2); doc.circle(x,y,size/2,'S'); doc.setFont('helvetica','bold'); doc.setFontSize(size*0.42); doc.setTextColor.apply(doc,color); doc.text(String(total),x,y+3,{align:'center'}); doc.setFontSize(8); doc.setTextColor.apply(doc,dark?[220,220,220]:PDF_THEME.muted); doc.text('/100',x,y+13,{align:'center'}); }
function drawPdfRadar(doc, blockScores, centerX, centerY, radius) { var values=BLOCKS.map(function(b){return blockScores[b.id];}); var n=BLOCKS.length; function pt(i,val,r){ var angle=(Math.PI*2*i/n)-Math.PI/2; var rr=(val/20)*(r||radius); return [centerX+rr*Math.cos(angle), centerY+rr*Math.sin(angle)]; } doc.setLineWidth(0.25); [4,8,12,16,20].forEach(function(v){ var poly=[]; for(var i=0;i<n;i++) poly.push(pt(i,v)); doc.setDrawColor(225,225,225); for(var j=0;j<n;j++){ var p1=poly[j], p2=poly[(j+1)%n]; doc.line(p1[0],p1[1],p2[0],p2[1]); } }); for(var k=0;k<n;k++){ var p=pt(k,20); doc.setDrawColor(230,230,230); doc.line(centerX,centerY,p[0],p[1]); } var poly2=values.map(function(v,i){return pt(i,v);}); doc.setFillColor(248,246,229); doc.setDrawColor.apply(doc,PDF_THEME.gold); doc.setLineWidth(1.2); doc.triangle(poly2[0][0],poly2[0][1],poly2[1][0],poly2[1][1],poly2[2][0],poly2[2][1],'FD'); for(var m=0;m<n;m++){ var a=poly2[m], b=poly2[(m+1)%n]; doc.line(a[0],a[1],b[0],b[1]); doc.setFillColor.apply(doc,PDF_THEME.gold); doc.circle(a[0],a[1],1.8,'F'); } doc.setFont('helvetica','bold'); doc.setFontSize(8); BLOCKS.forEach(function(b,i){ var angle=(Math.PI*2*i/n)-Math.PI/2; var lx=centerX+(radius+18)*Math.cos(angle), ly=centerY+(radius+18)*Math.sin(angle); doc.setTextColor.apply(doc,PDF_THEME.text); doc.text(safeText(b.name),lx,ly,{align:'center'}); doc.setFont('helvetica','normal'); doc.setTextColor.apply(doc,PDF_THEME.gold); doc.text(values[i] + '/20',lx,ly+5,{align:'center'}); doc.setFont('helvetica','bold'); }); }
async function generatePremiumPDF() { if(!lastResults){ showToast('⚠️ Primero calcula el Health Score'); return; } var jsPDFLib=window.jspdf && window.jspdf.jsPDF; if(!jsPDFLib){ showToast('⚠️ No se pudo cargar el generador PDF. Revisa la conexión y recarga.'); return; } var doc=new jsPDFLib({orientation:'portrait',unit:'mm',format:'a4'}); var total=lastResults.total, blockScores=lastResults.blockScores, priorityId=lastResults.priorityId, status=lastResults.status; var priorityBlock=getBlockById(priorityId), strongest=getStrongestBlock(blockScores); var clientName=safeText(clientMeta.name,'Cliente'), clientGoal=safeText(clientMeta.goal,'No especificado'); var reportDate=new Date().toLocaleDateString('es-ES',{day:'numeric',month:'long',year:'numeric'}); var fileName='Health-Life-Informe-' + clientName.replace(/s+/g,'-') + '.pdf';
  doc.setFillColor.apply(doc,PDF_THEME.dark); doc.rect(0,0,210,297,'F'); doc.setDrawColor.apply(doc,PDF_THEME.gold); doc.setLineWidth(0.8); doc.line(18,24,192,24); doc.line(18,273,192,273); doc.setFont('helvetica','bold'); doc.setTextColor.apply(doc,PDF_THEME.gold); doc.setFontSize(10); doc.text('HEALTH & LIFE SYSTEM',105,42,{align:'center'}); doc.setFont('times','bold'); doc.setFontSize(30); doc.setTextColor(245,242,232); doc.text('Informe Integral',105,72,{align:'center'}); doc.text('de Salud y Bienestar',105,86,{align:'center'}); doc.setFont('helvetica','normal'); doc.setFontSize(11); doc.setTextColor(190,190,190); doc.text('Evaluación inicial basada en 5 pilares: estrés, descanso, movimiento, hábitos y estado físico.',105,103,{align:'center',maxWidth:150}); addScoreBadge(doc,total,105,138,62,true); doc.setFont('helvetica','bold'); doc.setFontSize(12); doc.setTextColor.apply(doc,PDF_THEME.gold); doc.text(status.label.toUpperCase(),105,181,{align:'center'}); pdfCard(doc,28,196,154,42,[17,20,24],[54,55,58]); doc.setFont('helvetica','normal'); doc.setFontSize(9); doc.setTextColor(155,155,155); doc.text('CLIENTE',38,208); doc.text('OBJETIVO',38,222); doc.text('FECHA',38,236); doc.setFont('helvetica','bold'); doc.setTextColor(245,242,232); doc.text(clientName,78,208); doc.text(doc.splitTextToSize(clientGoal,90),78,222); doc.text(reportDate,78,236); doc.setFont('times','italic'); doc.setFontSize(12); doc.setTextColor.apply(doc,PDF_THEME.goldSoft); doc.text('Lo que no se mide, no se puede mejorar. La clave está en el equilibrio.',105,257,{align:'center'});
  doc.addPage(); pdfAddHeader(doc,2); pdfAddFooter(doc); doc.setFont('times','bold'); doc.setFontSize(24); doc.setTextColor.apply(doc,PDF_THEME.text); doc.text('Lectura profesional del perfil actual',16,34); doc.setFont('helvetica','normal'); doc.setFontSize(10); doc.setTextColor.apply(doc,PDF_THEME.muted); doc.text('Resumen ejecutivo del Health Score y de las prioridades de intervención.',16,42); pdfCard(doc,16,54,178,72,PDF_THEME.pale,[226,221,204]); doc.setFont('helvetica','bold'); doc.setFontSize(10); doc.setTextColor.apply(doc,PDF_THEME.gold); doc.text('RESUMEN DEL PERFIL',26,67); doc.setFont('helvetica','normal'); doc.setFontSize(10.5); doc.setTextColor.apply(doc,PDF_THEME.text); pdfText(doc,buildClinicalSummary(total,blockScores,priorityId,status),26,78,158,5.2); pdfCard(doc,16,138,84,50,[255,255,255],PDF_THEME.line); pdfCard(doc,110,138,84,50,[255,255,255],PDF_THEME.line); doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.setTextColor.apply(doc,PDF_THEME.gold); doc.text('LECTURA CLAVE',26,151); doc.text('PRIORIDAD PRINCIPAL',120,151); doc.setFont('helvetica','normal'); doc.setFontSize(9.5); doc.setTextColor.apply(doc,PDF_THEME.text); pdfText(doc,'La prioridad no es hacer más, sino ordenar el sistema y reducir el principal factor limitante con una estrategia medible.',26,163,64,5); pdfText(doc,priorityBlock.name + ' aparece como el bloque más bajo (' + blockScores[priorityId] + '/20). Este pilar debe guiar la primera fase de intervención.',120,163,64,5); doc.setFont('times','bold'); doc.setFontSize(18); doc.setTextColor.apply(doc,PDF_THEME.text); doc.text('Indicadores principales',16,211); [['Health Score',total+'/100'],['Estado general',status.label],['Bloque más bajo',priorityBlock.name+' '+blockScores[priorityId]+'/20'],['Bloque más alto',strongest.block.name+' '+strongest.score+'/20']].forEach(function(m,i){ var x=16+(i%2)*94, yy=222+Math.floor(i/2)*24; pdfCard(doc,x,yy,84,18,[255,255,255],PDF_THEME.line); doc.setFont('helvetica','normal'); doc.setFontSize(7.5); doc.setTextColor.apply(doc,PDF_THEME.muted); doc.text(m[0].toUpperCase(),x+6,yy+7); doc.setFont('helvetica','bold'); doc.setFontSize(11); doc.setTextColor.apply(doc,PDF_THEME.text); doc.text(m[1],x+6,yy+14); });
  doc.addPage(); pdfAddHeader(doc,3); pdfAddFooter(doc); doc.setFont('times','bold'); doc.setFontSize(24); doc.setTextColor.apply(doc,PDF_THEME.text); doc.text('Resultados por bloque',16,34); doc.setFont('helvetica','normal'); doc.setFontSize(10); doc.setTextColor.apply(doc,PDF_THEME.muted); doc.text('Puntuación, porcentaje, interpretación y prioridad del sistema.',16,42); var y=56; BLOCKS.forEach(function(block){ var score=blockScores[block.id], pct=Math.round((score/20)*100), level=getBlockInterpretation(score), isPriority=block.id===priorityId; pdfCard(doc,16,y,178,31,isPriority?[255,248,248]:[255,255,255],isPriority?PDF_THEME.red:PDF_THEME.line); doc.setFont('helvetica','bold'); doc.setFontSize(11); doc.setTextColor.apply(doc,PDF_THEME.text); doc.text(safeText(block.name).toUpperCase(),24,y+10); doc.setFont('helvetica','normal'); doc.setFontSize(8); doc.setTextColor.apply(doc,PDF_THEME.muted); doc.text(level.desc,24,y+17); doc.setFont('helvetica','bold'); doc.setFontSize(14); doc.setTextColor.apply(doc,level.color); doc.text(score+'/20',116,y+12,{align:'right'}); doc.setFontSize(9); doc.text(pct+'%',116,y+22,{align:'right'}); doc.setDrawColor(232,232,232); doc.setLineWidth(3); doc.line(126,y+15,181,y+15); doc.setDrawColor.apply(doc,level.color); doc.line(126,y+15,126+55*(pct/100),y+15); doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor.apply(doc,isPriority?PDF_THEME.red:PDF_THEME.muted); doc.text(isPriority?'PRIORITARIO':level.label.toUpperCase(),181,y+25,{align:'right'}); y+=38; });
  doc.addPage(); pdfAddHeader(doc,4); pdfAddFooter(doc); doc.setFont('times','bold'); doc.setFontSize(24); doc.setTextColor.apply(doc,PDF_THEME.text); doc.text('Mapa de Salud',105,36,{align:'center'}); doc.setFont('helvetica','normal'); doc.setFontSize(10); doc.setTextColor.apply(doc,PDF_THEME.muted); doc.text('Visión radial de los 5 pilares principales.',105,44,{align:'center'}); drawPdfRadar(doc,blockScores,105,128,52); pdfCard(doc,22,205,166,42,PDF_THEME.pale,[226,221,204]); doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.setTextColor.apply(doc,PDF_THEME.gold); doc.text('LECTURA DEL MAPA',32,218); doc.setFont('helvetica','normal'); doc.setFontSize(10); doc.setTextColor.apply(doc,PDF_THEME.text); pdfText(doc,'Este mapa muestra el equilibrio entre los cinco pilares principales de salud. El objetivo no es solo subir la puntuación total, sino reducir las descompensaciones entre bloques.',32,229,146,5);
  doc.addPage(); pdfAddHeader(doc,5); pdfAddFooter(doc); doc.setFont('times','bold'); doc.setFontSize(24); doc.setTextColor.apply(doc,PDF_THEME.text); doc.text('Estrategia inicial recomendada',16,34); doc.setFont('helvetica','normal'); doc.setFontSize(10); doc.setTextColor.apply(doc,PDF_THEME.muted); doc.text('Bloque prioritario: '+priorityBlock.name,16,42); y=56; (RECOMMENDATIONS[priorityId]||[]).forEach(function(rec,i){ pdfCard(doc,16,y,178,31,[255,255,255],PDF_THEME.line); doc.setFillColor.apply(doc,PDF_THEME.gold); doc.circle(28,y+15,5,'F'); doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(255,255,255); doc.text(String(i+1),28,y+17.5,{align:'center'}); doc.setFont('helvetica','normal'); doc.setFontSize(9.5); doc.setTextColor.apply(doc,PDF_THEME.text); pdfText(doc,rec.text,40,y+11,142,4.7); y+=37; });
  doc.addPage(); pdfAddHeader(doc,6); pdfAddFooter(doc); doc.setFont('times','bold'); doc.setFontSize(24); doc.setTextColor.apply(doc,PDF_THEME.text); doc.text('Plan inicial de 7 días',16,34); doc.setFont('helvetica','normal'); doc.setFontSize(10); doc.setTextColor.apply(doc,PDF_THEME.muted); doc.text('Mini intervención de arranque para convertir el diagnóstico en acción.',16,42); y=56; buildSevenDayPlan(priorityId).forEach(function(d){ pdfCard(doc,16,y,178,25,[255,255,255],PDF_THEME.line); doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.setTextColor.apply(doc,PDF_THEME.gold); doc.text(d.day.toUpperCase(),24,y+9); doc.setFont('helvetica','bold'); doc.setFontSize(8.5); doc.setTextColor.apply(doc,PDF_THEME.text); doc.text('Acción:',52,y+8); doc.setFont('helvetica','normal'); doc.setFontSize(8.5); doc.text(doc.splitTextToSize(d.action,56),66,y+8); doc.setFont('helvetica','bold'); doc.text('Objetivo:',52,y+16); doc.setFont('helvetica','normal'); doc.text(doc.splitTextToSize(d.objective,56),66,y+16); doc.setFont('helvetica','bold'); doc.setTextColor.apply(doc,PDF_THEME.muted); doc.text('Control',151,y+8,{align:'center'}); doc.setFont('helvetica','normal'); doc.setFontSize(8); doc.text(doc.splitTextToSize(d.metric,33),151,y+16,{align:'center'}); y+=29; });
  doc.addPage(); doc.setFillColor.apply(doc,PDF_THEME.dark); doc.rect(0,0,210,297,'F'); doc.setDrawColor.apply(doc,PDF_THEME.gold); doc.setLineWidth(0.8); doc.line(28,40,182,40); doc.line(28,246,182,246); doc.setFont('helvetica','bold'); doc.setFontSize(10); doc.setTextColor.apply(doc,PDF_THEME.gold); doc.text('CIERRE DEL INFORME',105,63,{align:'center'}); doc.setFont('times','bold'); doc.setFontSize(26); doc.setTextColor(245,242,232); doc.text('De los datos al plan real',105,88,{align:'center'}); doc.setFont('helvetica','normal'); doc.setFontSize(11); doc.setTextColor(205,205,205); pdfText(doc,'Este informe es una primera lectura orientativa. Para transformar estos datos en resultados reales, es necesario interpretar el contexto, ajustar prioridades y construir un plan personalizado.',42,112,126,6); pdfCard(doc,38,152,134,48,[17,20,24],[54,55,58]); doc.setFont('helvetica','bold'); doc.setFontSize(12); doc.setTextColor.apply(doc,PDF_THEME.gold); doc.text('Solicitar análisis personalizado con Javier Manzano',105,169,{align:'center'}); doc.setFont('helvetica','normal'); doc.setFontSize(10); doc.setTextColor(245,242,232); doc.text('WhatsApp: 679 69 13 37',105,184,{align:'center'}); doc.text('Email: javiermanzanoruiz@hotmail.com',105,194,{align:'center'}); doc.setFont('times','italic'); doc.setFontSize(13); doc.setTextColor.apply(doc,PDF_THEME.goldSoft); doc.text('Health & Life by Javier Manzano',105,225,{align:'center'});
  doc.save(fileName);
}
function exportPDF() { showToast('📄 Generando informe premium...'); setTimeout(function(){ generatePremiumPDF(); }, 150); }

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
