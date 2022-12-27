abstract class Page {
  protected container: HTMLElement;

  static TextObject = {};

  protected constructor(id: string) {
    this.container = document.createElement('div');
    this.container.id = id;
  }

  protected createHeaderTitle(text: string) {
    const headerTitle = document.createElement('h1');
    headerTitle.innerText = text;
    return headerTitle;
  }

  protected createElementHTML(tag: string, tagClass: string, container: HTMLElement) {
    const el = document.createElement(tag);
    el.classList.add(tagClass);
    container.append(el);
  }

  render() {
    return this.container;
  }
}

export default Page;
