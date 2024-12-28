// just lets firebase know these apis exist
// if you add an API, require it then add to module.exports
const { fetchUser } = require('./public/fetch-user');

module.exports = {
  fetchUser,
};