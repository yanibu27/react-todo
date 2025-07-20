## fix pnpm install issue

```
mkdir -p ~/.local/share/pnpm
export PNPM_HOME="$HOME/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"
source ~/.zshrc  # or source ~/.bashrc depending on your shell
```

## Tailwind CSS and shadcn/ui changes


1. Correct Tailwind CSS Version

  pnpm add -D tailwindcss@^3.4.0 autoprefixer
  - Use v3, not v4 (v4 is experimental)

  2. Proper PostCSS Configuration (postcss.config.cjs)

  module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  };

  3. Complete Tailwind Config (tailwind.config.js)

  module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          background: 'hsl(var(--background))',
          foreground: 'hsl(var(--foreground))',
          // ... all the CSS custom property mappings
        },
      },
    },
  };

  4. CSS Variables Definition (src/index.css)

  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    // ... all required CSS variables
  }

  5. Restart Dev Server

  - After major Tailwind changes, always restart the dev server
  - This ensures CSS is regenerated with new configuration

  The key insight: Version compatibility matters - shadcn/ui
  works best with stable Tailwind v3, not experimental v4.


  ## Clean up dependencies:
  ```
  pnpm dlx depcheck
  rm -rf node_modules
  rm -f pnpm-lock.yaml
  pnpm install
  pnpm prune #This command removes extraneous packages not listed in package.json.
```


