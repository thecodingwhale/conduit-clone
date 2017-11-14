
export function removeFirstCharacter(character, string) {
  if (string.charAt(0) === character) {
    return string.slice(1);
  }
  throw new Error('Expected character doesn\'t match the first string');
}
