import * as emojicon from 'emojicon';
import { createApp } from 'vue'

import App from './App.vue'
import './tailwind.css'

createApp(App).mount('#app')

emojicon.set('✨');
