import FileUrlUtils from '@/lib/FileUrlUtils';
import { File } from './File';

export class Folder {
  name: string;
  url: string;
  isLocalFolder: boolean;

  files: (Folder | File)[] = [];

  constructor(url: string) {
    this.url = url;
    this.name = FileUrlUtils.getFilename(url);
    this.isLocalFolder = FileUrlUtils.isFileSystemPath(url);
  }
}
