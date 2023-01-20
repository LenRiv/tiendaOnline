# Api de productos

## GET /api/products

- Recupera todos los productos de la BD
- PRUEBAS:
  - Status que nos devuelve es 200
  - La respuesta debe tener formato JSON
  - La respuesta debe ser un array
  - Los elementos dentro del array tienen que ser productos

## POST /api/products

- Creación de un producto en la BD
- A través del BODY le hago llegar todos los datos del nuevo producto
- Como respuesta recibiremos todos los datos del nuevo producto
- PRUEBAS:
  - Que la respuesta sea correcta -> Status 200
  - Que el valor de la respuesta sea un JSON
  - Comprobar si se ha insertado el producto

## PUT /api/products/PRODUCTID

- Actualiza los datos de un producto en la base de datos
- El id del producto a actualizar lo recibe en la URL
- Los datos del producto para su actualización se reciben en req.body
- La respuesta debe ser el producto modificado
- PRUEBAS:
  - Que la respuesta sea correcta -> Status: 200. Content-type: application/json
  - Debemos comprobar si los datos devueltos en la respuesta coinciden con la
    modificación realizada

## DELETE /api/products/PRODUCTID

- Borra un producto de la base de datos
- El id del producto a borrar lo recibimos a través de la URL
- La respuesta debe incluir los datos del producto borrado
- PRUEBAS:
  - Que la respuesta sea correcta -> Status: 200. Content-type: application/json
  - Comprobar si los datos de la respuesta se corresponden con el producto
    borrado
  - Comprobar si el producto sigue en la BD

## GET /api/products/DEPARTAMENTO

- Recupera todos los productos del departamento que adjuntemos en la URL
- find(FILTRO)

## GET /api/products/min/PRECIOMIN/max/PRECIOMAX

- Recupera todos los productos en un rango de precios
- Los precios están en la URL
- find(FILTRO) - $gt, $lt, $gte, $lte

## GET /api/products/actives

- Recupera los productos que estén disponibles y con stock mayor que cero
- find(FILTRO)

## GET /api/users/cart

- Recupera un array con todos los productos del usuario autenticado

## GET /api/users/cart/remove/PRODUCTID

- Pasamos el id del producto a través de la URL y borramos dicho producto del carrito del usuario autenticado


# App Angular

- Crear a app -> TiendaOnline
- Instalar bootstrap
- RUTAS:
  - /login -> components/LoginComponent
  - /productos -> components/productos/ListaProductos
- Servicios:
  - UsersService
  - ProductsService
- NO OLVIDAR: importar ReactiveFormsModule y HttpClientModule

- Dentro de LoginComponent generamos un formulario con email y password
  - Los datos de este formulario los mandamos a POST localhost:3000/api/users (método dentro del servicio)
  - En la respuesta estará el token -> almacenar en localstorage

- Dentro de ListaProductos recuperamos todos los productos de localhost:3000/api/products (método dentro del servicio)
  - ¡¡Necesitamos el token!!


### Componente: FormProductos - Ruta: productos/new

- Dentro del componente generamos un formulario con todos los campos necesarios para la creación de un producto
- En el servicio creamos un método que replique la petición para insertar productos del Back
- ¡Cómo recoger y mostrar los errores!