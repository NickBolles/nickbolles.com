import { StoreOptions, Module, Store } from "vuex/types";
import Vue from "vue";
import VeeValidate from "vee-validate";

Vue.use(VeeValidate);


interface IRootState {
  loaded: boolean;
}

export const mutations: any = {
  setName(state: IRootState, name?: string): void {
    state.loaded = true;
  }
}

export const state: () => StoreOptions<IRootState> = () => ({
  state: {
    loaded: false
  }
});