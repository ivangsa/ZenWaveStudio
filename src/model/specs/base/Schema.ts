import { Referentiable } from './Referentiable';

export abstract class Schema extends Referentiable {
  defaultValue?: any;
  type?: string;
  format?: string;
  name?: string;
  title?: string;
  description?: string;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: boolean;
  minimum?: number;
  exclusiveMinimum?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxProperties?: number;
  minProperties?: number;
  required?: string[];
  enumeration?: Record<string, any>[];
  items?: Schema;
  allOf?: Schema[];
  oneOf?: Schema[];
  anyOf?: Schema[];
  not?: Schema;
  properties?: Map<string, Schema>;
  additionalPropertiesSchema?: Schema;
  additionalPropertiesBoolean?: boolean;
  readOnly?: boolean;
  example?: Record<string, any>;
  nullable?: boolean;
  writeOnly?: boolean;
  deprecated?: boolean;
}
