# Design Document - Xavier Hipnose Website Redesign

## Overview

Este documento detalha o design para transformar o site Xavier Hipnose em uma aplicação web profissional com navegação por abas, arquitetura modular e design único que se afasta da aparência genérica de templates de IA.

## Architecture

### Component Structure
```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── TabNavigation.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── HypnotherapySection.tsx
│   │   ├── ContactSection.tsx
│   │   └── FAQSection.tsx
│   ├── ui/
│   │   ├── Card.tsx
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   └── AnimatedSection.tsx
│   └── features/
│       ├── AIAssistant.tsx
│       └── ContactForm.tsx
├── hooks/
│   ├── useActiveTab.ts
│   ├── useScrollSpy.ts
│   └── useAnimations.ts
├── styles/
│   ├── globals.css
│   └── components.css
└── types/
    └── index.ts
```

### Tab Navigation System
- **Primary Navigation**: Abas horizontais fixas no topo
- **Active State Management**: Hook customizado para gerenciar aba ativa
- **Scroll Spy**: Sincronização automática entre scroll e aba ativa
- **Mobile Adaptation**: Menu hambúrguer com drawer lateral

## Components and Interfaces

### TabNavigation Component
```typescript
interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href: string;
}
```

### Section Components
Cada seção será um componente independente com:
- Props tipadas para configuração
- Animações de entrada
- Responsive design
- Lazy loading quando apropriado

### UI Components
- **Card**: Container reutilizável com variações de estilo
- **Button**: Componente de botão com múltiplas variantes
- **AnimatedSection**: Wrapper para animações de scroll

## Data Models

### Site Configuration
```typescript
interface SiteConfig {
  branding: {
    name: string;
    logo: string;
    colors: ColorPalette;
  };
  contact: {
    whatsapp: string;
    email: string;
    address: string;
  };
  content: {
    hero: HeroContent;
    services: Service[];
    about: AboutContent;
    faqs: FAQ[];
  };
}

interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
}
```

## Design System

### Color Palette (Refined)
```css
:root {
  /* Primary Colors */
  --color-primary: #0a0f1c;
  --color-primary-light: #1e293b;
  --color-secondary: #f59e0b;
  --color-secondary-light: #fbbf24;
  
  /* Accent Colors */
  --color-accent-blue: #3b82f6;
  --color-accent-purple: #8b5cf6;
  --color-accent-teal: #14b8a6;
  
  /* Neutral Colors */
  --color-background: #fefefe;
  --color-surface: #ffffff;
  --color-surface-elevated: #f8fafc;
  --color-border: #e2e8f0;
  --color-border-light: #f1f5f9;
  
  /* Text Colors */
  --color-text-primary: #0f172a;
  --color-text-secondary: #475569;
  --color-text-muted: #64748b;
  --color-text-inverse: #ffffff;
}
```

### Typography Scale
```css
:root {
  /* Font Families */
  --font-primary: 'Inter', system-ui, sans-serif;
  --font-heading: 'Playfair Display', serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Font Sizes */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-6xl: 3.75rem;
}
```

### Spacing System
```css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;
}
```

## Visual Design Elements

### Custom Gradients
```css
.gradient-hero {
  background: linear-gradient(135deg, 
    var(--color-primary) 0%, 
    var(--color-primary-light) 50%, 
    var(--color-accent-blue) 100%);
}

.gradient-card {
  background: linear-gradient(145deg, 
    var(--color-surface) 0%, 
    var(--color-surface-elevated) 100%);
}
```

### Shadow System
```css
:root {
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
}
```

### Border Radius System
```css
:root {
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  --radius-full: 9999px;
}
```

## Animation System

### Transition Presets
```css
:root {
  --transition-fast: 150ms ease-out;
  --transition-normal: 250ms ease-out;
  --transition-slow: 350ms ease-out;
  --transition-bounce: 250ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### Animation Classes
```css
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out forwards;
}

.animate-scale-in {
  animation: scaleIn 0.4s ease-out forwards;
}
```

## Responsive Design Strategy

### Breakpoints
```css
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

### Mobile-First Approach
- Base styles para mobile
- Progressive enhancement para telas maiores
- Touch-friendly interactions
- Optimized font sizes e spacing

## Performance Optimizations

### Code Splitting
- Lazy loading de seções não críticas
- Dynamic imports para componentes pesados
- Separate bundles para features opcionais

### Image Optimization
- WebP format com fallback
- Responsive images com srcset
- Lazy loading com intersection observer

### CSS Optimization
- CSS-in-JS com styled-components ou emotion
- Critical CSS inlined
- Unused CSS removal

## Error Handling

### Error Boundaries
- Componente ErrorBoundary para capturar erros React
- Fallback UI para componentes que falharam
- Error reporting para monitoramento

### Form Validation
- Validação client-side em tempo real
- Mensagens de erro claras e contextuais
- Estados de loading e sucesso

### Network Errors
- Retry logic para requests falhados
- Offline detection e messaging
- Graceful degradation para funcionalidades

## Testing Strategy

### Unit Testing
- Jest + React Testing Library
- Testes para hooks customizados
- Snapshot testing para componentes UI

### Integration Testing
- Testes de fluxo completo
- Interação entre componentes
- Form submission e navigation

### E2E Testing
- Cypress para testes end-to-end
- Cenários críticos de usuário
- Cross-browser testing

## Accessibility

### WCAG Compliance
- Semantic HTML structure
- ARIA labels e roles
- Keyboard navigation support
- Screen reader compatibility

### Color Contrast
- Minimum 4.5:1 ratio para texto normal
- Minimum 3:1 ratio para texto grande
- Color-blind friendly palette

### Focus Management
- Visible focus indicators
- Logical tab order
- Skip links para navegação