# Comercializador Web v1.0.0

Este proyecto es creado con las tecnologías [Django](https://www.djangoproject.com/) y [React JS](https://es.reactjs.org/)

## Tabla de Contenido

- [Desarrollo Local](#desarrollo-local)
  - [Pasos para instalar las dependencias e inicial el servidor del backend](#1---pasos-para-instalar-las-dependencias-e-inicial-el-servidor-del-backend)
  - [Pasos para instalar las dependencias e inicial el servidor del frontend](#2---pasos-para-instalar-las-dependencias-e-inicial-el-servidor-del-frontend)
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
python .\manage.py runserver --settings comercializador.settings.base
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

Inicial servidor del frontend

```
npm start
```

Se ejecutará la aplicación en el modo de desarrollo, abra http://localhost:3000 para verlo en su navegador.

## Enlaces Útiles

- Django: https://www.djangoproject.com/
- Django REST framework: https://www.django-rest-framework.org/
- Simple JWT: https://django-rest-framework-simplejwt.readthedocs.io/en/latest/index.html
- React JS: https://es.reactjs.org/
- React Router: https://reactrouter.com/en/main
- RSuite JS: https://rsuitejs.com/
