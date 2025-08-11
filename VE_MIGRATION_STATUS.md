## Vanilla-extract migration status (src/components)

- **migrated**: 5
- **not migrated**: 11
- **partial**: 0

### Checklist

- **Migrated**
  - [x] `toggle-button`
  - [x] `elements/list`
  - [x] `timeline-elements/fullscreen-button`
  - [x] `elements/popover`
  - [x] `toolbar`

- **Not migrated yet**
  - [ ] `timeline`
  - [ ] `timeline-horizontal`
  - [ ] `timeline-vertical`
  - [ ] `timeline-elements/timeline-card`
  - [ ] `timeline-elements/timeline-card-content`
  - [ ] `timeline-elements/timeline-card-media`
  - [ ] `timeline-elements/timeline-control`
  - [ ] `timeline-elements/timeline-controls-wrapper`
  - [ ] `timeline-elements/timeline-item-title`
  - [ ] `timeline-elements/timeline-outline`
  - [ ] `components/common/styles` (shared styled mixins)

### Conventions

- Mark a directory as migrated when:
  - Styled-components usage is removed from that component directory, and
  - A `*.css.ts` (and/or `*.recipe.ts`) is present and used by the component.
- Mark as partial if both styled-components and vanilla-extract coexist for that component.

### Useful commands

- Find styled-components usage under components:
  ```bash
  rg "from 'styled-components'|from \"styled-components\"" src/components -n
  ```
- Find vanilla-extract style modules under components:
  ```bash
  rg "@vanilla-extract" src/components -n
  ```


