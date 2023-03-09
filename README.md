# Comercializador Web v1.0.0

Este proyecto es creado con las tecnologías [Django](https://www.djangoproject.com/) y [React JS](https://es.reactjs.org/)


## Tabla de Contenido

- [Desarrollo Local](#desarrollo-local)
  - [Pasos para instalar las dependencias e inicial el servidor del backend](#1---pasos-para-instalar-las-dependencias-e-inicial-el-servidor-del-backend)
  - [Pasos para instalar las dependencias e inicial el servidor del frontend](#2---pasos-para-instalar-las-dependencias-e-inicial-el-servidor-del-frontend)
- [Información Extra](#información-extra)
- [Enlaces Útiles](#enlaces-útiles)

## Desarrollo Local

Para configurar un entorno local para el desarrollo, debe seguir los siguientes pasos:

### 1 - Pasos para instalar las dependencias e inicial el servidor del backend

Instalar la dependencia de virtualenv

```
pip install virtualenv
```

Para crear un entorno virtual con virtualenv nos situaremos en el directorio raíz de nuestro proyecto y ejecutaremos el siguiente comando.

```
virtualenv env
```

Usar el entorno virtual en Linux o en Windows

Linux:

```
source env/bin/activate
```

Windows:

```
env\Scripts\activate.bat
```

Instalar las dependencias indicadas en el fichero requirements.txt

```
pip install -r requirements.txt
```

Inicial servidor del backend

```
python .\manage.py runserver
```

### 2 - Pasos para instalar las dependencias e inicial el servidor del frontend

Entrar a la carpeta del frontend

```
cd frontend
```

Instalar las dependencias indicadas en el package.json

```
npm install
```

Crear la carpeta build

```
npm run build
```

Inicial servidor del frontend

```
npm start
```

Se ejecutará la aplicación en el modo de desarrollo, abra http://localhost:3000 para verlo en su navegador.

## Información extra

El fichero .env contiene todas las variables necesarias para que el proyecto funcione adecuadamente:

El SECRET KEY del proyecto de django:

```
SECRET_KEY='example-secret-key'
```

Poner el debug en False cuando ya este en producción:

```
DEBUG=True
```

Configuración del correo del proyecto que envía las notificaciones de autenticación:

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=example@gmail.com
EMAIL_HOST_PASSWORD=example-password
```

Url del Versat Erp donde se obtiene la información:

```
ERP_URL=http://example-versat-erp.cu
```

Credenciales del usuario seleccionado en el Versat Erp para hacer la autenticación:

```
ERP_USERNAME=implantadora
ERP_PASSWORD=M*123456.m
```

Tiempo que toma la web del Comercializador en verificar la autenticación con el Versat Erp:

```
ERP_TIME_MINUTES_AUTHENTICATED=10
```

- Versión de Python: 3.8.2
- Para hacer pruebas con la base de datos db.sqlite3 utilizar las credenciales user: comercializador y password: A*123456

## Enlaces Útiles

- Django: https://www.djangoproject.com/
- Django REST framework: https://www.django-rest-framework.org/
- Simple JWT: https://django-rest-framework-simplejwt.readthedocs.io/en/latest/index.html
- React JS: https://es.reactjs.org/
- React Router: https://reactrouter.com/en/main
- RSuite JS: https://rsuitejs.com/
