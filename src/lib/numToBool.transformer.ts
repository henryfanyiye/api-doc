import { ValueTransformer } from 'typeorm';

export class NumToBoolTransformer implements ValueTransformer {
  // To db from typeorm
  to(value: any): any {
    return value;
  }

  // From db to typeorm
  from(value: Buffer): boolean | null {
    if (value === null) {
      return false;
    }
    return value[0] === 1;
  }
}
