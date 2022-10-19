const Users = require('./users.models')
const Posts = require('./posts.models')
const Categories = require('./categories.models')

const initModels = () => {
    //* Relaciones
    //? Una publicación, pertenece a un Usuario
    Posts.belongsTo(Users) //* relación 1:N
    //? Un usuario tiene muchas Publicaciones
    Users.hasMany(Posts) 

    //? Una Publicación, pertenece a una Categoría
    Posts.belongsTo(Categories) //* relación 1:N
    //? Una Categoría, tiene muchas Publicaciones
    Categories.hasMany(Posts)
    
}

module.exports = initModels