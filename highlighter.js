import { newState, addPromise } from "./util.js";

export default {
  props: ['tabId', 'path'],
  data: function() {
    return {
      disabled: false
    };
  },
  methods: {
    highlightElement: function() {
      if (! this.path || !this.path.cssPath) {
        return;
      }

      const state = newState();
      const promise = new Promise((resolutionFunc, rejectionFunc) => {
        addPromise(state, resolutionFunc, rejectionFunc);
      });
      const timeout = new Promise((resolutionFunc, rejectionFunc) => {
        setTimeout(resolutionFunc, 5000);
      });

      this.disabled = true;
      hostCallback(JSON.stringify({
        name: "highlight", payload: { tabId: this.tabId, cssPath: this.path.cssPath }, state: state
      }));

      Promise.race([ promise, timeout ]).catch((error) => {
        setTimeout(() => {
          alert(error.errorMessage);
        }, 0);
      }).finally(() => {
        this.disabled = false;
      });
    },
  },
  template: `
    <b-button size="sm" pill class="btn-mivalidator-highlighter" :title="path.cssPath" :disabled="disabled" @click="highlightElement">{{ path.lastTag }}</b-button>
  `
}
