import { SEARCH_HEADER } from "@/constants/jobs";

export function SearchHeader() {
  return (
    <div>
      <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {SEARCH_HEADER.title}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {SEARCH_HEADER.description}
      </p>
    </div>
  );
}
