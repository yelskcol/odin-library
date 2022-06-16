class Library {
  list;
  constructor() {
    this.list = [];
  }

  createFilm(title: string, year: string, director: string) {
    const film = new Film(title, year, director);
    return film;
  }

  addFilm(film: Film) {
    this.list.push(film);
    console.log(this.list);
  }
}

class Film {
  constructor(
    private title: string,
    private releaseDate: string,
    private director: string
  ) {}

  printInfo() {
    return `${this.title} was directed by ${this.director} and released in ${this.releaseDate}.`;
  }
}

class Component {
  static createElement(
    elementType: string,
    elementId: string = "",
    classList: string[] = [""]
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

    return element;
  }
}

class DisplayController {
  private addMovieBtn: HTMLButtonElement;
  private backdrop: HTMLElement;
  private addMovieModal: HTMLElement;
  private addMovieModalAddBtn: HTMLButtonElement;
  private addMovieModalCancelBtn: HTMLButtonElement;
  private libraryReference: Library;

  constructor(libraryData: Library) {
    this.addMovieBtn = document.getElementById(
      "js-add-movie-btn"
    ) as HTMLButtonElement;
    this.backdrop = document.querySelector(".backdrop") as HTMLElement;
    this.addMovieModal = document.querySelector(
      ".add-movie-modal"
    ) as HTMLElement;
    this.addMovieModalAddBtn = document.getElementById(
      "add-movie-modal__add-btn"
    ) as HTMLButtonElement;
    this.addMovieModalCancelBtn = document.getElementById(
      "add-movie-modal__cancel-btn"
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
    this.addMovieModalAddBtn.addEventListener("click", () => {
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
  }

  init() {
    this.setupAddMovieBtn();
    this.setupModalAddBtn();
    this.setupModalCancelBtn();

    console.log(this.addMovieModalAddBtn, this.addMovieModalCancelBtn);
    console.log(this.libraryReference);
  }
}

class App {
  static init() {
    const library = new Library();
    const renderer = new DisplayController(library);
    library.addFilm(
      library.createFilm(
        "Lord of the Rings: The Fellowship of the Ring",
        "2001",
        "Peter Jackson"
      )
    );

    console.log(library.list[0].title);
  }
}

App.init();
