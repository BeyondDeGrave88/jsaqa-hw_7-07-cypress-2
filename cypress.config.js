import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'cjosdh',
  //retries: 2,
  e2e: {
    baseUrl: 'http://qamid.tmweb.ru',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
