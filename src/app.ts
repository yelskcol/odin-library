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

class DOMHandler {
  private addMovieBtn: HTMLElement;
  private backdrop: HTMLElement;

  private addMovieModal: HTMLElement;
  constructor() {
    this.addMovieBtn = document.getElementById(
      "js-add-movie-btn"
    ) as HTMLInputElement;
    this.backdrop = document.querySelector(".backdrop") as HTMLElement;
    this.addMovieModal = document.querySelector(
      ".add-movie-modal"
    ) as HTMLElement;
    this.setupAddMovieBtn();
  }

  setupAddMovieBtn() {
    this.addMovieBtn.addEventListener("click", () => {
      this.openMovieModal();
      this.toggleBackdrop();
    });
  }

  openMovieModal() {
    this.addMovieModal.classList.toggle("add-movie-modal--hidden");
    this.addMovieModal.classList.toggle("add-movie-modal--visible");
  }

  toggleBackdrop() {
    this.backdrop.classList.toggle("backdrop--visible");
    this.backdrop.classList.toggle("backdrop--hidden");
  }
}

class App {
  static init() {
    const library = new Library();
    const renderer = new DOMHandler();
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
