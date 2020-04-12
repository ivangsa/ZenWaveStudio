import fs from 'fs';
import { File, getFileFormat, FormatType, FileState } from '@/model/project/File';
import { Folder } from '@/model/project/Folder';

/**
 * FilesService
 */
export class FilesService {
  private store: { [index: string]: File } = {};

  buildFolderTree(folder: Folder) {
    const files = fs.readdirSync(folder.url);
    for (const file of files) {
      const path = folder.url + '/' + file;
      if (fs.statSync(path).isDirectory()) {
        const nestedFolder = new Folder(path);
        folder.files.push(nestedFolder);
        this.buildFolderTree(nestedFolder);
      } else {
        const file = this.get(path);
        console.log('buildFolderTree', file);
        folder.files.push(file);
      }
    }
    return folder;
  }

  get(filepath: string) {
    return this.store[filepath] || (this.store[filepath] = File.readFileSync(filepath));
  }

  getContents(filepath: string) {
    return this.store[filepath].contents;
  }

  setContents(filepath: string, contents: string) {
    const file = this.get(filepath);
    file.contents = contents;
    file.state = FileState.MODIFIED;
  }

  isModified(filepath: string) {
    return this.store[filepath].state === FileState.MODIFIED;
  }

  getModified(): string[] {
    return Object.values(this.store)
      .filter(file => file.state === FileState.MODIFIED)
      .map(file => file.name);
  }

  refresh(filepath: string) {
    const file: File = this.store[filepath];
    if (file.state === FileState.MODIFIED || file.state === FileState.DELETED) {
      return false;
    }
    this.revert(filepath);
    return true;
  }

  revert(filepath: string) {
    delete this.store[filepath];
    this.get(filepath);
  }

  refreshUnmodified() {
    Object.values(this.store).forEach(file => this.refresh(file.url));
  }

  revertAll() {
    console.log(this.store);
    Object.values(this.store).forEach(file => this.revert(file.url));
  }

  save(filepath: string): void;
  save(filepath: string, cb: () => void): void;
  save(filepath: string, cb?: () => void) {
    const file: File = this.store[filepath];
    if (file.state === FileState.MODIFIED) {
      file.write();
    } else if (file.state === FileState.DELETED) {
      file.remove();
    }

    file.state = FileState.PRISTINE;
    if (cb) {
      cb();
    }
  }

  saveAll(): void;
  saveAll(cb: () => void): void;
  saveAll(cb?: () => void) {
    Object.values(this.store).forEach(file => {
      if (file.state === FileState.MODIFIED || file.state === FileState.NEW) {
        file.write();
      } else if (file.state === FileState.DELETED) {
        file.remove();
      }
    });

    if (cb) {
      cb();
    }
  }
}

export default new FilesService();
