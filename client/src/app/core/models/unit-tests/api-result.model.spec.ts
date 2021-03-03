import { ApiResult } from '../api-result.model';

describe('ApiResault', () => {
  let model: ApiResult<string>;
  beforeEach(() => {
    model = new ApiResult<string>();
  });

  it('should set data, hasError and isLoading on setData()', () => {
    model.setData('Something');

    expect(model.data).toBe('Something');
    expect(model.hasError).toBe(false);
    expect(model.isLoading).toBe(false);
  });

  it('should set hasError, isLoading and errorMessage on setError()', () => {
    model.setError('someError');

    expect(model.errorMessage).toBe('someError');
    expect(model.hasError).toBe(true);
    expect(model.isLoading).toBe(false);
  });

  it('should set isLoading, errorMessage and hasError on setLoading()', () => {
    model.setLoading(true);

    expect(model.errorMessage).toBe('');
    expect(model.hasError).toBe(false);
    expect(model.isLoading).toBe(true);
  });
});
