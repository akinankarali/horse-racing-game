import { Store } from 'vuex';
import { RaceState } from '@/store/types';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<RaceState>;
  }
}