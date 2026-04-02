import { useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { PAGE_HTML, MODALS_HTML, NOYA_HTML } from '@/legacy/pageHtml';
import { installOnboardingGlobals, bootstrapLegacyUi } from '@/legacy/onboardingRuntime';
import { PAGE_ID_TO_PATH } from '@/routes/pageMap';
import { LegacyPage } from '@/pages/LegacyPage';
import { RouteEffects } from '@/components/RouteEffects';

function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    installOnboardingGlobals(navigate);
    bootstrapLegacyUi();
  }, [navigate]);

  const entries = Object.entries(PAGE_ID_TO_PATH) as [keyof typeof PAGE_HTML, string][];

  return (
    <>
      <RouteEffects />
      <div id="app" className="h5-app-shell">
        <Routes>
          {entries.map(([pageId, path]) => (
            <Route key={path} path={path} element={<LegacyPage html={PAGE_HTML[pageId]} />} />
          ))}
        </Routes>
      </div>
      <div className="legacy-modals-root" dangerouslySetInnerHTML={{ __html: MODALS_HTML }} />
      <div className="legacy-noya-root" dangerouslySetInnerHTML={{ __html: NOYA_HTML }} />
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}
