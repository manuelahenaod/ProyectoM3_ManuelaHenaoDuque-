# 🛢️ ComicSansCon
ComicSansCon es una agencia digital especializada en el desarrollo de experiencias interactivas inspiradas en la cultura pop, incluyendo videojuegos, películas y series de televisión. Su enfoque se centra en crear productos innovadores que conecten emocionalmente con los fans, combinando diseño, tecnología y narrativa para ofrecer experiencias inmersivas y entretenidas.
En esta SPA puedes conversar con los personajes más queridos de **El Chavo del 8**, cada uno impulsado por inteligencia artificial con su propia personalidad y forma de hablar.

🔗 **App desplegada:** [https://proyecto-m3-manuela-henao.vercel.app/](https://proyecto-m3-manuela-henao.vercel.app/)

---

## Personajes

### La vecindad del Chavo del 8
La vecindad del Chavo del 8 es una serie de televisión mexicana. Es una comedia que sigue la vida cotidiana de un grupo de vecinos que viven en un mismo patio, mostrando sus interacciones, conflictos y momentos divertidos. Y estos son algunos de sus personajes principales:

### El Chavo
El Chavo es un niño inocente que vive en un barril dentro de la vecindad. Su visión del mundo es simple, literal y llena de confusión, lo que genera situaciones tan graciosas como entrañables.

#### Personalidad implementada

- Inocente y literal: interpreta todo al pie de la letra, incluso expresiones comunes.
- Distraído: pierde fácilmente el hilo de la conversación o se olvida de lo que iba a decir.
- Emocional: puede pasar de reír a llorar rápidamente.
- Amante de la comida: especialmente de las tortas de jamón.
- Lenguaje imperfecto: comete errores al hablar sin darse cuenta.

### La Chilindrina
La Chilindrina es la niña más astuta de la vecindad. Inteligente, curiosa y algo manipuladora, sabe cómo salirse con la suya, aunque en el fondo es leal a sus amigos.

#### Personalidad implementada

- Pícara y sarcástica: comenta con ironía y humor.
- Curiosa: siempre quiere saber todo lo que pasa.
- Dramática: exagera situaciones y puede hacerse la víctima.
- Inteligente: entiende más que los demás, pero lo usa a su favor.
- Chismosa: convierte cualquier tema en conversación de vecindad.

### Quico
Quico es el niño más consentido de la vecindad. Vive orgulloso de lo que tiene y no pierde oportunidad para presumirlo, aunque en el fondo busca la aprobación de los demás.

#### Personalidad implementada

- Egocéntrico: cree que todo lo suyo es lo mejor.
- Presumido: exagera constantemente sus posesiones.
- Dramático: se enoja fácilmente y amenaza con su mamá.
- Celoso: le cuesta aceptar cuando alguien tiene algo mejor.
- Dependiente: menciona frecuentemente a su mamá.

---

## Capturas de pantalla


| Inicio | Chat | Acerca de |
|--------|------|-----------|
| ![Home](./screenshots/home.png) | ![Chat](./screenshots/chat.png) | ![About](./screenshots/about.png) |

---

## Requisitos

- Node.js 18+
- Cuenta en [Google AI Studio](https://aistudio.google.com/) para obtener una `GEMINI_API_KEY`
- [Vercel CLI](https://vercel.com/docs/cli) instalado globalmente

```bash
npm install -g vercel
```

---

##  Ejecutar en local

### 1. Clonar el repositorio

```bash
git clone https://github.com/manuelahenaod/ProyectoM3_ManuelaHenaoDuque-.git
cd ProyectoM3_ManuelaHenaoDuque-
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
GEMINI_API_KEY=tu_api_key_aqui
```

> Obtén tu API key gratis en [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

### 4. Ejecutar en local

```bash
vercel dev
```

La app estará disponible en [http://localhost:3000](http://localhost:3000)

---

## 🧪 Ejecutar tests

```bash
npm run test
```

---

## Desplegar a Vercel

### 1. Subir el proyecto a GitHub
### 2. Crear cuenta en Vercel
        -Ve a https://vercel.com
        -Inicia sesión con tu cuenta de GitHub
### 3. Importar el proyecto
       - En el dashboard de Vercel, haz clic en "Add New Project"
       - Selecciona tu repositorio de GitHub
       - Haz clic en "Import"
### 4. Configurar el proyecto
       - Framework: selecciona Other
       - Build command: déjalo vacío
       - Output directory: ./ 
### 5. Configurar variables de entorno
       - Ve a Settings → Environment Variables
       - Agrega GEMINI_API_KEY
       - Seleccionar "Sensitive"
### 6. Deploy
       - Haz clic en Deploy
       - Espera a que termine el proceso
       - Vercel te dará una URL pública (ej: https://tu-app.vercel.app)

> **Importante:** asegúrate de configurar `GEMINI_API_KEY` en *Settings → Environment Variables* dentro de tu proyecto en Vercel.

## Estructura del proyecto

```bash
ProyectoM3/
│
├── api/
│   └── functions.js      # Serverless Function (proxy seguro a la API de IA)
│                          # Maneja API key y system prompts
│
├── css/                  # Estilos modulares (arquitectura por componentes)
│   ├── about.css
│   ├── base.css
│   ├── character-card.css
│   ├── chat.css
│   ├── footer.css
│   ├── home.css
│   ├── navbar.css
│   ├── not-found.css
│   ├── reset.css
│   ├── responsive.css    # Breakpoints (tablet/ desktop)
│   └── variables.css     # Variables CSS (colores)
│
├── images/               # Assets e imágenes del proyecto
│
├── screenshots/          # Capturas de pantalla (README / demo)
│
├── tests/                # Testing con Vitest
│   ├── app.test.js       # Tests de integración (fetch mockeado)
│   └── utils.test.js     # Tests de funciones puras
│
├── app.js                # Router SPA (History API) + renderizado
├── chat.js               # Lógica del chat + comunicación con backend
├── utils.js              # Funciones puras 
│
├── index.html            # Shell de la SPA (render en #app)
│
├── .env                  # Variables de entorno (NO subir)
├── .env.example          # Template de variables
├── .gitignore            # Exclusiones (node_modules, .env, etc.)
│
├── package.json          # Scripts y dependencias
├── package-lock.json
├── vitest.config.js      # Configuración de tests
│
├── vercel.json           # Rewrites para SPA routing
│
└── README.md             # Documentación del proyecto
```



---

## Registro de uso de IA


---

## Stack técnico

| Tecnología | Uso |
|-----------|-----|
| HTML + CSS | Estructura y estilos mobile-first |
| Flexbox + Grid / Media queries| Layout |
| History API | Router SPA |
| Google Gemini API | Motor de conversación con IA |
| Vercel Serverless Functions | Backend para llamadas a la API |
| Vercel | Hosting y despliegue |
| Vitest + vi.fn() | Unit testing |

