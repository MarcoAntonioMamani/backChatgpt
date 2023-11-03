module.exports = {
    "historias_usuarios": [
      {
        "nombre": "Registro de Usuarios",
        "descripcion": "Como usuario, quiero poder registrarme en la plataforma para acceder a mis funciones personalizadas.",
        "criterios_aceptacion": [
          "Debo poder acceder a la página de registro desde la página de inicio.",
          "Debo poder ingresar mi nombre, dirección de correo electrónico y contraseña para registrarme.",
          "Debo recibir un correo electrónico de confirmación después de registrarme.",
          "Debo poder iniciar sesión con las credenciales que utilicé durante el registro.",
          "Debo ver un mensaje de bienvenida después de iniciar sesión correctamente."
        ]
      },
      {
        "nombre": "Gestión de Perfiles de Usuario",
        "descripcion": "Como administrador, quiero poder gestionar los perfiles de usuario para controlar los accesos y permisos.",
        "criterios_aceptacion": [
          "Debo poder agregar nuevos perfiles de usuario.",
          "Debo poder editar los permisos de los perfiles existentes.",
          "Debo poder desactivar perfiles de usuario si es necesario.",
          "Debo ver una lista de todos los perfiles de usuario disponibles."
        ]
      }
    ]
  }