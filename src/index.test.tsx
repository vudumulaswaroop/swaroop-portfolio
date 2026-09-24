test('mounts the application at the root element', () => {
  document.body.innerHTML = '<div id="root"></div>';
  jest.doMock('react-dom/client', () => ({
    createRoot: () => ({ render: jest.fn() }),
  }));

  jest.isolateModules(() => {
    require('./index');
  });
});