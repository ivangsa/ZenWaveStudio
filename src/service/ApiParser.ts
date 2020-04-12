import memFs, { FilesService } from '@/service/FilesService';
import parseJsonSchema from '@/lib/parser/dereference';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const memFsResolver = require('@/lib/parser/mem-fs-resolver');

export class ApiParser {
  memFsService: FilesService;
  parseApi(path: string | Buffer) {
    return parseJsonSchema(path, { resolve: { memfs: new memFsResolver(this.memFsService.getContents) } });
  }

  constructor(memFsService?: FilesService) {
    this.memFsService = memFsService || new FilesService();
  }
}

export default new ApiParser(memFs);
