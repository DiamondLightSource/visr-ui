import { useEffect, useState } from "react";
import { scanEventSource, type ScanEventMessage } from "./scanEventSource";

export function useScanEvents() {
  const [scanEvent, setScanEvent] = useState<ScanEventMessage | null>(null);

  useEffect(() => {
    const unsubscribe = scanEventSource.subscribe(setScanEvent);
    return unsubscribe;
  }, []);

  return scanEvent;
}
