import { Component, Inject, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  file: { name: string; path: string } | null = null;
  items = [
    {
      icon: "fa-file-o",
      title: "Trafic Lights API",
      subtitle: new Date()
    },
    {
      icon: "fa-file-o",
      title: "Shoping Cart Example",
      subtitle: new Date()
    },
    {
      icon: "fa-file-o",
      title: "Your latest AsyncAPI",
      subtitle: new Date()
    }
  ];

  onOpenFile() {
    console.log(this.file);
    if (this.file && this.file.path) {
      this.$store.dispatch("asyncapi/load", this.file.path, { root: true });
    }
  }
}
