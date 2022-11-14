# NeoxEntrevistaNestJS

Base de datos: PostgreSQl 12.0
Api: NestJS Framework (TypeScript)

### ¿Como inicializar el proyecto?

    docker-compose up

Se debe tener el archivo .env

### Rutas de Login

	localhost:3000/api/auth/register [POST]
	{	
		"user": "mail@gmail.com",
		"password": "12345",
		"rol": "ADMIN",
		"name": "Lester Carrasco Muñoz"
	}
Roles disponibles: ADMIN, STANDARD.

	localhost:3000/api/auth/login [POST]
	{
		"user": "mail@gmail.com",
		"password": "12345"
	}

	localhost:3000/api/recovery/password [POST]
	{
		"email": "mail@gmail.com"
	}
Con esta ruta se imprime tanto por consola como envio de mail al correo con el codigo de recuperacion.

	localhost:3000/api/auth/security-code [POST]
	{
		"user": "mail@gmail.com",
		"newPassword": "pol",
		"confirmNewPassword": "pol",
		"code": "$2b$10$6/6F9tsuk8BoG7Hm3VkPT.mbEmCFZHiQIkKQmSe2wvr2nejBAzpKm"
	}
	http://localhost:3000/health [GET]
	
Ruta para comprobar el estado del servicio.

### Rutas de CRUD
Se necesita Bearer Token devuelto en Login.
Solo los administradores pueden bloquear, crear y editar usuarios desde dentro.
Los roles STANDARD, solo pueden listar usuarios.


headers

	{
		Content-Type: application/json
		Authorization: Bearer [TOKEN]
	}

	localhost:3000/api/users/create [POST]	
	{
		"email": "paulina@gmail.com",
		"password": "1231211245",
		"rol": "STANDARD",
		"name": "Paulina Rivera"
	}

	localhost:3000/api/users/block [POST]
	{
		"email": "paulina@gmail.com"
	}
	
	localhost:3000/api/users/list [GET]
	
	localhost:3000/api/users/update [PATCH]
	
	{
		"email": "mail@gmail.com",
		"rol": "ADMIN",
		"name": "Lester Carrasco aaaa"
	}

Importante, en la ruta de update deben ir todos los campos, debido a que esto usualmente se controla del front devolviendo los state (hook de react) al back.

Para finalizar, me tope con un pequeño problema al manejar el process.env dentro de docker y es por esto que tuve que poner el JWT_SECRET en duro en el archivo .ts



