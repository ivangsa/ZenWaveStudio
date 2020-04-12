import { Referentiable } from '../base/Referentiable';
import { Schema as BaseSchema } from '../base/Schema';

export class AsyncAPI extends Referentiable {
  asyncapi?: string;
  id?: string;
  info?: Info;
  servers?: Map<string, Server>;
  channels?: Map<string, ChannelItem>;
  tags?: Tag[];
  components?: Components;
}

export class ChannelItem extends Referentiable {
  description?: string;
  publish?: Operation;
  subscribe?: Operation;
  servers?: Server[];
  parameters?: Map<string, Parameter>;
}

export class Operation extends Referentiable {
  operationId?: string;
  summary?: string;
  description?: string;
  tags?: string[];
  externalDocs?: ExternalDocumentation;
  bindings?: Map<Bindings, Map<string, Record<string, any>>>;
  traits?: OperationTrait[];
  message?: Message;
}

export class OperationTrait extends Referentiable {
  operationId?: string;
  summary?: string;
  description?: string;
  tags?: Tag[];
  externalDocs?: ExternalDocumentation;
  bindings?: Map<Bindings, Map<string, Record<string, any>>>;
}

enum OperationType {
  PUBLISH,
  SUBSCRIBE
}

export class Components {
  schemas?: Map<string, Schema>;
  messages?: Map<string, Message>;
  parameters?: Map<string, Parameter>;
  securitySchemes?: Map<string, SecurityScheme>;
  correlationIds?: Map<string, CorrelationId>;
  operationTraits?: Map<string, OperationTrait>;
  messageTraits?: Map<string, MessageTrait>;
  // Map<string,Parameter> serverBindings // TODO
  // Map<string,Parameter> channelBindings // TODO
  // Map<string,Parameter> operationBindings // TODO
  // Map<string,Parameter> messageBindings // TODO
}

export class CorrelationId extends Referentiable {}

export class Message extends Referentiable {
  headers?: Schema;
  payload?: Schema;
  correlationId?: CorrelationId;
  schemaFormat?: string;
  contentType?: string;
  name?: string;
  title?: string;
  summary?: string;
  description?: string;
  tags?: Tag[];
  externalDocs?: ExternalDocumentation;
  bindings?: Map<Bindings, Map<string, Record<string, any>>>;
  examples?: Map<string, Record<string, any>>;
  traits?: MessageTrait[];
  oneOf?: Message[];
}

export class MessageTrait extends Referentiable {
  headers?: Schema;
  correlationId?: CorrelationId;
  schemaFormat?: string;
  contentType?: string;
  name?: string;
  title?: string;
  summary?: string;
  description?: string;
  tags?: string[];
  externalDocs?: ExternalDocumentation;
  bindings?: Map<Bindings, Map<string, Record<string, any>>>;
  examples?: Map<string, Record<string, any>>;
}

export class Schema extends BaseSchema {
  externalDocs?: ExternalDocumentation;
  discriminator?: Discriminator;
}

export class Parameter extends Referentiable {
  description?: string;
  schema?: Schema;
  location?: string;
}

export class SecurityScheme extends Referentiable {}

export class Discriminator extends Referentiable {
  propertyName?: string;
  mapping?: Map<string, string>;
}

export class ExternalDocumentation extends Referentiable {
  description?: string;
  url?: string;
  extensions?: Map<string, Record<string, any>>;
}

export class Contact {
  name?: string;
  url?: string;
  email?: string;
}

export class Info {
  title?: string;
  version?: string;
  description?: string;
  termsOfService?: string;
  contact?: Contact;
  license?: License;
}

export class License {
  name?: string;
  url?: string;
}

export class Example extends Referentiable {
  summary?: string;
  description?: string;
  value?: Record<string, any>;
  externalValue?: string;
  $ref?: string;
  extensions?: Map<string, Record<string, any>>;
}

export class Header extends Referentiable {
  description?: string;
  $ref?: string;
  required?: boolean;
  deprecated?: boolean;
}

export enum Bindings {
  http,
  ws,
  kafka,
  amqp,
  amqp1,
  mqtt,
  mqtt5,
  nats,
  jms,
  sns,
  sqs,
  stomp,
  redis
}

export class Server {
  url?: string;
  description?: string;
  protocol?: string;
  protocolVersion?: string;
  variables?: Map<string, ServerVariable>;
  security?: Map<string, string>[];
}

export class ServerVariable {
  enumValue?: string[];
  defaultValue?: string;
  description?: string;
  examples?: string[];
}

export class Tag extends Referentiable {
  name?: string;
  description?: string;
  externalDocs?: ExternalDocumentation;
}
