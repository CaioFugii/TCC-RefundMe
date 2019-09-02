import * as Yup from 'yup';
import { parse } from 'date-fns';

export function date(value: any, originalValue: any) {
  return originalValue instanceof Date ? originalValue : parse(originalValue, 'dd/MM/yyyy', new Date())
}

