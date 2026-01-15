export default interface ApiResponse<T> {
  code: string;
  message: string;
  content: T;
}
