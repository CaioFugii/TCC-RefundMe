import * as yup from 'yup';
import moment, { isDate } from 'moment';

class MomentDateSchema extends yup.mixed {
  private validFormats: string[] = [];

  constructor() {
    super();

    this.withMutation(() => {
      this.transform((value, originalValue) => {
        if (this.isType(value)) return value.toString();
        const date = moment(originalValue, this.validFormats, true);
        return date.isValid() ? date.toDate() : undefined;
      });
    });
  }

  // eslint-disable-next-line
  _typeCheck(value: any) {
    return isDate(value) && !Number.isNaN(value.getTime());
  }

  format(formats: string | string[]) {
    if (!formats) throw new Error('must enter a valid format');
    if (Array.isArray(formats)) {
      this.validFormats = [...this.validFormats, ...formats];
    } else {
      this.validFormats.push(formats);
    }
    return this;
  }
}

export default new MomentDateSchema();
