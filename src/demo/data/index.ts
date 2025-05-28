// Demo timeline data exports
import basicDataDefault from '../data';
import mixedDataDefault from '../data-mixed';
import nestedDataDefault from '../data-nested';
import worldHistoryDataDefault from '../data2';
import { items2 as humanHistoryDataImport } from '../human-history';

export const basicData = basicDataDefault;
export const mixedData = mixedDataDefault;
export const nestedData = nestedDataDefault;
export const worldHistoryData = worldHistoryDataDefault;
export const humanHistoryData = humanHistoryDataImport;

// Default export for backwards compatibility
export default basicData; 