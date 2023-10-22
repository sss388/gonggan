/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import router from '../router'

// Types
import type { App } from 'vue'
import store from "@/store";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export function registerPlugins (app: App) {
  loadFonts()
  app
    .use(vuetify)
    .use(router)
    .use(store)
    .component('font-awesome-icon', FontAwesomeIcon)
}
