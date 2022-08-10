import path from 'path';
import os from 'os';


/**
 * Rewrite file with passed arguments
 * @param {object} args argument object (containing path, file, haystack, etc properties)
 * @param {object} generator reference to the generator
 */
export function rewriteFile(args, generator) {
  let fullPath;
  if (args.path) {
    fullPath = generator.destinationPath(path.join(args.path, args.file));
  } else {
    fullPath = generator.destinationPath(args.file);
  }
  if (!generator.env.sharedFs.existsInMemory(fullPath) && generator.env.sharedFs.existsInMemory(`${fullPath}.jhi`)) {
    fullPath = `${fullPath}.jhi`;
  }

  args.haystack = generator.fs.read(fullPath);
  const body = rewrite(args);
  generator.fs.write(fullPath, body);
  return args.haystack !== body;
}


/**
 * Escape regular expressions.
 *
 * @param {string} str string
 * @returns {string} string with regular expressions escaped
 */
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&'); // eslint-disable-line
}

/**
 * Normalize line endings.
 * If in Windows is Git autocrlf used then need to replace \r\n with \n
 * to achieve consistent comparison result when comparing strings read from file.
 *
 * @param {string} str string
 * @returns {string} string where CRLF is replaced with LF in Windows
 */
function normalizeLineEndings(str) {
  const isWin32 = os.platform() === 'win32';
  return isWin32 ? str.replace(/\r\n/g, '\n') : str;
}

/**
 * Change spaces sequences and '>' to allow any number of spaces or new line prefix
 *
 * @param {string} str string
 * @returns {string} string where CRLF is replaced with LF in Windows
 */
function convertToPrettierExpressions(str) {
  return str.replace(/\s+/g, '([\\s\n]*)').replace(/>+/g, '(\n?[\\s]*)>');
}

/**
 * Rewrite using the passed argument object.
 *
 * @param {object} args arguments object (containing splicable, haystack, needle properties) to be used
 * @param {string[]} args.splicable       - content to be added.
 * @param {boolean} [args.prettierAware]  - apply prettier aware expressions before looking for applied needles.
 * @param {string|RegExp} [args.regexp]    - use another content for looking for applied needles.
 * @returns {*} re-written file
 */
function rewrite(args) {
  // check if splicable is already in the body text
  let re;
  if (args.regexp) {
    re = args.regexp;
    if (!re.test) {
      re = escapeRegExp(re);
    }
  } else {
    re = args.splicable.map(line => `\\s*${escapeRegExp(normalizeLineEndings(line))}`).join('\n');
  }
  if (!re.test) {
    if (args.prettierAware) {
      re = convertToPrettierExpressions(re);
    }
    re = new RegExp(re);
  }

  if (re.test(normalizeLineEndings(args.haystack))) {
    return args.haystack;
  }

  const lines = args.haystack.split('\n');

  let otherwiseLineIndex = -1;
  lines.forEach((line, i) => {
    if (line.includes(args.needle)) {
      otherwiseLineIndex = i;
    }
  });

  if (otherwiseLineIndex === -1) {
    console.warn(`Needle ${args.needle} not found at file ${args.file}`);
    return args.haystack;
  }

  let spaces = 0;
  while (lines[otherwiseLineIndex].charAt(spaces) === ' ') {
    spaces += 1;
  }

  let spaceStr = '';

  // eslint-disable-next-line no-cond-assign
  while ((spaces -= 1) >= 0) {
    spaceStr += ' ';
  }

  lines.splice(otherwiseLineIndex, 0, args.splicable.map(line => spaceStr + line).join('\n'));

  return lines.join('\n');
}

