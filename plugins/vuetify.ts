import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { VuetifyDateAdapter } from "vuetify/labs/date/adapters/vuetify";

export default defineNuxtPlugin((nuxt) => {
  const vuetify = createVuetify({
    date: {
      adapter: VuetifyDateAdapter,
    },
    ssr: true,
    components,
    directives,
  });
  nuxt.vueApp.use(vuetify);
});
