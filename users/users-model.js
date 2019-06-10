const db = require('../data/dbConfig');

module.exports ={
    listUsers,
    findBy,
    findById,
    addUser,
    
}

function listUsers() {
    return db('users').select('*');
}
function findBy (param) {
    return db('users').where(param);
}

function findById(id) {
    return db('users')
    .where( { id })
    .first();
}

function addUser(user) {
    return db('users')
        .insert(user, 'id')
        .then(ids =>{
            const [id] = ids;
            return findById(id);
        });
}