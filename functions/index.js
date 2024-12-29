// just lets firebase know these apis exist
// if you add an API, require it then add to module.exports
const { fetchUser } = require('./public/fetch-user');
const { fetchUserPriv } = require("./server/fetch-user-trans");

module.exports = {
  fetchUser,
  fetchUserPriv,
};