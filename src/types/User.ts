export default interface User {
  name: string;
  nickname: string;
  phoneNumber: string;
  loginId: string;
  birth: string;
  role: 'PROVIDER' | 'CLIENT';
  gender: 'MALE' | 'FEMALE';
  profileUrl?: string;
}
