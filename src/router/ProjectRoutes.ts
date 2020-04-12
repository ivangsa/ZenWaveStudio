import { RouteConfig } from 'vue-router';
import ProjectLayout from '@/views/project/ProjectLayout.vue';
import AsyncapiEditorLayout from '@/views/asyncapi/AsyncapiEditorLayout.vue';
import FilesComponent from '@/views/project/sidebar/FilesComponent.vue';
import SideBarComponent from '@/views/asyncapi/sidebar/SideBarComponent.vue';
import ProjectToolbarComponent from '@/views/project/ProjectToolbarComponent.vue';
import AsyncapiToolbarActions from '@/views/asyncapi/AsyncapiToolbarActions.vue';
import EditorComponent from '@/views/components/editor/EditorComponent.vue';
import PreviewComponent from '@/views/asyncapi/preview/PreviewComponent.vue';

export const routes: RouteConfig[] = [
  {
    path: '/project',
    name: 'Project',
    component: ProjectLayout,
    redirect: '/project/info',
    children: [
      {
        path: 'info',
        components: {
          files: FilesComponent
          // sidebar: FilesComponent
          // editor: FilesComponent
        }
      },
      {
        path: 'edit/file/:file',
        name: 'EditFile',
        components: {
          files: FilesComponent,
          // sidebar: SideBarComponent,
          editor: EditorComponent
          // preview: PreviewComponent
        }
      },
      {
        path: 'asyncapi/:file',
        // redirect: '/asyncapi/:file/edit',
        components: {
          files: FilesComponent,
          toolbarActions: AsyncapiToolbarActions,
          sidebar: SideBarComponent,
          editor: AsyncapiEditorLayout
        },
        children: [
          {
            path: 'edit',
            name: 'Asyncapi',
            components: {
              text: EditorComponent,
              form: PreviewComponent,
              preview: PreviewComponent
            }
          },
          {
            path: '$ref/:ref',
            name: 'AsyncapiRef',
            components: {
              text: EditorComponent,
              form: PreviewComponent,
              preview: PreviewComponent
            }
          },
          {
            path: 'path/info',
            components: {
              text: EditorComponent,
              form: PreviewComponent,
              preview: PreviewComponent
            }
          }
        ]
      }
    ]
  }
];
