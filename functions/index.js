// just lets firebase know these apis exist
// if you add an API, require it then add to module.exports
const { fetchUser } = require("./public/fetch-user");
const { fetchUserPriv } = require("./server/fetch-user-trans");
const { fetchUserFromId } = require("./server/fetch-user-from-id");

module.exports = {
   // public api
   fetchUser,

   // protected api
   // ...

   // server api
   fetchUserPriv,
   fetchUserFromId,
};