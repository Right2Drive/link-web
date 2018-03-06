import * as R from 'ramda'

/**
 * Converts from camelCase to pascalCase
 *
 * @param {string} str
*/
var toPascalCase = function (str) {
  return R.converge(
    (...all) => R.join('', all),
    [
      R.pipe(
        R.head,
        R.toUpper
      ),
      R.tail
    ]
  )(str)
}

export default toPascalCase
