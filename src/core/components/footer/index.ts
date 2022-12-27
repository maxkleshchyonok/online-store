import Component from '../../templates/components';

const FooterBar = [
  {
    id: 'o_nas',
    text: 'O nas',
  },
  {
    id: 'blog',
    text: 'Blog',
  },
  {
    id: 'dostava',
    text: 'Dostawa',
  },
  {
    id: 'polityka',
    text: 'Polityka prywatności',
  },
  {
    id: 'platnosci',
    text: 'Płatności',
  },
  {
    id: 'gwarancja',
    text: 'Gwarancja',
  },
  {
    id: 'pomoc',
    text: 'Pomoc',
  },
  {
    id: 'lokalizacja',
    text: 'Lokalizacja',
  },
];

const FooterInfo = [
  {
    id: 'footer-location',
    text: 'Warszawa, ul Dzika 36',
    img: '../../../img/elements/location.svg',
  },
  {
    id: 'working-hours',
    text: 'Codziennie 10:00 - 19:30',
    img: '../../../img/elements/location.svg',
  },
  {
    id: 'footer-email',
    text: 'info@palletport.pl',
    img: '../../../img/elements/location.svg',
  },
  {
    id: 'footer-phone',
    text: '666666666',
    img: '../../../img/elements/location.svg',
  },
];

class Footer extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  private renderFooterBlock(): void {
    const footerBar = document.createElement('div');
    footerBar.className = 'footer-bar';
    FooterBar.forEach(item => {
      const barItem = document.createElement('a');
      barItem.href = '#';
      barItem.className = 'footer-bar-item';
      barItem.innerText = item.text;
      footerBar.append(barItem);
    });
    this.container.append(footerBar);
  }

  private renderFooterInfo(): void {
    const footerInfo = document.createElement('div');
    footerInfo.className = 'footer-info';
    FooterInfo.forEach(item => {
      const infoItem = document.createElement('p');
      const infoItemImg = document.createElement('img');
      infoItemImg.className = 'info-item-img';
      infoItemImg.src = item.img;
      infoItem.className = 'footer-info-item';
      infoItem.innerText = item.text;
      footerInfo.append(infoItemImg, infoItem);
    });
    this.container.append(footerInfo);
  }

  render(): HTMLElement {
    this.renderFooterBlock();
    this.renderFooterInfo();
    return this.container;
  }
}

export default Footer;
