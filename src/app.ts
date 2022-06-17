class Film {
  constructor(
    public title: string,
    public releaseDate: string,
    public director: string
  ) {}

  printInfo() {
    return `${this.title} was directed by ${this.director} and released in ${this.releaseDate}.`;
  }
}

class Component {
  static createElement(
    elementType: string,
    elementId: string = "",
    classList: string[] = [""],
    htmlContent: string
  ) {
    const element = document.createElement(elementType);

    if (elementId) {
      element.id = elementId;
    }

    if (classList[0]) {
      classList.forEach((_class) => {
        element.classList.add(_class);
      });
    }

    if (htmlContent) {
      element.innerHTML = htmlContent;
    }

    return element;
  }

  static getElement(targetElement: string) {
    const element = document.querySelector(targetElement);
    return element;
  }
}

class Library {
  private list: Film[];
  private static instance;
  private constructor() {
    this.list = [] as Film[];
  }

  createFilm(title: string, year: string, director: string) {
    const film = new Film(title, year, director);
    return film;
  }

  addFilm(film: Film) {
    this.list.push(film);
    console.log(this.list);
  }

  returnCurrentList() {
    return this.list;
  }

  static getInstance() {
    if (Library.instance) {
      return this.instance;
    }

    this.instance = new Library();
    return this.instance;
  }
}

class DisplayController {
  private static instance;
  private main: HTMLElement;
  private addMovieBtn: HTMLButtonElement;
  private backdrop: HTMLElement;
  private addMovieModal: HTMLElement;
  private addMovieModalAddBtn: HTMLButtonElement;
  private addMovieModalCancelBtn: HTMLButtonElement;
  private libraryReference: Library;

  private constructor(libraryData: Library) {
    this.main = Component.getElement("main") as HTMLElement;
    this.addMovieBtn = Component.getElement(
      "#js-add-movie-btn"
    ) as HTMLButtonElement;
    this.backdrop = Component.getElement(".backdrop") as HTMLElement;
    this.addMovieModal = Component.getElement(
      ".add-movie-modal"
    ) as HTMLElement;
    this.addMovieModalAddBtn = Component.getElement(
      "#add-movie-modal__add-btn"
    ) as HTMLButtonElement;
    this.addMovieModalCancelBtn = Component.getElement(
      "#add-movie-modal__cancel-btn"
    ) as HTMLButtonElement;

    this.libraryReference = libraryData;

    this.init();
  }

  setupAddMovieBtn() {
    this.addMovieBtn.addEventListener("click", () => {
      this.openMovieModal();
      this.toggleBackdrop();
    });
  }

  setupModalAddBtn() {
    // console.log(this);
    this.addMovieModalAddBtn.addEventListener("click", () => {
      console.log(this);
      this.addMovieHandler();
    });
  }

  setupModalCancelBtn() {
    this.addMovieModalCancelBtn.addEventListener("click", () => {
      this.openMovieModal();
      this.toggleBackdrop();
    });
  }

  openMovieModal() {
    this.addMovieModal.classList.toggle("add-movie-modal--hidden");
    this.addMovieModal.classList.toggle("add-movie-modal--visible");
  }

  closeMovieModal() {
    this.addMovieModal.classList.remove("add-movie-modal-visible");
    this.addMovieModal.classList.add("add-movie-modal-hidden");
  }

  toggleBackdrop() {
    this.backdrop.classList.toggle("backdrop--visible");
    this.backdrop.classList.toggle("backdrop--hidden");
  }

  getInputValues() {
    const rawInputs = document.querySelectorAll(
      ".add-movie-modal__form > div input"
    );
    const inputs = [...rawInputs] as HTMLInputElement[];

    const obj = {
      title: inputs[0].value,
      director: inputs[1].value,
      year: inputs[2].value,
    };

    return obj;
  }

  clearModalInputs() {
    const rawInputs = document.querySelectorAll(
      ".add-movie-modal__form > div input"
    );
    const inputs = [...rawInputs] as HTMLInputElement[];

    inputs.forEach((element) => {
      element.value = "";
    });
  }

  addMovieData() {
    const template = this.getInputValues();
    const { title, director, year } = template;
    const film = this.libraryReference.createFilm(title, year, director);
    this.libraryReference.addFilm(film);
  }

  addMovieHandler() {
    this.openMovieModal();
    this.toggleBackdrop();
    this.addMovieData();
    this.clearModalInputs();
    this.render();
  }

  constructCardHtml(film: Film) {
    const { title, releaseDate, director } = film;
    const content = `<div class="library__card__information-container">
    <div>
      <p>Title:</p>
      <span>${title}</span>
    </div>
    <div>
      <p>Director:</p>
      <span>${director}</span>
    </div>
    <div>
      <p>Release Year:</p>
      <span>${releaseDate}</span>
    </div>
  </div>
  <div class="card__button-container">
    <button class="btn">Remove</button>
    <button class="btn">Watched</button>
  </div>`;

    return content;
  }

  generateCard(film: Film) {
    const card = Component.createElement(
      "div",
      "",
      ["library__card"],
      this.constructCardHtml(film)
    );

    return card;
  }

  render() {
    const list = this.libraryReference.returnCurrentList();
    list.forEach((film) => {
      this.main.appendChild(this.generateCard(film));
    });
  }

  init() {
    this.setupAddMovieBtn();
    this.setupModalAddBtn();
    this.setupModalCancelBtn();
    this.render();
  }

  static getInstance(library) {
    if (DisplayController.instance) {
      return this.instance;
    }

    this.instance = new DisplayController(library);
    return this.instance;
  }
}

class App {
  static init() {
    const library = Library.getInstance();
    const renderer = DisplayController.getInstance(library);

    console.log("App is running...");
    console.log(renderer);
  }
}

App.init();
