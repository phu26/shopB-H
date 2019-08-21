import { PipeHtmlCssPipe } from './pipe-html-css.pipe';

describe('PipeHtmlCssPipe', () => {
  it('create an instance', () => {
    const pipe = new PipeHtmlCssPipe(undefined);
    expect(pipe).toBeTruthy();
  });
});
