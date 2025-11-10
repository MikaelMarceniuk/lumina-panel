import { UserPresenter } from '../../user/presenters/user.presenter';

type SignInPresenterParams = {
  user: UserPresenter;
  accessToken: string;
  refreshToken: string;
};

export class SignInPresenter {
  user: UserPresenter;
  accessToken: string;
  refreshToken: string;

  constructor({ user, accessToken, refreshToken }: SignInPresenterParams) {
    this.user = user;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
