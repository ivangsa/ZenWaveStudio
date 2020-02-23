import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import parseApi from '@/lib/parser/dereference';
import { AsyncAPI } from '@/model/asyncapi/asyncapi';
import fs from 'fs';
import YAML from 'yaml';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const YAMLSourceMap = require('yaml-source-map');

describe('json/yml parser', () => {
  test('yml in multiple files', async () => {
    const parser = await parseApi('test/unit/parser/examples/multiple-files/asyncapi.yml');
    const yml = parser.schema;
    const api: AsyncAPI = plainToClass(AsyncAPI, yml);
    // console.log(api);
    console.log(parser.$refs.paths());
    console.log(parser.$refs.exists('messages.yml#/components/messages/cart.lines.add/x-avro-envelop'));
    console.log(parser.$refs.get('messages.yml#/components/messages/cart.lines.add/x-avro-envelop'));
    // console.log(api?.components?.messages);
    // console.log(api?.components?.messages && api?.components?.messages['cart.lines.add']);
    console.log(api?.components?.messages && api?.components?.messages.get('cart.lines.add')?.original$ref);
  });

  test('yaml-source-map', async () => {
    const sourceMap = new YAMLSourceMap();
    const filename = 'test/parser/examples/multiple-files/asyncapi.yml';

    const document = sourceMap.index(
      YAML.parseDocument(fs.readFileSync(filename, 'utf8'), { keepCstNodes: true /* must specify this */ }),
      { filename: filename /* optional */ }
    );
    console.log(sourceMap.lookup(['components', 'messages'], document));
    console.log(typeof document[0]);
  });
});
