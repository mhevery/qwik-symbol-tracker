// RUU -> Real User Usage
export interface RUU {
  routes: Record<string, RouteStats>;
}

export interface RouteStats {
  route: string;
  symbolStats: Record<string, RouteSymbolStats>;
}

export interface RouteSymbolStats {
  symbol: string;
  count: number;
}
