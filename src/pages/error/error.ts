import Page from '../../core/templates/page';

class ErrorPage extends Page {
  private errorType: string;

  constructor(id: string, errorType: string) {
    super(id);
    this.errorType = errorType;
  }

  render() {
    const title = this.createHeaderTitle('Error 404 Page not found');
    this.container.append(title);
    return this.container;
  }
}

export default ErrorPage;
