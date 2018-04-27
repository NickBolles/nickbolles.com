import { Module, ActionTree, Commit, MutationTree } from "vuex";
// import { IRootState } from "./index";
import { API } from "../assets/API";
import { Store } from "vuex/types";

export const actions: ActionTree<IContactState, any> = {
    submit({ commit, state }: { commit: Commit, state: IContactState }): any {
        commit("submitStart");

        API.sendEmail(state.email, state.message, state.name)
            .then((res) => commit("submitSuccess", res))
            .catch(function (err: Error): void {
                commit("submitFailure", err);
            });
    }
};

export const mutations: MutationTree<IContactState> = {
    setName(state: IContactState, name?: string): void {
        state.name = name || "";
    },
    setEmail(state: IContactState, email?: string): void {
        state.email = email || "";
    },
    setMessage(state: IContactState, message?: string): void {
        state.message = message || "";
    },
    submitStart(state: IContactState): void {
        state.pending = true;
        state.submitted = true;
        state.success = undefined;
    },
    submitSuccess(state: IContactState, result: any): void {
        state.pending = false;
        state.success = true;
    },
    submitFailure(state: IContactState, err: any): void {
        state.pending = false;
        state.success = false;
        state.errorMessage = "Unkown error submitting message";
    }
};


interface IContactState {
    name: string;
    email: string;
    message: string;
    submitted: boolean;
    success?: boolean;
    pending: boolean;
    errorMessage?: string;
}

export const state: () => IContactState = () => ({
    name: "",
    email: "",
    message: "",
    submitted: false,
    success: false,
    pending: false,
    errorMessage: ""
});