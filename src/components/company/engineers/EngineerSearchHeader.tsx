import { ENGINEERS_PAGE } from "@/constants/company-engineers";

export function EngineerSearchHeader() {
  return (
    <div>
      <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {ENGINEERS_PAGE.title}
      </h2>
      <p className="mt-1 text-sm whitespace-pre-line text-muted-foreground">
        {ENGINEERS_PAGE.description}
      </p>
    </div>
  );
}
