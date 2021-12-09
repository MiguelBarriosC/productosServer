const error =  require('../../utils/error');

const TABLA = 'products';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/db');
    }

    async function list(categoria) {
        if (categoria) {
            const data = await store.query(TABLA, { categoria: categoria });
            return data;
        } else {
            return store.list(TABLA);
        }   
    }

    async function get(name) {
        return store.get(TABLA, name)
    }

    async function insert(body) {
        if (body.nombre && body.categoria && body.sabor && body.precio && body.estado) {
            return store.insert(TABLA, body);
        } else {
            throw error('Todos los campos son requeridos')
        }
    }

    async function update(name ,body) {

        let products = await list();
        let index = -1;

        products.filter((el, i) => {
            if (el.nombre === name) index = i;
            return el.nombre === name;
        });

        if (index < 0) throw error('El producto no existe', 404);

        if (body.nombre && body.categoria && body.sabor && body.precio && body.estado) {
            return store.update(TABLA, index, body);
        } else {
            throw error('Todos los campos son requeridos');
        }
    }

    async function remove(name) {
        let products = await list();
        let index = -1;

        products.filter((el, i) => {
            if (el.nombre === name) index = i;
            return el.nombre === name;
        });

        if (index < 0) throw error('El producto que desea eliminar no existe', 404);

        return store.remove(TABLA, index);
    }

    return {
        list,
        get,
        insert,
        update,
        remove
    }
}