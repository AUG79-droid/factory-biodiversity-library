import type { NativeStorybook } from './nativeStorybooks.types';
import { BOOK_ILUMINACION_NOCTURNA } from './storybooks/iluminacion-nocturna';
import { BOOK_SBN_DRENAJE_SOSTENIBLE } from './storybooks/sbn-drenaje-sostenible';
import { BOOK_RUIDO_OPERATIVO } from './storybooks/ruido-operativo';
import { BOOK_CONECTIVIDAD_ECOLOGICA } from './storybooks/conectividad-ecologica';
import { BOOK_ESPECIES_INVASORAS } from './storybooks/especies-invasoras';
import { BOOK_ECOSISTEMA_OPERATIVO } from './storybooks/ecosistema-operativo';
import { BOOK_GESTION_HIDRICA_HUMEDALES } from './storybooks/gestion-hidrica-humedales';
import { BOOK_GESTION_RESIDUOS_VERDES } from './storybooks/gestion-residuos-verdes';
import { BOOK_MONITOREO_KPIS } from './storybooks/monitoreo-kpis';
import { BOOK_POLINIZADORES_INDUSTRIAL } from './storybooks/polinizadores-industrial';
import { BOOK_SUELO_DESELLADO } from './storybooks/suelo-desellado';
import { BOOK_FAUNA_URBANA } from './storybooks/fauna-urbana';
import { BOOK_NOCTURNAL_LIGHTING } from './storybooks/nocturnal-lighting';
import { BOOK_NBS_SUDS } from './storybooks/nbs-suds';
import { BOOK_OPERATIONAL_NOISE } from './storybooks/operational-noise';
import { BOOK_ECOLOGICAL_CONNECTIVITY } from './storybooks/ecological-connectivity';
import { BOOK_INVASIVE_SPECIES_EN } from './storybooks/invasive-species-en';
import { BOOK_OPERATIONAL_ECOSYSTEM } from './storybooks/operational-ecosystem';
import { BOOK_WATER_MANAGEMENT_WETLANDS } from './storybooks/water-management-wetlands';
import { BOOK_GREEN_WASTE_MANAGEMENT } from './storybooks/green-waste-management';
import { BOOK_BIODIVERSITY_MONITORING } from './storybooks/biodiversity-monitoring';
import { BOOK_URBAN_FAUNA_COEXISTENCE } from './storybooks/urban-fauna-coexistence';
import { BOOK_POLLINATORS_INDUSTRIAL_EN } from './storybooks/pollinators-industrial-en';
import { BOOK_SOIL_DE_SEALING } from './storybooks/soil-de-sealing';

export const NATIVE_STORYBOOKS: Record<string, NativeStorybook> = {
  'iluminacion-nocturna': BOOK_ILUMINACION_NOCTURNA,
  'sbn-drenaje-sostenible': BOOK_SBN_DRENAJE_SOSTENIBLE,
  'ruido-operativo': BOOK_RUIDO_OPERATIVO,
  'conectividad-ecologica': BOOK_CONECTIVIDAD_ECOLOGICA,
  'especies-invasoras': BOOK_ESPECIES_INVASORAS,
  'ecosistema-operativo': BOOK_ECOSISTEMA_OPERATIVO,
  'gestion-hidrica-humedales': BOOK_GESTION_HIDRICA_HUMEDALES,
  'gestion-residuos-verdes': BOOK_GESTION_RESIDUOS_VERDES,
  'monitoreo-kpis': BOOK_MONITOREO_KPIS,
  'polinizadores-industrial': BOOK_POLINIZADORES_INDUSTRIAL,
  'suelo-desellado': BOOK_SUELO_DESELLADO,
  'fauna-urbana': BOOK_FAUNA_URBANA,
  'nocturnal-lighting': BOOK_NOCTURNAL_LIGHTING,
  'nbs-suds': BOOK_NBS_SUDS,
  'operational-noise': BOOK_OPERATIONAL_NOISE,
  'ecological-connectivity': BOOK_ECOLOGICAL_CONNECTIVITY,
  'invasive-species-en': BOOK_INVASIVE_SPECIES_EN,
  'operational-ecosystem': BOOK_OPERATIONAL_ECOSYSTEM,
  'water-management-wetlands': BOOK_WATER_MANAGEMENT_WETLANDS,
  'green-waste-management': BOOK_GREEN_WASTE_MANAGEMENT,
  'biodiversity-monitoring': BOOK_BIODIVERSITY_MONITORING,
  'urban-fauna-coexistence': BOOK_URBAN_FAUNA_COEXISTENCE,
  'pollinators-industrial-en': BOOK_POLLINATORS_INDUSTRIAL_EN,
  'soil-de-sealing': BOOK_SOIL_DE_SEALING,
};

export const getNativeStorybook = (slug: string) => NATIVE_STORYBOOKS[slug];
