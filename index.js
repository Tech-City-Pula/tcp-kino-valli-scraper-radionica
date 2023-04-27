import axios from "axios";
import * as cheerio from "cheerio";
import chalk from "chalk";
import Table from "table";

// It's not fun if all the code is already written
async function getKinoValliHTML() {
  const res = await axios.get("https://www.kinovalli.net/svi-programi");

  const html = res.data;

  return html;
}

async function getMoviesFromHTML(html) {
  const $ = cheerio.load(html);

  const movies = $(".amy-movie-item.entry-item")
    .map((i, el) => {
      const front = $(el).find(".amy-movie-item-front");
      const back = $(el).find(".amy-movie-item-back");

      const country = back
        .find(".amy-movie-field-language .amy-movie-custom-field-content")
        .text()
        .trim();
      const countryMatch = country.match(/(.+), (\d{4})\.$/);

      return {
        title: back.find(".amy-movie-field-title a").text(),
        duration: back.find(".amy-movie-field-duration").text().trim(),
        description: back.find(".amy-movie-field-desc").text().trim(),
        country: countryMatch ? countryMatch[1] : country,
        year: countryMatch ? countryMatch[2] : null,
        genre: back
          .find(".amy-movie-field-amy_genre .amy-movie-custom-field-content a")
          .map((i, genreEl) => $(genreEl).text())
          .get(),
        actors: back
          .find(".amy-movie-field-amy_actor .amy-movie-custom-field-content a")
          .map((i, actorEl) => $(actorEl).text())
          .get(),
        director: back
          .find(
            ".amy-movie-field-amy_director .amy-movie-custom-field-content a"
          )
          .map((i, directorEl) => $(directorEl).text())
          .get(),

        poster: front.find(".amy-movie-item-poster img").attr("src"),
        showtimes: $(el)
          .find(".entry-showtime .st-item")
          .map((i, showtimeEl) =>
            $(showtimeEl).find(".st-title label").text().trim()
          )
          .get(),
      };
    })
    .get();

  return movies;
}

function displayMoviesOnScreen(movies) {
  const data = [
    [
      chalk.yellow("Title"),
      chalk.yellow("Duration"),
      chalk.yellow("Country"),
      // chalk.yellow('Year'),
      chalk.yellow("Genres"),
      // chalk.yellow('Actors'),
      // chalk.yellow('Director'),
      chalk.yellow("Showtimes"),
    ],
    ...movies.map((movie) => [
      chalk.green(movie.title),
      movie.duration,
      movie.country,
      // movie.year || '',
      movie.genre.join(", "),
      // movie.actors.join(', '),
      // movie.director.join(', '),
      movie.showtimes.join("\n"),
    ]),
  ];

  const tableConfig = {
    border: Table.getBorderCharacters("norc"),
    columnDefault: {
      paddingLeft: 0,
      paddingRight: 1,
    },
    drawHorizontalLine: (index, size) => {
      return index === 0 || index === 1 || index === size;
    },
  };

  const table = Table.table(data, tableConfig);

  console.log(table);
}

async function main() {
  const html = await getKinoValliHTML();
  const movies = await getMoviesFromHTML(html);

  displayMoviesOnScreen(movies);
}

main();
