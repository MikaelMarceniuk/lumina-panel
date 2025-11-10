export class CreateSessionDTO {
  userId: string;
  refreshToken: string;
  accessToken: string;
  expiresAt: Date;
}
