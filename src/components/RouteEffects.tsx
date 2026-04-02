import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { applyRouteSideEffects } from '@/legacy/onboardingRuntime';

/** Syncs body class, modals, signature canvas, and per-page DOM helpers after HashRouter navigation. */
export function RouteEffects() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    applyRouteSideEffects(pathname);
  }, [pathname]);

  return null;
}
