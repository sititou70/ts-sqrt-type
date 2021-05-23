export type ResultContainer<T> = { _: T };

export type ExtractResult<conteiner> = conteiner extends { _: unknown }
  ? ExtractResult<_ExtractResult<conteiner>>
  : conteiner;
export type _ExtractResult<conteiner> = conteiner extends {
  _: { _: infer conteiner };
}
  ? { _: _ExtractResult<conteiner> }
  : conteiner extends { _: infer content }
  ? content
  : conteiner;
