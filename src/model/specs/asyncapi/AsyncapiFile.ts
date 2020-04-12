import { File } from '@/model/project/File';
import { AsyncAPI } from './Asyncapi';
import { $Refs } from 'json-schema-ref-parser';

export class AsyncapiFile {
  indexedSourceFile?: any;

  constructor(public file: File, public api: AsyncAPI, public $refs: $Refs) {}
}
