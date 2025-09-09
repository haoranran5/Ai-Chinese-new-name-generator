export interface User {
  id?: number;
  uuid: string;
  email: string;
  nickname: string;
  avatar_url: string;
  signin_type: string;
  signin_ip: string;
  signin_provider: string;
  signin_openid: string;
  created_at: string;
  invite_code?: string;
  invited_by?: string;
}
