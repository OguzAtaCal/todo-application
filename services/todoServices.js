const knex = require("knex");
const knexFile = require("../database/knexfile.js");
const db = knex(knexFile.development);
const { attachPaginate } = require("knex-paginate");

class todoServices {}

module.exports = new todoServices();
