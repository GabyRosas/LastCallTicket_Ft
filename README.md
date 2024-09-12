# Last Call Ticket : ![logomini](https://github.com/user-attachments/assets/d715c006-d58a-4706-94f5-5559dca82c2f)


## Índice

- [Proyecto](#proyecto)
    - [Requisitos previos](#requisitos-previos)
- [Diagramas](#diagramas-)
    - [Diagrama de flujo](#diagrama-de-flujo)
    - [Diagrama de datos](#diagrama-de-datos)
- [Instalación](#instalación)
    - [Requerimientos](#requerimientos)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Tecnologías](#tecnologías)
- [Uso](#uso)
- [Contribución](#contribución)
- [Desarrolladores](#desarrolladores)
- [Demo](#demo)

## Proyecto 

En la actualidad el precio de los costos de transporte se han reducido, pero con ello se han incrementado las restricciones a la hora de modificar los boletos. En los casos donde un usuario por alguna razón no puede realizar su viaje, las compañías de transporte no les permite un reembolso lo que conlleva a la pérdida tanto del viaje como el costo del boleto.
Esta aplicación tiene la finalidad de ayudar a estos usuarios a recuperar un porcentaje del costo del ticket para no tener una pérdida total. Al mismo tiempo permite a otros viajeros obtener un boleto más económico que el precio actual. Esta aplicación pondrá en contacto estos usuarios para realizar la transacción.

El backend está desarrollado en Python utilizando Django y Django REST Framework, con una base de datos PostgreSQL, mientras que el frontend está planeado para desarrollarse con tecnologías web como React y Tailwind CSS.

### Requisitos previos

**Funcionalidades**
- Registro de usuarios y autenticación.
- Creación de boletos.
- Edición de boletos
- Consultación de boletos
- Visualización de detalles de boletos
- Contactar al usuario mediante una Apps externa.

## Diagramas

### Workflow

[Ver workflow](#) *(https://drive.google.com/file/d/1mTCRFqmTulP77HtNCvABib0hpjCstS6j/view)*

### Diagrama de datos

La base de datos ha sido diseñada para soportar la funcionalidad de la app, con tablas normalizadas para usuarios, boletos, transporte.

![image](https://github.com/user-attachments/assets/f41c29a5-c173-4111-833b-612e3f603e3f)

## Instalación 🛠️

### Requerimientos

- [Python 3.x](https://www.python.org/downloads/)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Virtualenv](https://virtualenv.pypa.io/en/latest/)
- [Git](https://git-scm.com/)

1. Clona el repositorio del backend:

    ```bash
    git clone https://github.com/tu-usuario/trip_planner_back
    ```

2. Crea y activa un entorno virtual:

    ```bash
    cd trip_planner_back
    python -m venv env
    source env/bin/activate  # En Windows usa: env\Scripts\activate
    ```

3. Instala las dependencias:

    ```bash
    pip install -r requirements.txt
    ```

4. Configura tu base de datos PostgreSQL y añade las credenciales en el archivo `settings.py` de Django.

5. Realiza las migraciones y corre el servidor:

    ```bash
   python manage.py makemigrations
    python manage.py migrate
    python manage.py runserver
    ```

## Estructura del proyecto

El proyecto sigue una estructura común para aplicaciones Django(backend), con la API organizada en diferentes módulos para una gestión eficiente
y una estructura React (frontend) lo que facilita el mantenimiento y la evolución del proyecto. .

```plaintext
backend-repo/
├── lastcallticket_pj/         # Proyecto de Django
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│
│   ├── ticket_app/            # App relacionada con boletos
│   │   ├── migrations/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   ├── views.py
│   │   └── ...
│
│   ├── user_app/              # App relacionada con usuarios
│   │   └── ...
│
│   ├── manage.py              # Script de gestión de Django
│   ├── requirements.txt       # Dependencias del proyecto
│   ├── README.md              # Documentación del proyecto
└── ...

frontend-repo/
├── frontend/                  # Carpeta que contiene todo el código de React
│   ├── public/
│   │   ├── images/            # Carpeta que contiene todas las fotos e icons
│   │   │   └── vuelosfondo.png
│   │   └── ...
│
│   ├── src/                   # Código fuente de React
│   │   ├── components/        # Componentes de React
│   │   │   ├── footer/        # Footer.jsx
│   │   │   ├── login/         # LoginForm.jsx, Logout.jsx
│   │   │   ├── navbar/        # Navbar.jsx
│   │   │   ├── register/      # RegisterForm.jsx
│   │   │   ├── registerticket/# TicketCreate.jsx, TicketEdit.jsx
│   │   │   ├── search/        # ContactUser.jsx, SearchTickets.jsx, TicketDetail.jsx
│   │   ├── config/            # urls.js
│   │   ├── layout/            # Layout.jsx
│   │   ├── pages/             # Detail.jsx, Home.jsx, Login.jsx, Register.jsx, etc.
│   │   ├── router/            # index.jsx
│   │   ├── services/          # useApi.jsx
│   │   └── ...
│
│   ├── package.json           # Dependencias de frontend
│   ├── tailwind.config.js     # Configuración de Tailwind CSS
└── ...

```
## Tecnologías


**Backend**
- [Python](https://www.python.org/)
- [Django](https://docs.pytest.org/en/stable/)
- [Pytest](https://pytest-django.readthedocs.io/en/latest/)
- [Pytest-Django](https://www.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [psycopg2](https://pypi.org/project/psycopg2/) para la conexión con la base de datos PostgreSQL.
- [Postman](https://www.postman.com/) para probar el buen funcionamiento de las APIs

**Frontend** *(https://github.com/GabyRosas/trip_planner_front)*
- [React.js](https://reactjs.org/)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Axios](https://axios-http.com/es/docs/intro)
- [Tailwindcss](https://tailwindcss.com/)
- 

## Uso

Para iniciar la aplicación, primero asegúrate de que el servidor de backend esté corriendo:

```bash
python manage.py runserver
```

## Contribución 🤝

1. Haz un fork del repositorio.
2. Crea una nueva rama: 

   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y haz commit:
    ```bash
   git commit -m 'Agrega nueva funcionalidad'
   ```
4. Haz push de tu rama:  
    ```bash
   git push origin feature/nueva-funcionalidad
    ```
5. Crea un pull request.

## Desarrolladora 👩‍💻

- **Gabriela**(https://github.com/GabyRosas)
