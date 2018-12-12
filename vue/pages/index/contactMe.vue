<template>
    <v-container id="contactMe" class=" nb contact">
        <transition tag="span">
            <v-layout column>
                <span v-if="!pending && !success && canChangeMode">
                    <h1 class="headline title">Enter your information to shoot me an email. I'll get back to you as soon as I can.</h1>
                    <v-form>
                        <v-text-field v-validate="'required|alpha_spaces'" :error-messages="errors.collect('name')" data-vv-name="name" :value="name" @input="setName" label="Your Name" required></v-text-field>

                        <v-text-field v-validate="'required|email'" :error-messages="errors.collect('email')" data-vv-name="email" :value="email" @input="setEmail" label="Your Email" required></v-text-field>

                        <v-text-field multi-line v-validate="'required|max:250'" :error-messages="errors.collect('message')" :counter="250" data-vv-name="message" label="Your Message" :value="message" @input="setMessage" required>
                        </v-text-field>
                        <v-layout column align-center>
                            <h1 class="subheading warning--text">{{errorMessage}}</h1>
                            <v-btn @click="submit" key="focus" color="primary"
                                    class="elevation-10">
                                Submit
                            </v-btn>
                        </v-layout>
                    </v-form>
                </span>
                <v-progress-linear :indeterminate="true" v-if="pending && canChangeMode" key="focus"></v-progress-linear>
                <v-layout v-if="success && canChangeMode" key="focus" column justify-center align-center>
                    <h1 class="headline">Message sent!</h1>
                    <p class="subheading">Thanks for contacting me, I'll get back to you as soon as I can!</p>
                </v-layout>
            </v-layout>
        </transition>
    </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "nuxt-class-component";
import { namespace, Action, State, Mutation } from "vuex-class";
import { BindingHelper } from "vuex-class/lib/bindings";

const ModuleMutation: BindingHelper = namespace("contactMe", Mutation);
const ModuleAction: BindingHelper = namespace("contactMe", Action);
const ModuleState: BindingHelper = namespace("contactMe", State);

@Component({})
export default class ContactComponent extends Vue {
  isFormValid: boolean = false;

  canChangeAt: number = -1;
  _pending: boolean;
  _success: boolean;
  get canChangeMode(): boolean {
    return true;
    //     // always change on the first change
    //     if (this.canChangeAt === -1) {
    //       console.log("First change, changing");
    //       this.cacheMode(); // reset
    //       return true;
    //     }
    //     if (Date.now() > this.canChangeAt) {
    //       console.log("Time is past threshold,");
    //       if (this._pending !== this.pending || this._success !== this._success) {
    //         console.log("Mode is different, changing");
    //         this.cacheMode(); // reset
    //         return true;
    //       }
    //     }
    //     return false;
  }

  cacheMode(): void {
    this._pending = this.pending;
    this._success = this.success;
    this.canChangeAt = Date.now() + 1000;
  }

  @ModuleState name: string;
  @ModuleMutation setName;

  @ModuleState email: string;
  @ModuleMutation setEmail;

  @ModuleState message: string;
  @ModuleMutation setMessage;

  @ModuleState errorMessage: string;

  @ModuleState pending: boolean;
  @ModuleState success: boolean;

  @ModuleAction("submit") _submit;

  submit(): void {
    this.canChangeAt = -1;
    this.$validator.validateAll().then(result => {
      if (result) {
        this._submit();
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.nb .contact {
  .title {
    margin-bottom: 2em;
  }
}
</style>
