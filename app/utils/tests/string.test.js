
import { removeFirstCharacter } from '../string';

describe('string', () => {
  it('should remove the first character if of the given string', () => {
    expect(removeFirstCharacter('@', '@john_doe')).toEqual('john_doe');
  });
  it('should throw an error if the first character fails to match the expect string', () => {
    const removeFirstCharacterWrapper = () => {
      removeFirstCharacter('%', '@john_doe');
    };
    expect(removeFirstCharacterWrapper).toThrowError('Expected character doesn\'t match the first string');
  });
});
