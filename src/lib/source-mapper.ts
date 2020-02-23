import fs from 'fs';
import YAML from 'yaml';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const YAMLSourceMap = require('yaml-source-map');

const sourceMap = new YAMLSourceMap();

export class IndexedSourceFile {
  private document: any;
  public text: string;
  public lines: string[];
  public originalText: string;
  public isDirty = false;

  constructor(public filename: URL) {
    this.text = this.originalText = fs.readFileSync(filename.toString(), 'utf8');
    this.document = sourceMap.index(YAML.parseDocument(this.text, { keepCstNodes: true /* must specify this */ }), {
      filename: filename /* optional */
    });
    this.lines = this.text.split('\n');
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
  return filenames.map(filename => new IndexedSourceFile(filename));
}
