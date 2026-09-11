/**
 * ═══════════════════════════════════════════════════
 * CONFIGURACIÓN CENTRAL — "Nuestro día"
 * ═══════════════════════════════════════════════════
 *
 * Todo lo que necesitas personalizar está aquí.
 * Nombres, códigos, textos, fotografías, ubicación.
 *
 * No deberías necesitar tocar ningún componente
 * para personalizar la experiencia.
 */

export const CONFIG = {
  // ─── Nombres ──────────────────────────────────
  herName: '',
  myName: '',

  // ─── Zona horaria ─────────────────────────────
  timezone: 'America/Bogota',

  // ─── Versículo bíblico (opcional) ─────────────
  verse: {
    enabled: false,
    reference: '',
    text: '',
  },

  // ─── Ubicación final (opcional) ───────────────
  finalDestination: {
    enabled: false,
    latitude: null,
    longitude: null,
    mapsUrl: '',
    label: '',
  },

  // ─── Fotografías ──────────────────────────────
  // Reemplaza con las rutas reales de tus fotos.
  // Coloca las imágenes en /public/images/
  images: {
    intro: '/images/foto-intro.jpg',
    nails: '/images/el_comienzo.jpeg',
    hair: '/images/algo_cambio.jpeg',
    dress: '/images/foto-dress.jpg',
    date: '/images/foto-date.jpg',
    final: '/images/foto-final.jpg',
  },
}

/**
 * ─── Actividades / Etapas ─────────────────────
 *
 * Cada etapa tiene:
 * - id: identificador interno
 * - code: el código que desbloquea la etapa
 * - title: nombre corto de la etapa
 * - icon: emoji representativo
 * - teaser: texto previo al desbloqueo (qué esperar)
 * - person: quién participa en esta etapa
 * - image: clave en CONFIG.images
 * - memory: recuerdo que aparece tras desbloquear
 * - narrative: secuencia de textos narrativos
 */
export const STAGES = [
  {
    id: 'nails',
    code: '2017',
    title: 'El comienzo',
    icon: '✦',
    teaser: {
      heading: 'Tu día comienza aquí',
      lines: [
        'Para iniciar, tienes una cita agendada a las 9:30',
        'Y alguien muy especial pasará por ti.',
        'Cuando termines, te daré una pista...'
      ],
    },
    person: '',
    image: 'nails',
    memory: {
      year: '2017',
      caption: 'Cuando todavía éramos solamente amigos…',
    },
    narrative: [
      'Por allá, terminando 2017, llegué a la iglesia.',
      'Y sin saberlo, llegué también a tu vida.',
      'Comenzamos una historia que ninguno de los dos sabía a dónde nos iba a llevar.',
      'Primero fuimos amigos.',
      'Y fuimos amigos durante muchísimo tiempo.',
      'Años en los que ni tú ni yo sospechábamos lo que venía.',
    ],
  },
  {
    id: 'hair',
    code: '2024',
    title: 'Algo cambió',
    icon: '✦',
    teaser: {
      heading: 'Cada detalle importa',
      lines: [
        'Un momento especial, puede requerir un retoque especial.',
        'Y quien mejor, que alguien que te ha acompañado durante toda tu vida, tu mamá.',
        'Cuando termines, te daré otra pista...'
      ],
    },
    person: '',
    image: 'hair',
    memory: {
      year: '2024',
      caption: 'El año en el que todo cambió.',
    },
    narrative: [
      'Después de tantos años siendo amigos, algo cambió.',
      'En 2024 empezaste a gustarme.',
      'Te lo dije.',
      '…y me despachaste.',
      'Pero parece que la historia no había terminado ahí.',
      'Con el tiempo, tú también empezaste a sentir algo.',
      'Me propusiste conocernos en una "amistad con propósito".',
      'Después de un tiempo estando un poco más cerca tuve que arriesgarme',
      'Y te pregunté si querías ser mi novia.',
      'A lo cual dijiste que no.',
      'Pero poco después…',
      '…algo también cambió dentro de ti.',
      'Y aquí estamos.',
    ],
  },
  {
    id: 'dress',
    code: '2025/12/12',
    title: 'Una decisión importante',
    icon: '✦',
    teaser: {
      heading: 'Hay algo esperándote',
      lines: [
        'Ya casi estamos listos, pero hay algo que me falta.',
        'Ve donde tu papá, hay algo que quiere darte.',
      ],
    },
    person: 'Tu papá',
    image: 'dress',
    memory: {
      year: '2025/12/12',
      caption: 'Una decisión importante',
    },
    narrative: [
      'Este día con una sola palabra lograste describir algo especial.',
      'Tiempo!',
      'El tiempo se encargó de formar cimientes sólidas de lo que disfrutamos hoy',
      'Y hoy puedo decir que he amado cada parte de ser tu novio.'
    ],
  },
  {
    id: 'date',
    code: '2026/09/12',
    title: 'El último paso',
    icon: '♥',
    teaser: {
      heading: 'Ya casi',
      lines: [
        'Has seguido cada pista.',
        'Has recorrido cada momento.',
        'Y ahora solo queda uno.',
        'Esta vez no tienes que buscar a nadie.',
        'Ahora debes encontrarme a mí.',
        'Hay un lugar y un recuerdo que tenemos pendiente redefinir.'
      ],
    },
    person: 'Andrés',
    image: 'date',
    memory: null,
    narrative: null,
  },
]

/**
 * ─── Textos de la experiencia ─────────────────
 *
 * Todos los textos fijos de la interfaz.
 * Modificar aquí para cambiar la voz de la experiencia.
 */
export const TEXTS = {
  // Pantalla de inicio
  intro: {
    lines: [
      'Mi amor',
      'Hoy es un día especial y para ello, vamos a prepararnos mientras te cuento una historia…',
    ],
    cta: 'Comenzar nuestro día',
  },

  // Regreso (con progreso existente)
  returning: {
    greeting: 'Qué bueno verte de nuevo ❤️',
    message: 'Tu camino continúa aquí.',
    cta: 'Continuar',
  },

  // Input de código
  codeInput: {
    placeholder: 'Escribe el código',
    button: 'Desbloquear',
    error: 'Ese no parece ser el código… intenta nuevamente ❤️',
    unlocking: 'Desbloqueando…',
  },

  // Pantalla final
  final: {
    sequence: [
      'Has llegado hasta aquí.',
      'Quizás ahora entiendes por qué cada persona hizo parte de este día.',
      'Porque nuestra historia nunca fue solamente nuestra.',
      'Nos conocimos en la iglesia.',
      'Fuimos amigos durante años.',
      'Ninguno imaginaba lo que iba a pasar.',
      'En 2025 todo comenzó a cambiar.',
      'Y finalmente terminamos juntos.',
      'Dios se encargó de cruzar nuestros caminos.',
      'De unir nuestras vidas.',
      'Y de mostrarnos que su propósito para nosotros era mucho más grande de lo que imaginábamos.',
      'Ahora comienza el siguiente capítulo.',
    ],
    closing: 'Hoy después de tanto tiempo tomamos una decisión especial.',
    heart: 'Decido amarte a ti por el resto de mi vida. ❤️',
    locationCta: 'Encontrarme',
  },

  // Estados de etapas
  stages: {
    locked: 'Aún no es momento…',
    available: 'Disponible',
    completed: 'Completado ✓',
  },
}
