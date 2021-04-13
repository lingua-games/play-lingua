export class ResultModel<T> {
  isLoading: boolean;
  data: T;
  errorMessage: string;
  hasError: boolean;

  constructor() {
    this.hasError = false;
    this.errorMessage = '';
    this.data = {} as T;
    this.isLoading = false;
  }

  setLoading(): void {
    this.isLoading = true;
  }

  stopLoading(): void {
    this.isLoading = false;
  }

  setData(data: T): void {
    this.isLoading = false;
    this.data = data;
    this.hasError = false;
    this.errorMessage = '';
  }

  setError(errorMessage: string): void {
    this.isLoading = false;
    this.hasError = true;
    this.errorMessage = errorMessage;
  }
}
