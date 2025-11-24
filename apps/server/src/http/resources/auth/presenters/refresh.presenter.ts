type RefreshPresenterParams = {
  accessToken: string;
};

export class RefreshPresenter {
  accessToken: string;

  constructor({ accessToken }: RefreshPresenterParams) {
    this.accessToken = accessToken;
  }
}
