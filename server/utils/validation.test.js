const expect = require('expect');
// use ES6 destructuring.
const {isRealString} = require('./validation');



describe('isRealString', () => {
  it('should reject non-string values', () => {
    // Here, we're doing a test case to handle a false value
    var res = isRealString(98);
    expect(res).toBe(false);
  });

  it('should reject string with only spaces', () => {
    // Here, we're doing a test case to handle a false value
    var res = isRealString('    ');
    expect(res).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    // Here, we're doing a test case to handle a false value
    var res = isRealString('D');
    expect(res).toBe(true);
  });
});
