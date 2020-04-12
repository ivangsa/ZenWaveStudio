import { Folder } from './Folder';

export class Project {
  name: string;
  root: Folder;
  gitUrl: string | null = null;

  constructor(url: string, name?: string) {
    this.root = new Folder(url);
    this.name = name || this.root.name;
  }
}
