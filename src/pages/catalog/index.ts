import Page from '../../core/templates/page';

class CatalogPage extends Page {
  static TextObject = {
    MainTitle: 'Catalog Page',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(CatalogPage.TextObject.MainTitle);
    this.container.append(title);

    const img: HTMLImageElement = document.createElement('img');
    img.src = './assets/img/products/palety_euro/euro_nowe_1.jpg';
    this.container.append(img);
    
    return this.container;
  }
}

export default CatalogPage;
