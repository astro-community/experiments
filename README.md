# Astro Experiments

A collection of experimental Astro components and tooling.
 
## Usage

```astro
---
import { As } from '@astropub/experiments'
import { AsProxy } from '@astropub/experiments'
import { ShadowRoot } from '@astropub/experiments'
---
```

- **[Poly](#Poly)**
- **[PolyProxy](#PolyProxy)**
- **[ShadowRoot](#ShadowRoot)**

---

## Experiments



### Poly

The `Poly` component generates any type of element from an `as` attribute.

#### Poly Usage

```astro
---
import { Poly } from '@astropub/experiments'
---
<Poly as="h1">
  <!-- renders within `<h1>` -->
</Poly>
```

```astro
---
import { Poly } from '@astropub/experiments'
---
<Poly as="custom-element">
  <!-- renders within `<custom-element>` -->
</Poly>
```

<br />



### PolyProxy

The `PolyProxy` component generates any type of element using dot syntax.

#### PolyProxy Usage

```astro
---
import { PolyProxy } from '@astropub/experiments'
---
<PolyProxy.h1>
  <!-- renders within `<h1>` -->
</PolyProxy.h1>
```

```astro
---
import { PolyProxy } from '@astropub/experiments'
---
<PolyProxy.CustomElement>
  <!-- renders within `<custom-element>` -->
</PolyProxy>
```

<br />

### ShadowRoot

The `ShadowRoot` component generates a `<template shadowroot="open">` wrapper.

#### ShadowRoot Usage

```astro
---
import { ShadowRoot } from '@astropub/experiments'
---
<custom-tabs>
  <ShadowRoot>
    <!-- renders within `<template shadowroot="open">` -->
    <!-- anything here renders within an open shadow dom -->
  </ShadowRoot>
</custom-tabs>
```

```astro
---
import { ShadowRoot } from '@astropub/experiments'
---
<custom-tabs>
  <ShadowRoot closed>
    <!-- renders within `<template shadowroot="closed">` -->
    <!-- anything here renders within a closed shadow dom -->
  </ShadowRoot>
</custom-tabs>
```
