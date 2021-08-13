/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IResultAPI, ISearchStore } from '../../Types';

const initialState: ISearchStore = {
  history: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addToHistory(state: ISearchStore, action: PayloadAction<IResultAPI>) {
      const { payload } = action;
      const item = state.history.find(
        (i) => JSON.stringify(i) === JSON.stringify(payload)
      );

      if (item)
        state.history = state.history.filter(
          (i) => JSON.stringify(i) !== JSON.stringify(payload)
        );

      state.history.unshift(action.payload);

      if (state.history.length > 3) state.history.pop();
    },
  },
});

export const { actions } = searchSlice;
export default searchSlice.reducer;
