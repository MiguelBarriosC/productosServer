const db = require('../db/db.json');


async function list(tabla) {
    return db[tabla] || [];
}
async function get(tabla, nombre) {
    let collection = await list(tabla);
    return collection.filter( item => item.nombre === nombre)[0];
}
async function insert(tabla, data) {
    if (!db[tabla]) db[tabla] = [];

    db[tabla].push(data)
}
async function update(tabla, index, data) {
    if (!db[tabla]) db[tabla] = [];
    db[tabla][index].nombre = data.nombre;
    db[tabla][index].categoria = data.categoria;
    db[tabla][index].sabor = data.sabor;
    db[tabla][index].precio = data.precio;
    db[tabla][index].estado = data.estado;
}
async function remove(tabla, index) {
    db[tabla][index].estado = false;
}
async function query(tabla, q) {
    let collection = await list(tabla);
    let keys = Object.keys(q);
    let key = keys[0];

    return collection.filter( item => item[keys[0]] === q[key]) || null
}
module.exports = {
    list,
    get,
    insert,
    update,
    remove,
    query
}