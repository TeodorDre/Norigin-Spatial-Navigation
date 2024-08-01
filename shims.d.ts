declare module '*.vue' {
  import { ComponentPublicInstance } from 'vue';

  declare const component: ComponentPublicInstance;

  export default component;
}
