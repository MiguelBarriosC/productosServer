const express = require('express');

const response =  require('../../network/response');
const Controller = require('./index');

const router = express.Router();

//Routes
router.get('/', list);
router.get('/:name', get)
router.post('/', insert);
router.put('/:name', update);
router.delete('/:name', remove);

//Internal functions
function list(req, res, next) {
    const categoria = req.query.categoria;
    Controller.list(categoria)
        .then((lista) => {
            response.success(req, res, lista, 200);
        })
        .catch(next)
}
function get(req, res, next) {
    Controller.get(req.params.name)
        .then((producto) => {
            response.success(req, res, producto, 200);
        })
        .catch(next)
}
function insert(req, res, next) {
    let data = req.body;
    Controller.insert(data)
        .then(() => {
            response.success(req, res, "GOOD", 200);
        })
        .catch(next)
}
function update(req, res, next) {
    let data = req.body;
    Controller.update(req.params.name, data)
        .then(() => {
            response.success(req, res, "UPDATED", 200);
        })
        .catch(next)
}
function remove(req, res, next) {
    Controller.remove(req.params.name)
        .then(() => {
            response.success(req, res, "REMOVED", 200);
        })
        .catch(next)
}

module.exports = router;