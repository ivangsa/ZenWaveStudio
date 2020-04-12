// eslint-disable-next-line @typescript-eslint/no-var-requires
const urlUtls = require('json-schema-ref-parser/lib/util/url');
import path from 'path';

export default {
  isHttp(url: string): boolean {
    return urlUtls.isHttp(url);
  },

  isFileSystemPath(url: string): boolean {
    return urlUtls.isFileSystemPath(url);
  },

  fromFileSystemPath(url: string): string {
    return urlUtls.fromFileSystemPath(url);
  },

  toFileSystemPath(url: string, keepFileProtocol: boolean): string {
    return urlUtls.toFileSystemPath(url, keepFileProtocol);
  },

  getParentUrl(url: string): string {
    return path.dirname(url);
  },

  getFilename(url: string): string {
    return path.basename(url);
  }
};
