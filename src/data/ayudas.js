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

export const regionesDetalle = {
    madrid: {
        label: 'Comunidad de Madrid',
        tiempoTramitacion: 348,
        municipios: [
            {
                slug: 'capital',
                label: 'Madrid Capital',
                ayudas: [
                    {
                        titulo: 'Becas NEAE',
                        pasos: [
                            'Solicitud en el centro educativo',
                            'Informe de evaluación psicopedagógica',
                            'Resolución de la Consejería de Educación',
                        ],
                    },
                    {
                        titulo: 'Reconocimiento del grado de discapacidad',
                        pasos: [
                            'Solicitud en el CADEP más cercano',
                            'Valoración médica y social',
                            'Resolución y tarjeta acreditativa',
                        ],
                    },
                    {
                        titulo: 'Adaptaciones laborales',
                        pasos: [
                            'Solicitud junto a servicio de prevención',
                            'Informe de adaptación de puesto',
                            'Aplicación de la medida',
                        ],
                    },
                ],
            },
            { slug: 'alcala', label: 'Alcalá de Henares', ayudas: [] },
            { slug: 'mostoles', label: 'Móstoles', ayudas: [] },
            { slug: 'getafe', label: 'Getafe', ayudas: [] },
            { slug: 'alcorcon', label: 'Alcorcón', ayudas: [] },
            { slug: 'fuenlabrada', label: 'Fuenlabrada', ayudas: [] },
        ],
    },
    cataluna: {
        label: 'Cataluña',
        tiempoTramitacion: 276,
        provincias: [
            {
                slug: 'barcelona',
                label: 'Barcelona',
                municipios: [
                    {
                        slug: 'ciudad',
                        label: 'Barcelona (ciudad)',
                        ayudas: [
                            {
                                titulo: 'Beques NESE',
                                pasos: [
                                    'Sol·licitud al centre educatiu',
                                    "Informe de l'EAP",
                                    "Resolució del Departament d'Educació",
                                ],
                            },
                            {
                                titulo: 'Reconocimiento del grado de discapacidad',
                                pasos: [
                                    'Solicitud en el CAD correspondiente',
                                    'Valoración médica y social',
                                    'Resolución y tarjeta acreditativa',
                                ],
                            },
                            {
                                titulo: 'Adaptaciones laborales',
                                pasos: [
                                    'Solicitud junto a servicio de prevención',
                                    'Informe de adaptación de puesto',
                                    'Aplicación de la medida',
                                ],
                            },
                        ],
                    },
                    { slug: 'hospitalet', label: "L'Hospitalet de Llobregat", ayudas: [] },
                    { slug: 'badalona', label: 'Badalona', ayudas: [] },
                    { slug: 'terrassa', label: 'Terrassa', ayudas: [] },
                    { slug: 'sabadell', label: 'Sabadell', ayudas: [] },
                ],
            },
            { slug: 'girona', label: 'Girona', municipios: [] },
            { slug: 'lleida', label: 'Lleida', municipios: [] },
            { slug: 'tarragona', label: 'Tarragona', municipios: [] },
        ],
    },
    andalucia: {
        label: 'Andalucía',
        tiempoTramitacion: 496,
        provincias: [
            { slug: 'almeria', label: 'Almería', municipios: [] },
            { slug: 'cadiz', label: 'Cádiz', municipios: [] },
            { slug: 'cordoba', label: 'Córdoba', municipios: [] },
            { slug: 'granada', label: 'Granada', municipios: [] },
            { slug: 'huelva', label: 'Huelva', municipios: [] },
            { slug: 'jaen', label: 'Jaén', municipios: [] },
            { slug: 'malaga', label: 'Málaga', municipios: [] },
            {
                slug: 'sevilla',
                label: 'Sevilla',
                municipios: [
                    {
                        slug: 'capital',
                        label: 'Sevilla (capital)',
                        ayudas: [
                            {
                                titulo: 'Becas NEAE',
                                pasos: [
                                    'Solicitud en el centro educativo',
                                    'Informe del Equipo de Orientación',
                                    'Resolución de la Consejería de Educación',
                                ],
                            },
                            {
                                titulo: 'Reconocimiento del grado de discapacidad',
                                pasos: [
                                    'Solicitud en el Centro de Valoración y Orientación',
                                    'Valoración médica y social',
                                    'Resolución y tarjeta acreditativa',
                                ],
                            },
                            {
                                titulo: 'Adaptaciones laborales',
                                pasos: [
                                    'Solicitud junto a servicio de prevención',
                                    'Informe de adaptación de puesto',
                                    'Aplicación de la medida',
                                ],
                            },
                        ],
                    },
                    { slug: 'dos-hermanas', label: 'Dos Hermanas', ayudas: [] },
                    { slug: 'alcala-guadaira', label: 'Alcalá de Guadaíra', ayudas: [] },
                    { slug: 'utrera', label: 'Utrera', ayudas: [] },
                ],
            },
        ],
    },
};
