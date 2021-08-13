import { configureStore } from '@reduxjs/toolkit';

import search from './search/slice';

const store = configureStore({
  reducer: {
    search,
  },
});

export default store;
