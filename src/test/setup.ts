import '@testing-library/jest-dom';

class IntersectionObserverMock {
  observe = () => null;
  disconnect = () => null;
  unobserve = () => null;
  root = null;
  rootMargin = '';
  thresholds = [];
}

Object.defineProperty(globalThis, 'IntersectionObserver', {
  writable: true,
  value: IntersectionObserverMock,
});

window.scrollTo = () => {};
