import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import nock from "nock";
import * as tmdbService from "../tmdb.service";

use(chaiAsPromised);
const tmdbApi = nock("https://api.themoviedb.org/3");

describe("TMDB Service", () => {
  describe("searchMovie", () => {
    it("should return an array of movies", async () => {
      const query = "venom";

      const movies = await tmdbService.searchMovie(query);

      expect(movies).to.be.an("array");

      if (movies.length === 0) return;

      const movie = movies[0];

      expect(movie.id).to.be.a("number");
      expect(movie.overview).to.be.a("string");
      expect(movie.posterPath).to.be.a("string");
      expect(movie.releaseDate).to.be.a("string");
      expect(movie.title).to.be.a("string");
    });

    it("should throw error when movie results null / undefined", () => {
      const query = "Venom";
      const path = `/search/movie?language=en-US&query=${query}&page=1&include_adult=true`;
      tmdbApi.get(path).reply(200, { results: null });

      return expect(tmdbService.searchMovie(query)).to.eventually.be.rejected;
    });
  });
});
