import { lazy } from "react";

export const LazyShop = lazy(() =>
    import("./Shop").then(({ Shop }) => ({ default: Shop }))
);