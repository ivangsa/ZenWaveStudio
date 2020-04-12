import fs from 'fs';
import YAML from 'yaml';
import { File } from './File';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const YAMLSourceMap = require('yaml-source-map');

const sourceMap = new YAMLSourceMap();

export class IndexedFile {
  public file: File;
  private document: any;
  private edited = false;
  private text: string;
  public lines: string[];
  public originalText: string;
  public isDirty = false;

  constructor(file: File) {
    this.file = file;
    this.text = this.originalText = file.contents || '';
    this.document = sourceMap.index(YAML.parseDocument(this.text, { keepCstNodes: true /* must specify this */ }), {
      filename: file.url /* optional */
    });
    this.lines = this.text.split('\n');
  }

  get contents() {
    return this.text;
  }

  set contents(contents: string) {
    this.edited = true;
    this.text = contents;
    this.lines = this.text.split('\n');
  }

  isEdited() {
    if (this.edited) {
      return this.text !== this.originalText;
    }
    return false;
  }

  lookup(path: string[]): FileSection {
    return sourceMap.lookup(path, this.document);
  }

  insert(line: number, text: string) {
    console.log('empty method');
  }

  replace(line: number, text: string) {
    console.log('empty method');
  }

  remove(start: number, count: number) {
    console.log('empty method');
  }
}

export class FileSection {
  constructor(public filename: string, public start: FilePointer, public end: FilePointer) {}
}

export class FilePointer {
  constructor(public line: number, public col: number) {}
}

export function indexApi(filenames: URL[]) {
  return filenames.map(filename => new IndexedFile(filename));
}
