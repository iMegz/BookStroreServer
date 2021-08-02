const crypto = require("crypto");
/**
 * Generates a random token
 * @param {number} length - Length of generated token
 * @returns {Promise} Generated token
 */
exports.generateToken = (length = 32) => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(length, function (ex, buffer) {
      if (ex) {
        reject();
      }
      const token = crypto.createHash("sha1").update(buffer).digest("hex");
      resolve(token);
    });
  });
};
/**
 * Genrates an expiration date
 * @param {number} [hours=1] - Number of hours from now (default 1 hour)
 * @returns {number} Milliseconds from now till expiration date
 */

exports.generateExpireDate = (hours = 1) => {
  // 1000 ms * 60 s * 60 m ==> 1 hour
  return Date.now() + 1000 * 60 * 60 * hours;
};
/**
 *  Throws an error to be handled by error middleware
 * @param {number} StatusCode - Status code
 * @param {string} ErrorCode - Error code
 * @param {Array} data - More data about the error
 * @throws Error that will be handled by error middleware
 */
exports.error = (
  StatusCode = 500,
  ErrorCode = "SERVER_ERROR",
  ErrorData = []
) => {
  const error = new Error();
  error.StatusCode = StatusCode;
  error.ErrorCode = ErrorCode;
  error.ErrorData = ErrorData;
  throw error;
};
/**
 * Color Strings to be printed in console
 * @param {string} str - String to be colored
 * @param {string} color - Color of new string
 *@example
 * "red"
 * "green"
 * "yellow",
 * "blue",
 * "magenta",
 * "cyan",
 * "white",
 * "grey",
 * "brightRed",
 * "brightGreen",
 * "brightYellow",
 * "brightBlue",
 * "brightMagenta",
 * "brightCyan",
 * "default"
 * "black",
 * @returns {string} Colored string
 */
exports.color = (str, color = "default") => {
  colors = {
    red: 31,
    green: 32,
    yellow: 33,
    blue: 34,
    magenta: 35,
    cyan: 36,
    white: 37,
    grey: 90,
    brightRed: 91,
    brightGreen: 92,
    brightYellow: 93,
    brightBlue: 94,
    brightMagenta: 95,
    brightCyan: 96,
    default: 0,
    black: 90,
  };
  if (!colors[color]) color = "default";
  return `\u001b[${colors[color]}m${str}\u001b[0m`;
};
exports.performance = () => {
  const { performance } = require("perf_hooks");

  /**@returns {number} Initial time in milliseconds */
  const start = () => performance.now();

  /**
   * Shows a message with the operation title and measured time in milliseconds
   * @param {string} title - Title for the operation
   * @param {number} start - Initial time in milliseconds
   * */
  const stop = (title, start) => {
    const time = Math.round(performance.now() - start);
    let color = "red";
    if (time < 200) color = "green";
    else if (time < 750) color = "yellow";

    return console.log(`${title} ` + this.color(`${time} ms`, color));
  };

  const functions = { start, stop };
  return functions;
};
/**
 * Capialize the first letter in a string
 * @param {string} str - String to be capitalized
 * @returns {string} Capitalized string
 */
exports.capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
/**
 * Starts an interval and shows a loading message
 * @param {string} loadingmsg - Loading message
 */
exports.loading = (loadingmsg = "loading") => {
  loadingmsg = this.color(loadingmsg, "magenta");
  const start = (function () {
    const P = ["\\", "|", "/", "-"];
    let x = 0;
    return setInterval(() => {
      process.stdout.write(`\r${loadingmsg} ${P[x++]}`);
      x &= 3;
    }, 250);
  })();
  /**
   * Stops the interval and clears the loading message
   */
  const stop = () => {
    clearInterval(start);
    process.stdout.write("\r\x1b[K");
  };

  return { stop };
};

exports.decodeBase64 = (str) => Buffer.from(str, "base64").toString("utf-8");

exports.encodeBase64 = (str) => Buffer.from(str, "utf-8").toString("base64");

exports.deleteFile = (folder, filename) => {
  const { access, unlinkSync, constants } = require("fs");
  const { join } = require("path");

  const file = join(__dirname, "../", "uploads", folder, filename);
  access(file, constants.F_OK, (err) => !err && unlinkSync(file));
};
