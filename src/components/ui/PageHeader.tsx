interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#4338CA_0%,#4F46E5_45%,#6366F1_100%)] pt-32 pb-16 md:pt-40 md:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <h1 className="text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
