export interface User {
    id: number;
    email: string;
    name: string;
    password: string;
    is_active: boolean;
    is_staff: boolean;
    token: string;
  }