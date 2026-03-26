export interface Storybook {
  id: string;
  slug: string;
  title: string;
  language: 'es' | 'en';
  pdfPath: string;
  bilingualPairId?: string;
}

const getPdfPath = (slug: string) => `pdfs/${slug}.pdf`;

export const SPANISH_STORYBOOKS: Storybook[] = [
  { id: 'es-1', slug: 'iluminacion-nocturna', title: 'Iluminación Nocturna y Mitigación del Impacto en la Fauna', language: 'es', pdfPath: getPdfPath('iluminacion-nocturna'), bilingualPairId: 'en-1' },
  { id: 'es-2', slug: 'sbn-drenaje-sostenible', title: 'SBN y drenaje sostenible (SUDS)', language: 'es', pdfPath: getPdfPath('sbn-drenaje-sostenible'), bilingualPairId: 'en-2' },
  { id: 'es-3', slug: 'ruido-operativo', title: 'Ruido operativo y biodiversidad', language: 'es', pdfPath: getPdfPath('ruido-operativo'), bilingualPairId: 'en-3' },
  { id: 'es-4', slug: 'conectividad-ecologica', title: 'Conectividad Ecológica / Corredor Verde', language: 'es', pdfPath: getPdfPath('conectividad-ecologica'), bilingualPairId: 'en-4' },
  { id: 'es-5', slug: 'especies-invasoras', title: 'Especies Invasoras: Estrategias de Prevención y Control Industrial', language: 'es', pdfPath: getPdfPath('especies-invasoras'), bilingualPairId: 'en-5' },
  { id: 'es-6', slug: 'ecosistema-operativo', title: 'El Ecosistema Operativo: Microhábitats en el Paisaje Industrial', language: 'es', pdfPath: getPdfPath('ecosistema-operativo'), bilingualPairId: 'en-6' },
  { id: 'es-7', slug: 'gestion-hidrica-humedales', title: 'Gestión Hídrica y Humedales Estacionales en Infraestructura Aeronáutica', language: 'es', pdfPath: getPdfPath('gestion-hidrica-humedales'), bilingualPairId: 'en-7' },
  { id: 'es-8', slug: 'gestion-residuos-verdes', title: 'Gestión de residuos verdes y compostaje', language: 'es', pdfPath: getPdfPath('gestion-residuos-verdes'), bilingualPairId: 'en-8' },
  { id: 'es-9', slug: 'monitoreo-kpis', title: 'Monitoreo y KPIs de biodiversidad en planta', language: 'es', pdfPath: getPdfPath('monitoreo-kpis'), bilingualPairId: 'en-9' },
  { id: 'es-10', slug: 'polinizadores-industrial', title: 'Polinizadores en entorno industrial', language: 'es', pdfPath: getPdfPath('polinizadores-industrial'), bilingualPairId: 'en-11' },
  { id: 'es-11', slug: 'suelo-desellado', title: 'Suelo y desellado', language: 'es', pdfPath: getPdfPath('suelo-desellado'), bilingualPairId: 'en-12' },
  { id: 'es-12', slug: 'fauna-urbana', title: 'Biblioteca de Biodiversidad en Fábrica: Convivencia con fauna urbana', language: 'es', pdfPath: getPdfPath('fauna-urbana'), bilingualPairId: 'en-10' },
];

export const ENGLISH_STORYBOOKS: Storybook[] = [
  { id: 'en-1', slug: 'nocturnal-lighting', title: 'Nocturnal Lighting and Fauna Impact Mitigation', language: 'en', pdfPath: getPdfPath('nocturnal-lighting'), bilingualPairId: 'es-1' },
  { id: 'en-2', slug: 'nbs-suds', title: 'NBS and Sustainable Drainage Systems (SuDS)', language: 'en', pdfPath: getPdfPath('nbs-suds'), bilingualPairId: 'es-2' },
  { id: 'en-3', slug: 'operational-noise', title: 'Operational Noise and Biodiversity', language: 'en', pdfPath: getPdfPath('operational-noise'), bilingualPairId: 'es-3' },
  { id: 'en-4', slug: 'ecological-connectivity', title: 'Ecological Connectivity / Green Corridor', language: 'en', pdfPath: getPdfPath('ecological-connectivity'), bilingualPairId: 'es-4' },
  { id: 'en-5', slug: 'invasive-species-en', title: 'Invasive Species: Industrial Prevention and Control Strategies', language: 'en', pdfPath: getPdfPath('invasive-species-en'), bilingualPairId: 'es-5' },
  { id: 'en-6', slug: 'operational-ecosystem', title: 'The Operational Ecosystem: Microhabitats in the Industrial Landscape', language: 'en', pdfPath: getPdfPath('operational-ecosystem'), bilingualPairId: 'es-6' },
  { id: 'en-7', slug: 'water-management-wetlands', title: 'Water Management and Seasonal Wetlands in Aeronautical Infrastructure', language: 'en', pdfPath: getPdfPath('water-management-wetlands'), bilingualPairId: 'es-7' },
  { id: 'en-8', slug: 'green-waste-management', title: 'Green Waste Management and Composting', language: 'en', pdfPath: getPdfPath('green-waste-management'), bilingualPairId: 'es-8' },
  { id: 'en-9', slug: 'biodiversity-monitoring', title: 'Biodiversity Monitoring and KPIs at the Plant', language: 'en', pdfPath: getPdfPath('biodiversity-monitoring'), bilingualPairId: 'es-9' },
  { id: 'en-10', slug: 'urban-fauna-coexistence', title: 'Factory Biodiversity Library: Urban Fauna Coexistence', language: 'en', pdfPath: getPdfPath('urban-fauna-coexistence'), bilingualPairId: 'es-12' },
  { id: 'en-11', slug: 'pollinators-industrial-en', title: 'Factory Biodiversity Library: Pollinators in Industrial Environments', language: 'en', pdfPath: getPdfPath('pollinators-industrial-en'), bilingualPairId: 'es-10' },
  { id: 'en-12', slug: 'soil-de-sealing', title: 'Soil De-sealing', language: 'en', pdfPath: getPdfPath('soil-de-sealing'), bilingualPairId: 'es-11' },
];

export const ALL_STORYBOOKS = [...SPANISH_STORYBOOKS, ...ENGLISH_STORYBOOKS];
