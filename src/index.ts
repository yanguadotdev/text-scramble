interface ScrambleTextConfig {
  solveTime: number;
  characterTime: number;
  delayTime: number;
  characters: string;
  triggers: string[];
}

class ScrambleText extends HTMLElement {
  private config: ScrambleTextConfig;
  private isActive: boolean = false;
  private observer: IntersectionObserver | null = null;
  private originalText: string = '';

  constructor() {
    super();

    this.config = this.getConfigFromAttributes();
    this.originalText = this.innerText || '';
  }

  static get observedAttributes(): string[] {
    return [
      'trigger',
      'solve-time',
      'character-time',
      'delay-time',
      'characters'
    ];
  }

  connectedCallback(): void {
    this.setupTriggers();
  }

  disconnectedCallback(): void {
    this.cleanup();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue !== newValue) {
      this.config = this.getConfigFromAttributes();
      this.cleanup();
      this.setupTriggers();
    }
  }

  private getConfigFromAttributes(): ScrambleTextConfig {
    const triggers = this.getAttribute('trigger')?.split(',').map(t => t.trim()) || ['hover'];

    return {
      solveTime: parseInt(this.getAttribute('solve-time') || '800'),
      characterTime: parseInt(this.getAttribute('character-time') || '40'),
      delayTime: parseInt(this.getAttribute('delay-time') || '50'),
      characters: this.getAttribute('characters') || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890*#@/*!%&^',
      triggers
    };
  }

  private setupTriggers(): void {
    this.config.triggers.forEach(trigger => {
      switch (trigger.toLowerCase()) {
        case 'hover':
          this.addEventListener('mouseenter', this.handleScramble);
          break;
        case 'click':
          this.addEventListener('click', this.handleScramble);
          break;
        case 'viewport':
          this.setupViewportObserver();
          break;
        case 'focus':
          this.setAttribute('tabindex', '0');
          this.addEventListener('focus', this.handleScramble);
          break;
      }
    });
  }

  private setupViewportObserver(): void {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !this.isActive) {
              this.scrambleText();
            }
          });
        },
        { threshold: 0.1 }
      );
      this.observer.observe(this);
    }
  }

  private cleanup(): void {
    // Remover event listeners
    this.removeEventListener('mouseenter', this.handleScramble);
    this.removeEventListener('click', this.handleScramble);
    this.removeEventListener('focus', this.handleScramble);

    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  private handleScramble = (event: Event): void => {
    event.preventDefault();
    this.scrambleText();
  }

  private scrambleText(): void {
    if (this.isActive) return;

    let delay = 0;
    const elementText = this.originalText;
    const elementCharacters = [...elementText];
    const lockTime = this.config.delayTime * elementCharacters.length + this.config.solveTime;

    // Array para mantener el estado actual de cada carácter
    const currentText = [...elementText];

    this.isActive = true;
    this.classList.add('scrambling');

    // Remover la clase y resetear el estado después del tiempo total
    setTimeout(() => {
      this.isActive = false;
      this.classList.remove('scrambling');
      this.textContent = this.originalText; // Asegurar que el texto final sea el correcto
    }, lockTime);

    elementCharacters.forEach((character, index) => {
      setTimeout(() => {
        if (!this.isActive) return; // Verificar si aún está activo

        const intervalId = setInterval(() => {
          if (!this.isActive) {
            clearInterval(intervalId);
            return;
          }

          // Solo scramble si el caracter no es un espacio
          if (character !== ' ') {
            const randomCharacter = this.getRandomCharacter();
            currentText[index] = randomCharacter;
            this.textContent = currentText.join('');
          }

          // Resolver el caracter después del tiempo configurado
          setTimeout(() => {
            clearInterval(intervalId);
            if (this.isActive) {
              currentText[index] = elementCharacters[index];
              this.textContent = currentText.join('');
            }
          }, this.config.solveTime);
        }, this.config.characterTime);
      }, delay === 0 ? (delay += 1) : (delay += this.config.delayTime));
    });
  }

  private getRandomCharacter(): string {
    const chars = [...this.config.characters];
    return chars[Math.floor(Math.random() * chars.length)];
  }

  // Método público para activar el efecto programáticamente
  public scramble(): void {
    this.scrambleText();
  }
}

// Registrar el web component
if (!customElements.get('scramble-text')) {
  customElements.define('scramble-text', ScrambleText);
}

export default ScrambleText;