const moment = require('moment');

module.exports = function formatDateMessage(username, text) {
  return {
    username,
    text,
    time: moment().format('HH:mm:ss'),
  };
};
