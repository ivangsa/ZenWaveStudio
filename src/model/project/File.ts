import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import rimraf from 'rimraf';
import FileUrlUtils from '@/lib/FileUrlUtils';
import { $Refs } from 'json-schema-ref-parser';
import { Folder } from './Folder';

export enum FormatType {
  TEXT,
  ASYNCAPI,
  OPENAPI,
  JSON_SCHEMA,
  AVRO
}

export enum FileState {
  PRISTINE,
  NEW,
  MODIFIED,
  DELETED
}

export function getFileFormat(path: string, contents: string) {
  let format = FormatType.TEXT;
  if (path.endsWith('.avsc')) {
    format = FormatType.AVRO;
  } else if (contents?.startsWith('openapi')) {
    format = FormatType.OPENAPI;
  } else if (contents?.startsWith('asyncapi')) {
    format = FormatType.ASYNCAPI;
  } else if (contents?.startsWith('title') || contents?.startsWith('type')) {
    format = FormatType.JSON_SCHEMA;
  }
  return format;
}

export class File {
  url: string;
  name: string;
  extension: string;
  parentUrl: string;
  parentFolder?: Folder;

  format = FormatType.TEXT;
  contents = '';
  description?: string;

  state = FileState.PRISTINE;

  constructor(url: string, parentFolder?: Folder) {
    this.url = url;
    this.name = FileUrlUtils.getFilename(url);
    this.extension = 'TODO';
    this.parentUrl = FileUrlUtils.getParentUrl(url);
    this.parentFolder = parentFolder || FileUrlUtils.isFileSystemPath(url) ? new Folder(this.parentUrl) : undefined;
  }

  static createFile(url: string, parentFolder?: Folder) {
    const file = new File(url, parentFolder);
    file.state = FileState.NEW;
    return file;
  }

  static readFileSync(url: string, parentFolder?: Folder) {
    const file = new File(url, parentFolder);
    file.contents = fs.readFileSync(url).toString('utf-8');
    file.format = getFileFormat(url, file.contents);
    return file;
  }

  write() {
    const dir = path.dirname(this.url);
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir);
    }

    fs.writeFileSync(this.url, this.contents);
  }

  remove() {
    rimraf.sync(this.url);
  }
}
