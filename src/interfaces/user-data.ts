export interface UserData {
  id: string;
  name: string;
  email: string;
}

export interface UserResponse {
  data: UserData[];
}
