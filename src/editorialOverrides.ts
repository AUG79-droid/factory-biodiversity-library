import type { ChapterIllustration } from './nativeStorybooks.types';

export type EditorialOverride = { title?: string; illustration?: ChapterIllustration };

const pdf = (slug: string, chapter: number): ChapterIllustration => ({ kind: 'pdf', slug, chapter });
const image = (path: string): ChapterIllustration => ({ kind: 'image', path });

export const EDITORIAL_OVERRIDES: Record<string, Record<number, EditorialOverride>> = {
  'iluminacion-nocturna': {
    4: { title: 'Huella fotométrica e intrusión lumínica' },
    5: { title: 'Seguimiento biológico de especies sensibles' },
  },
  'nocturnal-lighting': {
    4: { title: 'Photometric Footprint and Light Intrusion' },
    5: { title: 'Biological Monitoring of Sensitive Species' },
  },
  'sbn-drenaje-sostenible': {
    1: { illustration: pdf('nbs-suds', 2) },
    2: { illustration: pdf('nbs-suds', 3) },
    3: { illustration: pdf('nbs-suds', 4) },
    4: { title: 'Seguridad FOD y estabilidad de materiales', illustration: pdf('nbs-suds', 5) },
    5: { illustration: pdf('nbs-suds', 6) },
    6: { title: 'Mantenimiento seguro y gestión de subcontratas', illustration: pdf('nbs-suds', 7) },
    7: { illustration: pdf('nbs-suds', 8) },
  },
  'nbs-suds': {
    5: { title: 'FOD Safety and Material Stability' },
    7: { title: 'Safe Maintenance and Subcontractor Management' },
  },
  'ruido-operativo': {
    4: { title: 'Impacto acústico de la logística' },
    5: { title: 'Emisiones sonoras en producción', illustration: pdf('operational-noise', 5) },
    6: { title: 'Atenuación mediante barreras acústicas' },
    7: { title: 'Control de vibraciones en equipos' },
  },
  'operational-noise': {
    4: { title: 'Acoustic Impact of Logistics', illustration: pdf('ruido-operativo', 4) },
    5: { title: 'Noise Emissions in Production' },
    6: { title: 'Attenuation with Acoustic Barriers' },
    7: { title: 'Equipment Vibration Control' },
    8: { illustration: pdf('ruido-operativo', 8) },
    9: { illustration: pdf('ruido-operativo', 9) },
  },
  'conectividad-ecologica': {
    4: { title: 'Cartografía de barreras y permeabilidad del emplazamiento' },
    5: { title: 'Inventario biológico y nodos de conexión' },
    6: { title: 'Infraestructura verde integrada' },
    7: { title: 'Ecoductos y pasos de fauna técnicos' },
  },
  'ecological-connectivity': {
    3: { title: 'Mapping Site Barriers and Permeability' },
    4: { title: 'Biological Inventory and Connection Nodes' },
    5: { title: 'Integrated Green Infrastructure' },
    6: { title: 'Technical Eco-ducts and Wildlife Crossings' },
  },
  'especies-invasoras': {
    3: { title: 'Vectores de dispersión y competencia biológica' },
    5: { title: 'Bioincrustaciones en drenaje e intercambiadores' },
    6: { title: 'Bioseguridad y prevención primaria' },
    7: { title: 'Control especializado y trazabilidad de residuos' },
    8: { title: 'Monitorización avanzada y KPIs de control' },
  },
  'invasive-species-en': {
    3: { title: 'Dispersal Vectors and Biological Competition' },
    5: { title: 'Biofouling in Drainage and Heat Exchangers' },
    6: { title: 'Biosecurity and Primary Prevention' },
    7: { title: 'Specialist Control and Waste Traceability' },
    8: { title: 'Advanced Monitoring and Control KPIs' },
  },
  'ecosistema-operativo': {
    2: { title: 'Biodiversidad como infraestructura operativa' },
    3: { title: 'Corredores de madera muerta y control de erosión' },
    4: { title: 'Biorretención y filtrado de escorrentías' },
    5: { title: 'Fachadas vegetales para regulación térmica' },
    6: { title: 'Xerófitas y seguridad contra incendios' },
    7: { title: 'Bioindicadores para monitorización ambiental' },
    8: { title: 'Cubiertas técnicas y vida útil del activo' },
    9: { title: 'De la planta aislada a la red de resiliencia' },
  },
  'operational-ecosystem': {
    2: { title: 'Biodiversity as Operational Infrastructure' },
    3: { title: 'Deadwood Corridors and Erosion Control' },
    4: { title: 'Bioretention and Runoff Filtration' },
    5: { title: 'Vegetated Facades for Thermal Regulation' },
    6: { title: 'Xerophytes and Fire Safety' },
    7: { title: 'Bioindicators for Environmental Monitoring' },
    8: { title: 'Technical Roofs and Asset Life', illustration: pdf('ecosistema-operativo', 8) },
    9: { title: 'From an Isolated Plant to a Resilience Network' },
  },
  'gestion-hidrica-humedales': {
    5: { title: 'Línea base de biodiversidad nativa', illustration: pdf('water-management-wetlands', 4) },
    6: { title: 'Celdas de biorretención y control de sedimentos' },
    7: { title: 'Control del hidroperiodo y vegetación de ribera' },
  },
  'water-management-wetlands': {
    4: { title: 'Native Biodiversity Baseline' },
    5: { title: 'Bioretention Cells and Sedimentation Control' },
    6: { title: 'Hydroperiod Control and Riparian Vegetation' },
  },
  'gestion-residuos-verdes': {
    6: { illustration: image('illustrations/green-waste-protocols-editorial.png') },
  },
  'green-waste-management': {
    6: { illustration: image('illustrations/green-waste-protocols-editorial.png') },
  },
  'monitoreo-kpis': {
    5: { title: 'Interferencias bióticas en sensores y vallados' },
    7: { title: 'Seguridad operativa y calendario biológico' },
    9: { title: 'Biodiversidad funcional frente a greenwashing' },
  },
  'biodiversity-monitoring': {
    5: { title: 'Biotic Interference with Sensors and Fencing' },
    7: { title: 'Operational Safety and the Biological Calendar' },
    8: { illustration: pdf('monitoreo-kpis', 8) },
    9: { title: 'Functional Biodiversity Beyond Greenwashing', illustration: pdf('monitoreo-kpis', 9) },
  },
  'polinizadores-industrial': {
    4: { title: 'Puntos críticos de anidación e interferencias' },
    5: { title: 'Islas de calor, deriva química y conectividad' },
  },
  'suelo-desellado': {
    2: { title: 'Desellado estratégico y recuperación de permeabilidad' },
    3: { title: 'Física del suelo y capacidad de infiltración' },
    4: { title: 'Interfaces operativas y estabilidad del subsuelo' },
    5: { title: 'Ingeniería hidráulica para infiltración gradual' },
    6: { title: 'Geoceldas y capacidad portante' },
    7: { title: 'Seguridad laboral en el fresado del asfalto' },
  },
  'soil-de-sealing': {
    2: { title: 'Strategic De-sealing and Permeability Recovery' },
    3: { title: 'Soil Physics and Infiltration Capacity', illustration: pdf('suelo-desellado', 3) },
    4: { title: 'Operational Interfaces and Subsoil Stability' },
    5: { title: 'Hydraulic Engineering for Gradual Infiltration' },
    6: { title: 'Geocells and Load-bearing Capacity' },
    7: { title: 'Occupational Safety During Asphalt Milling' },
    8: { illustration: pdf('suelo-desellado', 8) },
    9: { illustration: pdf('suelo-desellado', 9) },
  },
  'fauna-urbana': {
    4: { title: 'Aves, climatización y riesgo operativo' },
    5: { title: 'Fauna terrestre y protección del cableado' },
    7: { title: 'Gestión del hábitat para disuasión natural' },
    8: { illustration: pdf('urban-fauna-coexistence', 8) },
    9: { title: 'Convivencia planificada frente a renaturalización superficial' },
  },
  'urban-fauna-coexistence': {
    4: { title: 'Birds, HVAC Systems and Operational Risk' },
    5: { title: 'Terrestrial Fauna and Cable Protection' },
    7: { title: 'Habitat Management for Natural Deterrence' },
  },
};
