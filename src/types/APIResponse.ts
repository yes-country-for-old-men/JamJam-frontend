export default interface APIResponse<T> {
  code: string;
  message: string;
  content: T;
}
