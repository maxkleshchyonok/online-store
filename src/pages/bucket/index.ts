import Page from '../../core/templates/page';

class BucketPage extends Page {
  static TextObject = {
    MainTitle: 'Bucket page',
  };

  constructor(id: string) {
    super(id);
  }

  render(): HTMLElement {
    const title = this.createHeaderTitle(BucketPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}

export default BucketPage;
