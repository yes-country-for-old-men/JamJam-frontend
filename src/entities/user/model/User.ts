import type { UserRole } from '@/entities/user/model/UserRole';

interface Account {
  accountNumber: string;
  depositor: string;
  bankCode: string;
  bankName: string;
}

export interface User {
  name: string;
  nickname: string;
  phoneNumber: string;
  loginId: string;
  birth: string;
  role: UserRole;
  gender: 'MALE' | 'FEMALE';
  profileUrl?: string;
  credit: number;
  account?: Account;
}
