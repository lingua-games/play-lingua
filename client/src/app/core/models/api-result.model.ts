export class ApiResult<T> {
  data: T;
  hasError?: boolean;
  isLoading?: boolean;
  errorMessage?: string;

  constructor() {
    this.hasError = false;
    this.isLoading = true;
    this.data = {} as T;
  }

  setLoading(trigger: boolean): void {
    this.isLoading = trigger;
    this.errorMessage = '';
    this.hasError = false;
  }

  setData(data: T): void {
    this.data = data;
    this.hasError = false;
    this.isLoading = false;
  }

  setError(message: string): void {
    this.hasError = true;
    this.isLoading = false;
    this.errorMessage = message;
  }
}
