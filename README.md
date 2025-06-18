# 🔀 Scramble Text Web Component

Un elegante web component que crea efectos de texto "scramble" o "matriz" con configuración completa y múltiples triggers de activación.

## ✨ Características

- 🎯 **Múltiples triggers**: hover, click, viewport, focus
- ⚙️ **Totalmente configurable** desde atributos HTML
- 🚫 **Sin Shadow DOM** - hereda estilos del documento
- 📦 **TypeScript nativo** - completamente tipado
- 🪶 **Ligero** - sin dependencias externas
- 🔧 **Control programático** - API JavaScript disponible
- 🌐 **Soporte universal** - funciona en todos los navegadores modernos
- ♿ **Accesible** - soporte para navegación por teclado

## 🚀 Instalación

```bash
npm install text-scramble
```

## 📖 Uso Básico

### Importación

```javascript
// ES6 Module
import 'text-scramble';

// CommonJS
require('text-scramble');
```

### HTML

```html
<!-- Uso básico -->
<text-scramble>Hola Mundo</text-scramble>

<!-- Con trigger personalizado -->
<text-scramble trigger="click">Haz click aquí</text-scramble>

<!-- Configuración completa -->
<text-scramble 
    trigger="hover,viewport" 
    solve-time="1000" 
    character-time="60" 
    delay-time="80"
    characters="01★☆">
    EFECTO PERSONALIZADO
</text-scramble>
```

## 🎛️ Atributos de Configuración

| Atributo | Tipo | Valor por defecto | Descripción |
|----------|------|-------------------|-------------|
| `trigger` | `string` | `"hover"` | Eventos que activan el efecto |
| `solve-time` | `number` | `800` | Tiempo (ms) para resolver cada carácter |
| `character-time` | `number` | `40` | Velocidad (ms) de cambio de caracteres aleatorios |
| `delay-time` | `number` | `50` | Retraso (ms) entre el inicio de cada carácter |
| `characters` | `string` | `"ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890*#@/*!%&^"` | Caracteres aleatorios a usar |

### Triggers Disponibles

- `hover` - Se activa al pasar el mouse (por defecto)
- `click` - Se activa al hacer click
- `viewport` - Se activa al entrar en el viewport
- `focus` - Se activa al recibir focus (útil para accesibilidad)

**Múltiples triggers**: Separa con comas para combinar: `trigger="hover,click,viewport"`

## 🎨 Ejemplos

### Efecto Matriz (Película)
```html
<text-scramble 
    trigger="viewport" 
    characters="01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
    solve-time="1200"
    character-time="80">
    DIGITAL RAIN
</text-scramble>
```

### Efecto Hacker
```html
<text-scramble 
    trigger="hover" 
    characters="01"
    solve-time="600"
    character-time="30"
    delay-time="20">
    ACCESO CONCEDIDO
</text-scramble>
```

### Efecto Glitch
```html
<text-scramble 
    trigger="click" 
    characters="!@#$%^&*()_+-=[]{}|;:,.<>?"
    solve-time="400"
    character-time="20">
    SISTEMA CORRUPTO
</text-scramble>
```

### Efecto Suave
```html
<text-scramble 
    trigger="viewport" 
    characters="abcdefghijklmnopqrstuvwxyz"
    solve-time="1000"
    character-time="60"
    delay-time="100">
    transición elegante
</text-scramble>
```

## 🔧 API JavaScript

### Método `scramble()`

Puedes activar el efecto programáticamente:

```javascript
const element = document.querySelector('text-scramble');
element.scramble();
```

### Ejemplo de Control Programático

```html
<text-scramble id="manual-control" trigger="">
    Control Manual
</text-scramble>

<button onclick="document.getElementById('manual-control').scramble()">
    Activar Efecto
</button>
```

## 🎯 Casos de Uso

### Landing Pages
```html
<text-scramble trigger="viewport" class="hero-title">
    BIENVENIDO AL FUTURO
</text-scramble>
```

### Botones Interactivos
```html
<text-scramble 
    trigger="hover" 
    solve-time="300" 
    class="btn btn-primary">
    DESCARGAR AHORA
</text-scramble>
```

### Navegación
```html
<nav>
    <text-scramble trigger="hover">Inicio</text-scramble>
    <text-scramble trigger="hover">Servicios</text-scramble>
    <text-scramble trigger="hover">Contacto</text-scramble>
</nav>
```

### Formularios
```html
<text-scramble 
    trigger="focus" 
    solve-time="200" 
    character-time="20">
    Tu Nombre
</text-scramble>
```

## 🎨 Estilos CSS

El componente **no usa Shadow DOM**, por lo que puedes aplicar estilos CSS normalmente:

```css
/* Estilos básicos */
text-scramble {
    font-family: 'Courier New', monospace;
    color: #00ff00;
    cursor: pointer;
    transition: all 0.3s ease;
}

/* Durante el efecto scramble */
text-scramble.scrambling {
    color: #ffff00;
    text-shadow: 0 0 10px currentColor;
}

/* Estados hover */
text-scramble:hover {
    background: rgba(0, 255, 0, 0.1);
}

/* Tema cyberpunk */
.cyberpunk text-scramble {
    color: #ff006f;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
}

/* Tema matriz */
.matrix text-scramble {
    color: #00ff41;
    background: #000;
    font-family: 'Courier New', monospace;
}
```

## 🔄 Actualizaciones Dinámicas

Los atributos se pueden cambiar dinámicamente:

```javascript
const element = document.querySelector('text-scramble');

// Cambiar trigger
element.setAttribute('trigger', 'click');

// Cambiar velocidad
element.setAttribute('solve-time', '1200');

// Cambiar caracteres
element.setAttribute('characters', '★☆♦♠♣♥');
```

## ⚡ Rendimiento

- **Optimizado** para múltiples instancias
- **Gestión automática** de event listeners
- **Limpieza de memoria** al desmontar componentes
- **Intersection Observer** para triggers de viewport
- **Cancelación inteligente** de efectos superpuestos

## 🌐 Soporte de Navegadores

- Chrome/Edge 54+
- Firefox 63+
- Safari 10.1+
- Opera 41+

## 📱 Responsive Design

```css
/* Adapta el efecto a diferentes tamaños */
@media (max-width: 768px) {
    text-scramble {
        font-size: 0.9rem;
    }
}

@media (max-width: 480px) {
    text-scramble {
        font-size: 0.8rem;
        letter-spacing: 1px;
    }
}
```

## 📋 Changelog

### v1.0.0
- ✨ Lanzamiento inicial
- 🎯 Soporte para múltiples triggers
- ⚙️ Configuración completa via atributos
- 📦 TypeScript nativo

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! 

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

MIT License - ver el archivo [LICENSE](LICENSE) para más detalles.
---

**¿Te gusta este proyecto?** ⭐ ¡Dale una estrella en GitHub!

Creado con ❤️ por [Yangua Samir](https://github.com/yanguadotdev)