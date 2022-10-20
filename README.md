# Blog API

- Front:
    - Obtener todas las publicaciones
    - Obtener una en especifico
    - Obtener todas las categorías
    - Obtener todos los post de una categoría en especifico
    - Obtener todos los post que he creado
    - Obtener todos los posts de un usuario en especifico
    - Podemos paginar los posts
    - Acciones de CRUD sobre Posts
    - Crear categorías

```json 
    {
        "total": 68,
        "prev": "localhost:9000/api/v1/post?start=51&limit=60",
        "next": "localhost:9000/api/v1/post?start=61&limit=68",
        "data": [
            {
                "id": "07bc4e26-a44e-4541-a226-01d7c2584aba",
                "title": "ejemplo",
                "content": "Lorem ipsum",
                "createdBy": {
                    "id": "12",
                    "name": "Antonio",
                    "email": "antonio@gmail.com",
                },
                "category": {
                    "id": "5955f401-f0b6-4be4-aa80-67d080c40447",
                    "name": "Tecnología"
                }
            }
        ]
    }
    

* Rutas

/api/v1

/auth
    - /register
    - /login
    - /confirm-user/:token
    - /reset-password
    - /reset-password/:token

/users
    - /me
    - /me/posts
    - /me/posts/id
    - /:id

/categories
    - /:id
    - /:id/posts

/posts
    - /:id