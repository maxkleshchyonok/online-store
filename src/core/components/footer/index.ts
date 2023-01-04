import Component from '../../templates/components';
import './footer.css';

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
    img: '../../assets/img/elements/footer-loc.svg',
  },
  {
    id: 'working-hours',
    text: 'Codziennie 10:00 - 19:30',
    img: '../../assets/img/elements/clock.svg',
  },
  {
    id: 'footer-email',
    text: 'info@palletport.pl',
    img: '../../assets/img/elements/footer-mail.svg',
  },
  {
    id: 'footer-phone',
    text: '666666666',
    img: '../../assets/img/elements/footer-phone.svg',
  },
];

const Social = [
  {
    id: 'vk',
    img: '../../assets/img/elements/vk.svg',
  },
  {
    id: 'fb',
    img: '../../assets/img/elements/fb.svg',
  },
  {
    id: 'inst',
    img: '../../assets/img/elements/inst.svg',
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

  private renderFooterSocial(): void {
    const socialInfo = document.createElement('div');
    const logoBlock = document.createElement('a');
    const logo = document.createElement('img');

    const socialBlock = document.createElement('div');

    socialInfo.className = 'social-info';

    logo.src = '../../assets/img/elements/palletport_logo_small.svg';
    logoBlock.append(logo);
    logoBlock.className = 'footer-logo-block';

    socialBlock.className = 'social-block';
    Social.forEach((item) => {
      const socialItem = document.createElement('a');
      const socialImg = document.createElement('img');
      socialImg.src = item.img;
      socialItem.className = 'social-item';
      socialItem.append(socialImg);
      socialBlock.append(socialItem);
    });

    socialInfo.append(socialBlock);

    for (let i = 0; i < 3; i += 1) {
      const copyRight = document.createElement('a');
      copyRight.className = 'author-link';
      if (i === 0) {
        copyRight.href = 'https://github.com/maxkleshchyonok';
        copyRight.innerText = 'https://github.com/maxkleshchyonok';
      } else if (i === 1) {
        copyRight.href = 'https://github.com/foteev';
        copyRight.innerText = 'https://github.com/foteev';
      } else {
        const rsLogo = document.createElement('img');
        rsLogo.src = '../../assets/img/elements/rs_school_js.svg';
        copyRight.append(rsLogo);
        copyRight.href = 'https://rs.school/js/';
        copyRight.classList.add('rs');
      }
      socialInfo.append(copyRight);
    }

    this.container.append(socialInfo);
  }

  render(): HTMLElement {
    this.renderFooterSocial();
    this.renderFooterBlock();
    this.renderFooterInfo();
    return this.container;
  }
}

export default Footer;
