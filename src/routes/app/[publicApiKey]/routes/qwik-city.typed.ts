import {
  type QRL,
  type ValueOrPromise,
  implicit$FirstArg,
} from "@builder.io/qwik";
import * as qwikCity from "@builder.io/qwik-city";

export interface RouteRequestEventLoader<PARAMS>
  extends Omit<qwikCity.RequestEventLoader, "params"> {
  readonly params: PARAMS;
}

export interface LoaderConstructorQRL<PARAMS> {
  <O>(
    loaderQrl: QRL<
      (event: RouteRequestEventLoader<PARAMS>) => ValueOrPromise<O>
    >
  ): qwikCity.Loader<O>;
}

export const routeLoaderQrl =
  qwikCity.routeLoader$ as unknown as LoaderConstructorQRL<{
    publicApiKey: string;
  }>;
export const routeLoader$ = implicit$FirstArg(routeLoaderQrl);
