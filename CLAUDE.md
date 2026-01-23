# Fashion

A Next.js fashion app.

---

## Project Guidelines

### Mobile-First Design
- Design for mobile screens first, then scale up.
- All components must be fully responsive.

---

### SEO Priority
- Optimize all pages for search engines from the start.
- Use semantic HTML and proper heading structure.
- Ensure fast load times and excellent Core Web Vitals.
- Implement dynamic and static metadata using Next.js SEO features.
- Use descriptive URLs, alt text for images, and structured data where applicable.

---

### Theming & Customization
- Use CSS variables for colors, spacing, and typography.
- Make themes easy to swap, extend, and customize.

---

### Testing
- Any reusable code must include unit tests.
- Prioritize testability when designing components and utilities.

---

### Localization & Accessibility
- All user-facing text must be internationalized.
- Use translation keys instead of hardcoded strings.
- Support RTL layouts (e.g., Arabic).

---

## Dependency Management

Minimize the use of external JavaScript libraries to:

- Reduce bundle size and improve performance.
- Lower the risk of security vulnerabilities.

---

### Adding New Libraries
- Approval from the tech lead is required before introducing any new library.
- Clearly explain:
  - Why the library is needed
  - What problem it solves

---

### Implementation Strategy
- Wrap third-party libraries using:
  - A [Façade pattern](https://en.wikipedia.org/wiki/Facade_pattern) or
  - An [Adapter pattern](https://en.wikipedia.org/wiki/Adapter_pattern)
- Write modular, replaceable code so dependencies can be swapped easily.