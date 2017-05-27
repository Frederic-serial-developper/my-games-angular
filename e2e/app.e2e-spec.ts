import { MyGamesAngularPage } from './app.po';

describe('my-games-angular App', () => {
  let page: MyGamesAngularPage;

  beforeEach(() => {
    page = new MyGamesAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
