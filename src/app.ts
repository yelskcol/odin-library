class Library {
  list;
  constructor() {
    this.list = [];
  }

  static createFilm(title: string, year: string, director: string) {
    const film = new Film(title, year, director);
    return film;
  }

  addFilm(film: Film) {
    this.list.push(film);
  }
}

class Film {
  constructor(
    public title: string,
    public releaseDate: string,
    public director: string
  ) {}
}

class App {
  static init() {
    const library = new Library();
    library.addFilm(
      Library.createFilm(
        "Lord of the Rings: The Fellowship of the Ring",
        "2001",
        "Peter Jackson"
      )
    );

    console.log(library.list);
  }
}

App.init();
