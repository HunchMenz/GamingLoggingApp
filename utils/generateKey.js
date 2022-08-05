/**
 * Generate unique key based on datetime
 * @param {*} pre - unique prefix to key
 * @returns
 */
export function generateKey(pre) {
  return `${pre}_${new Date().getTime()}`;
}

export default generateKey;
