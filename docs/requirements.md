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

---

## API & Mocking Strategy

### Mock Service Worker (MSW)
- The app must use **MSW** to mock APIs for:
  - Local development
  - UI development before backend readiness
  - Automated tests
- Every UI screen must have a corresponding mocked API response.
- Mock handlers must reflect real backend contracts.

---

## Functional Requirements

### Categories & Navigation
- Categories must be **dynamic** and fetched from the backend.
- The app must support at least the following top-level categories:
  - Women
  - Men
  - Children’s Items
  - Accessories
  - Sports

#### Subcategories (Example: Men)
- Shirts
- Trousers
- Jeans
- Suits
- Shoes
- (Extendable and backend-driven)

---

### Products
Each product must include:
- Image(s)
- Title
- Description
- Price (if applicable)
- Category association
- **Dynamic attributes** based on category (e.g., size, color, material, fit, gender, season)

Attribute schemas must be:
- Defined by the backend
- Rendered dynamically in the UI
- Fully localizable

---

### Data Handling
- All category, product, and attribute data must be fetched from the backend (or MSW in dev/test).
- No hardcoded category or attribute structures are allowed.

---

### UI & UX Requirements
- Mobile-first, responsive layouts.
- Accessible components (ARIA, keyboard navigation).
- Support for RTL layouts and mirrored UI where applicable.
- Skeleton loaders and empty states must be implemented.

---

### Performance
- Use server components where possible.
- Optimize images with Next.js Image.
- Use caching, revalidation, and streaming appropriately.
- Avoid unnecessary client-side JavaScript.

---

### Security
- No sensitive data in client-side code.
- API communication must use secure methods.
- Follow best practices for authentication and authorization.

---

### Code Quality
- Follow established linting and formatting rules.
- Use TypeScript strictly.
- Ensure all reusable components and utilities are tested.
- Prefer composition over inheritance.
- Avoid unnecessary abstractions.

---

### Documentation
- All major modules must be documented.
- Public components and hooks must include usage examples.
- Update this document when requirements change.

---