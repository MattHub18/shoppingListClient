import { DatetimePipe } from './datetime.pipe';

describe('DatetimePipe', () => {

  let pipe: DatetimePipe;

  beforeEach(() => {
    pipe = new DatetimePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transform "2024-04-18T07:17:29.102Z" into "18/04/2024"', () => {
    expect(pipe.transform("2024-04-18T07:17:29.102Z")).toEqual("18/04/2024");
  });
});
