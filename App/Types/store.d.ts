import 'react-redux';
import { ISearchStore } from './index';

declare module 'react-redux' {
  export interface DefaultRootState {
    search: ISearchStore;
  }
}
