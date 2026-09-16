export const comunidades = [
    { slug: 'andalucia', label: 'Andalucía', status: 'ready' },
    { slug: 'aragon', label: 'Aragón', status: 'soon' },
    { slug: 'asturias', label: 'Principado de Asturias', status: 'soon' },
    { slug: 'baleares', label: 'Illes Balears (Islas Baleares)', status: 'soon' },
    { slug: 'canarias', label: 'Canarias', status: 'soon' },
    { slug: 'cantabria', label: 'Cantabria', status: 'soon' },
    { slug: 'castilla-leon', label: 'Castilla y León', status: 'soon' },
    { slug: 'castilla-la-mancha', label: 'Castilla-La Mancha', status: 'soon' },
    { slug: 'cataluna', label: 'Cataluña', status: 'ready' },
    { slug: 'valencia', label: 'Comunidad Valenciana', status: 'soon' },
    { slug: 'extremadura', label: 'Extremadura', status: 'soon' },
    { slug: 'galicia', label: 'Galicia', status: 'soon' },
    { slug: 'madrid', label: 'Comunidad de Madrid', status: 'ready' },
    { slug: 'murcia', label: 'Región de Murcia', status: 'soon' },
    { slug: 'navarra', label: 'Comunidad Foral de Navarra', status: 'soon' },
    { slug: 'pais-vasco', label: 'País Vasco', status: 'soon' },
    { slug: 'la-rioja', label: 'La Rioja', status: 'soon' },
];

// Educación (NEAE) y reconocimiento de discapacidad son competencia de
// comunidad autónoma — el organismo y los requisitos son los mismos en toda
// la región. Lo único que varía por localidad es qué oficina física tramita
// el papeleo, y eso no tiene contenido propio verificable todavía (ver
// AyudasPage.jsx → locator). Corrección 2026-09-08, page-specs.md §5.
export const TIPOS_AYUDA = [
    { value: 'educacion', label: 'Becas y apoyos NEAE' },
    { value: 'discapacidad', label: 'Reconocimiento de discapacidad' },
    { value: 'laboral', label: 'Adaptaciones laborales' },
];

export const regionesDetalle = {
    madrid: {
        label: 'Comunidad de Madrid',
        tiempoTramitacion: 348,
        sedeUrl: 'https://sede.comunidad.madrid/',
        ayudas: {
            educacion: {
                titulo: 'Becas y apoyos NEAE',
                pasos: [
                    'Solicitud en el centro educativo',
                    'Informe de evaluación psicopedagógica',
                    'Resolución de la Consejería de Educación',
                ],
            },
            discapacidad: {
                titulo: 'Reconocimiento del grado de discapacidad',
                pasos: [
                    'Solicitud en el CADEP más cercano',
                    'Valoración médica y social',
                    'Resolución y tarjeta acreditativa',
                ],
            },
            laboral: {
                titulo: 'Adaptaciones laborales',
                pasos: [
                    'Solicitud junto a servicio de prevención',
                    'Informe de adaptación de puesto',
                    'Aplicación de la medida',
                ],
            },
        },
    },
    cataluna: {
        label: 'Cataluña',
        tiempoTramitacion: 276,
        sedeUrl: 'https://tramits.gencat.cat/ca/tramits/',
        ayudas: {
            educacion: {
                titulo: 'Beques NESE',
                pasos: [
                    'Sol·licitud al centre educatiu',
                    "Informe de l'EAP",
                    "Resolució del Departament d'Educació",
                ],
            },
            discapacidad: {
                titulo: 'Reconocimiento del grado de discapacidad',
                pasos: [
                    'Solicitud en el CAD correspondiente',
                    'Valoración médica y social',
                    'Resolución y tarjeta acreditativa',
                ],
            },
            laboral: {
                titulo: 'Adaptaciones laborales',
                pasos: [
                    'Solicitud junto a servicio de prevención',
                    'Informe de adaptación de puesto',
                    'Aplicación de la medida',
                ],
            },
        },
    },
    andalucia: {
        label: 'Andalucía',
        tiempoTramitacion: 496,
        sedeUrl: 'https://www.juntadeandalucia.es/servicios/sede',
        ayudas: {
            educacion: {
                titulo: 'Becas NEAE',
                pasos: [
                    'Solicitud en el centro educativo',
                    'Informe del Equipo de Orientación',
                    'Resolución de la Consejería de Educación',
                ],
            },
            discapacidad: {
                titulo: 'Reconocimiento del grado de discapacidad',
                pasos: [
                    'Solicitud en el Centro de Valoración y Orientación',
                    'Valoración médica y social',
                    'Resolución y tarjeta acreditativa',
                ],
            },
            laboral: {
                titulo: 'Adaptaciones laborales',
                pasos: [
                    'Solicitud junto a servicio de prevención',
                    'Informe de adaptación de puesto',
                    'Aplicación de la medida',
                ],
            },
        },
    },
};
