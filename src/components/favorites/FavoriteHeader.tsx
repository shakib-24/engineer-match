import { FAVORITES_PAGE } from "@/constants/favorites";

export function FavoriteHeader() {
  return (
    <div>
      <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {FAVORITES_PAGE.title}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {FAVORITES_PAGE.description}
      </p>
    </div>
  );
}
