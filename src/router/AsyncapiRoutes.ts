import { RouteConfig } from 'vue-router';
import AsyncapiLayout from '@/views/asyncapi/AsyncapiLayout.vue';
import SideBarComponent from '@/views/asyncapi/sidebar/SideBarComponent.vue';
import ListView from '@/views/asyncapi/ListView.vue';
import EditorComponent from '@/views/asyncapi/editor/EditorComponent.vue';
import PreviewComponent from '@/views/asyncapi/preview/PreviewComponent.vue';

export const routes: RouteConfig[] = [
  {
    path: '/asyncapi',
    name: 'Asyncapi',
    component: AsyncapiLayout,
    redirect: '/asyncapi/list',
    children: [
      {
        path: 'list',
        components: {
          sidebar: SideBarComponent,
          editor: EditorComponent,
          preview: PreviewComponent
        }
      },
      {
        path: 'edit/path/:path',
        components: {
          sidebar: SideBarComponent,
          editor: EditorComponent,
          preview: PreviewComponent
        }
      },
      {
        path: 'edit/file/:file',
        components: {
          sidebar: SideBarComponent,
          editor: EditorComponent,
          preview: PreviewComponent
        }
      }
    ]
  }
];
