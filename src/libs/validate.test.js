import validate, {
  isParsable,
  rowEndsWithoutComma,
  hasSameAmountOfEntries,
  hasCorrectCountOfQuotes
} from './validate';

describe('validate lib:', () => {
  describe('isParsable:', () => {
    it('should validate empty string to be valid', () => {
      expect(isParsable('')).toBe(true);
    });

    it('should validate string with numbers to be valid', () => {
      expect(isParsable('213123123')).toBe(true);
    });

    it('should validate mixed string to be valid', () => {
      expect(isParsable('feferuih3123#342423')).toBe(true);
    });

    it('should validate number to be invalid', () => {
      expect(isParsable(3)).toBe(false);
    });

    it('should validate object to be invalid', () => {
      expect(isParsable({})).toBe(false);
    });

    it('should validate array to be invalid', () => {
      expect(isParsable([])).toBe(false);
    });
  });

  describe('rowEndsWithoutComma:', () => {
    it('should validate 2 rows without commas to be valid', () => {
      expect(rowEndsWithoutComma('feferferfwefew\nferfewrfewr')).toBe(true);
    });

    it('should validate 1 row ending with comma to be invalid', () => {
      expect(rowEndsWithoutComma('feferferfwefew,\nferfewrfewr')).toBe(false);
    });

    it('should validate 2 rows with commas, but ending first with comma to be invalid', () => {
      expect(rowEndsWithoutComma('feferf,erfwefew,\nferfew,rfewr')).toBe(false);
    });

    describe('hasSameAmountOfEntries:', () => {
      it('2 rows with 2 entries should be valid', () => {
        expect(hasSameAmountOfEntries('feferfer,fwefew\nferfe,wrfewr')).toBe(true);
      });

      it('2 rows with 2 and 3 entries should be valid', () => {
        expect(hasSameAmountOfEntries('feferfer,fwefew\nferfe,wrf,ewr')).toBe(false);
      });
    });

    describe('hasCorrectCountOfQuotes:', () => {
      it('4 qoutes should be valid', () => {
        expect(hasCorrectCountOfQuotes('"feferfer",fwe""few\nferfe,wrfewr')).toBe(true);
      });

      it('3 qoutes should be invalid', () => {
        expect(hasCorrectCountOfQuotes('"feferfer",fwe"few\nferfe,wrfewr')).toBe(false);
      });
    });

    it('should return false for csv with 1 quote', () => {
      const csv = '"fefefre,fwefewfwe';
      expect(validate(csv)).toBe(false);
    });

    it('should return false for csv ending line with comma', () => {
      const csv = 'fefefre,fwefewfwe,';
      expect(validate(csv)).toBe(false);
    });

    it('should return false for csv having different amount of entries in different rows', () => {
      const csv = 'fefefre,fwefewfwe\ndwadwa,dwqdqw,dqw';
      expect(validate(csv)).toBe(false);
    });

    it('should return false for non string inputs', () => {
      expect(validate(3)).toBe(false);
      expect(validate([])).toBe(false);
      expect(validate({})).toBe(false);
    });

    it('should return true for valid csv', () => {
      const csv = 'fefefre,fwefewfwe\ndwadwa,dwqdqw';
      expect(validate(csv)).toBe(true);
    });
  });
});
