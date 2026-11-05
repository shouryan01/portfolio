export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Editorial Hero */}
      <section className="space-y-6 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-border bg-surface-muted text-xs font-mono text-text-secondary">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>System Initialized • S-129</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-text-primary leading-[1.12]">
          Engineering craft with an <em className="italic font-normal">editorial</em> lens.
        </h1>

        <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-sans">
          Building thoughtful software and digital interfaces. This foundation pairs high-speed
          modern tooling with timeless typography and quiet contrast principles.
        </p>
      </section>

      {/* Design System Foundations Section */}
      <section className="space-y-6 pt-4 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h2 className="font-serif text-2xl tracking-tight text-text-primary">
            Design Tokens & Engine
          </h2>
          <span className="font-mono text-xs text-text-tertiary">
            Tailwind CSS v4 • CSS Variables
          </span>
        </div>

        {/* Color Palette Tokens Preview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-lg border border-border bg-surface-elevated space-y-2">
            <div className="h-6 w-full rounded border border-border bg-background" />
            <div className="space-y-0.5">
              <p className="font-mono text-xs text-text-primary font-medium">Background</p>
              <p className="font-mono text-[11px] text-text-tertiary">var(--background)</p>
            </div>
          </div>

          <div className="p-3.5 rounded-lg border border-border bg-surface-elevated space-y-2">
            <div className="h-6 w-full rounded border border-border bg-surface-muted" />
            <div className="space-y-0.5">
              <p className="font-mono text-xs text-text-primary font-medium">Surface Muted</p>
              <p className="font-mono text-[11px] text-text-tertiary">var(--surface-muted)</p>
            </div>
          </div>

          <div className="p-3.5 rounded-lg border border-border bg-surface-elevated space-y-2">
            <div className="h-6 w-full rounded border border-border bg-surface-subtle" />
            <div className="space-y-0.5">
              <p className="font-mono text-xs text-text-primary font-medium">Surface Subtle</p>
              <p className="font-mono text-[11px] text-text-tertiary">var(--surface-subtle)</p>
            </div>
          </div>

          <div className="p-3.5 rounded-lg border border-border bg-surface-elevated space-y-2">
            <div className="h-6 w-full rounded bg-accent" />
            <div className="space-y-0.5">
              <p className="font-mono text-xs text-text-primary font-medium">Accent</p>
              <p className="font-mono text-[11px] text-text-tertiary">var(--accent)</p>
            </div>
          </div>
        </div>

        {/* Typography Hierarchy Showcase */}
        <div className="p-6 rounded-lg border border-border bg-surface-elevated space-y-5">
          <div className="space-y-1">
            <span className="font-mono text-[11px] uppercase tracking-wider text-text-tertiary">
              Typography Token: Editorial Serif (Newsreader)
            </span>
            <p className="font-serif text-2xl text-text-primary italic">
              &ldquo;Simplicity is about subtracting the obvious and adding the meaningful.&rdquo;
            </p>
          </div>

          <div className="space-y-1 pt-3 border-t border-border/60">
            <span className="font-mono text-[11px] uppercase tracking-wider text-text-tertiary">
              Typography Token: Geometric Sans (Plus Jakarta Sans)
            </span>
            <p className="font-sans text-sm text-text-secondary leading-relaxed">
              Designed for optimal UI clarity, structured reading rhythms, and high legibility
              across light and dark display environments.
            </p>
          </div>

          <div className="space-y-1 pt-3 border-t border-border/60">
            <span className="font-mono text-[11px] uppercase tracking-wider text-text-tertiary">
              Typography Token: Code Monospace (JetBrains Mono)
            </span>
            <p className="font-mono text-xs text-text-secondary">
              const toolchain = [&quot;oxlint&quot;, &quot;oxfmt&quot;, &quot;next-16&quot;,
              &quot;react-19&quot;];
            </p>
          </div>
        </div>
      </section>

      {/* Developer Toolchain Verification */}
      <section className="space-y-4 pt-4 border-t border-border">
        <h2 className="font-serif text-xl tracking-tight text-text-primary">Core Foundation</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border border-border bg-surface-elevated">
            <div className="font-mono text-xs text-text-tertiary mb-1">Framework</div>
            <div className="font-sans font-medium text-text-primary">Next.js 16 + React 19</div>
            <div className="text-xs text-text-secondary mt-1">App Router with Turbopack</div>
          </div>

          <div className="p-4 rounded-lg border border-border bg-surface-elevated">
            <div className="font-mono text-xs text-text-tertiary mb-1">Styling Engine</div>
            <div className="font-sans font-medium text-text-primary">Tailwind CSS v4</div>
            <div className="text-xs text-text-secondary mt-1">CSS variables & theme tokens</div>
          </div>

          <div className="p-4 rounded-lg border border-border bg-surface-elevated">
            <div className="font-mono text-xs text-text-tertiary mb-1">Developer Toolchain</div>
            <div className="font-sans font-medium text-text-primary">Oxlint & Oxfmt</div>
            <div className="text-xs text-text-secondary mt-1">
              Rust-powered linting & formatting
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
