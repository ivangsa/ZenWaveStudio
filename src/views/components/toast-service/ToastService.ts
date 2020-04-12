import Vue from 'vue';
import _Vue from 'vue'; // <-- notice the changed import
import Toast from './Toast.vue';

export interface VuetifyToastOptions {
  x?: string;
  y?: string;
  color?: string;
  icon?: string;
  iconColor?: string;
  classes?: string | object | Array<object | string>;
  timeout?: number;
  dismissable?: boolean;
  multiLine?: boolean;
  vertical?: boolean;
  showClose?: boolean;
  closeText?: string;
  closeIcon?: string;
  closeColor?: string;
  queueable?: boolean;
  slot?: Array<any>;
  shorts?: any;
}

class VuetifyToastService {
  private globalOptions: VuetifyToastOptions = { showClose: true, closeIcon: 'mdi-close' };

  show(message: string, options?: VuetifyToastOptions): void {
    const component = new Vue(Toast);
    const componentOptions = { ...this.globalOptions, ...options, message };

    Object.assign(component, componentOptions);
    document.body.appendChild(component.$mount().$el);
  }

  success(message: string, options?: VuetifyToastOptions): void {
    this.show(message, { ...options, color: 'success', icon: 'mdi-information' });
  }

  info(message: string, options?: VuetifyToastOptions): void {
    this.show(message, { ...options, color: 'info', icon: 'mdi-information' });
  }
}

export const toastService = new VuetifyToastService();

export default function VuetifyToastServicePlugin(Vue: typeof _Vue, globalOptions = {}): void {
  Vue.prototype.$toast = toastService;
}

declare module 'vue/types/vue' {
  interface Vue {
    $toast: VuetifyToastService;
  }
}
