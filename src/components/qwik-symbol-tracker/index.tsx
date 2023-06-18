import { component$ } from "@builder.io/qwik";
import {
  type QSymbolBeacon,
  type QSymbolBeaconPayload,
} from "~/types/beacon-API";

export default component$<{ publicApiKey: string }>(({ publicApiKey }) => {
  return (
    <script
      dangerouslySetInnerHTML={`(${symbolTracker.toString()})(window, document, location, navigator, ${JSON.stringify(
        publicApiKey
      )})`}
    />
  );
});

interface QwikSymbolTrackerWindow {
  qSymbolTracker: {
    symbols: QSymbolBeacon[];
    sessionID: string;
    publicApiKey: string;
  };
}

interface QSymbolDetail {
  element: HTMLElement | null;
  reqTime: number;
  symbol: string;
}

function symbolTracker(
  window: QwikSymbolTrackerWindow,
  document: Document,
  location: Location,
  navigator: Navigator,
  publicApiKey: string
) {
  const sessionID = Math.random().toString(36).slice(2);
  const qSymbols: QSymbolBeacon[] = [];
  const existingSymbols: Set<string> = new Set();
  let flushSymbolIndex: number = 0;
  let lastReqTime: number = 0;
  window.qSymbolTracker = {
    symbols: qSymbols,
    publicApiKey,
    sessionID,
  };
  let timeoutID: ReturnType<typeof setTimeout> | null;
  function flush() {
    timeoutID = null;
    if (qSymbols.length > flushSymbolIndex) {
      const payload = {
        sessionID,
        publicApiKey,
        previousSymbol:
          flushSymbolIndex == 0 ? null : qSymbols[flushSymbolIndex - 1].symbol,
        symbols: qSymbols.slice(flushSymbolIndex),
      } satisfies QSymbolBeaconPayload;
      navigator.sendBeacon(
        `/api/v1/${publicApiKey}/beacon/`,
        JSON.stringify(payload)
      );
      flushSymbolIndex = qSymbols.length;
    }
  }
  function debounceFlush() {
    timeoutID != null && clearInterval(timeoutID);
    timeoutID = setTimeout(flush, 1000);
  }
  document.addEventListener(
    "visibilitychange",
    () => document.visibilityState === "hidden" && flush()
  );
  document.addEventListener("qsymbol", (_event) => {
    const event = _event as CustomEvent<QSymbolDetail>;
    const detail = event.detail;
    const symbol = detail.symbol;
    if (!existingSymbols.has(symbol)) {
      existingSymbols.add(symbol);
      const timeDelta = 0 - lastReqTime + (lastReqTime = detail.reqTime);
      qSymbols.push({
        symbol: symbol,
        timeDelta: Math.round(timeDelta),
        pathname: location.pathname,
        interaction: !!detail.element,
      });
      debounceFlush();
    }
  });
}
