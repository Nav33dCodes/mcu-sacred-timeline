import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import NavBar from './components/NavBar';
import { WatchProvider } from './context/WatchContext';
import ScrollToTop from './components/ScrollToTop';

// Performance Optimization: Lazy load route components for code-splitting
const Home = lazy(() => import('./pages/Home'));
const WatchOrder = lazy(() => import('./pages/WatchOrder'));

// Loading Fallback for Suspense
const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <div className="loader" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-muted)' }}>
      Accessing S.H.I.E.L.D Database...
    </div>
  </div>
);

// We need a sub-component to use `useLocation` hook
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route index element={
          <Suspense fallback={<PageLoader />}><Home /></Suspense>
        } />
        <Route path="watch-order" element={
          <Suspense fallback={<PageLoader />}><WatchOrder /></Suspense>
        } />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <WatchProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="layout-container">
          <NavBar />
          <main className="content-area">
            <AnimatedRoutes />
          </main>
        </div>
      </BrowserRouter>
    </WatchProvider>
  );
}

export default App;
