/**
 * Library Catalog — Modern JS (ES6+) version
 * Same behavior as the classic-loop version, rewritten with
 * array methods, destructuring, arrow functions and template literals.
 */

const rawCatalogCards = [
  "From a Buick 8 | King, Stephen | 2002 | Shelf K7",
  "The Shining | King, Stephen | 1977 | Shelf K1",
  "The Stand | King, Stephen | 1978 | Shelf K2",
  "It | King, Stephen | 1986 | Shelf K3",
  "Misery | King, Stephen | 1987 | Shelf K4",
  "Do Androids Dream of Electric Sheep? | Dick, Philip K. | 1968 | Shelf D5",
  "I, Robot | Asimov, Isaac | 1950 | Shelf A8",
  "Foundation | Asimov, Isaac | 1951 | Shelf A9",
  "Dune | Herbert, Frank | 1965 | Shelf H3",
  "Neuromancer | Gibson, William | 1984 | Shelf G8",
  "Snow Crash | Stephenson, Neal | 1992 | Shelf S6",
  "The Martian | Weir, Andy | 2011 | Shelf W5",
  "Ender's Game | Card, Orson Scott | 1985 | Shelf C2",
  "The Hitchhiker's Guide to the Galaxy | Adams, Douglas | 1979 | Shelf A1",
  "Ready Player One | Cline, Ernest | 2011 | Shelf C7",
  "The Dark Tower: The Gunslinger | King, Stephen | 1982 | Shelf K5",
  // edge cases: missing data
  "Unknown Title |  | 1975 | Shelf X1",
  "Mysterious Manuscript | Unknown Author |  | Shelf Z9",
  "Ancient Scroll | Anonymous | 850 | ",
];

/**
 * Parses a single raw "pipe-delimited" catalog card into a book object.
 * @param {string} rawString
 * @returns {{title: string, author: string, year: number|"Unknown", location: string}}
 */
const parseCard = (rawString) => {
  const [title, author, year, location] = rawString.split("|").map((part) => part.trim());

  return {
    title: title || "Unknown",
    author: author || "Unknown",
    year: year ? parseInt(year, 10) : "Unknown",
    location: location || "Unknown",
  };
};

/**
 * Parses the full raw catalog into book objects.
 * @param {string[]} rawCards
 * @returns {object[]}
 */
const parseCatalog = (rawCards) => rawCards.map(parseCard);

const catalog = parseCatalog(rawCatalogCards);

/**
 * Finds books whose author matches (partial, case-insensitive) the search term.
 * @param {object[]} catalog
 * @param {string} author
 * @returns {object[]}
 */
const findByAuthor = (catalog, author) => {
  const searchTerm = author.toLowerCase();
  return catalog.filter((book) => book.author.toLowerCase().includes(searchTerm));
};

/**
 * Groups the catalog by decade (e.g. "1980s"), with "Unknown" as a bucket
 * for books with no known year.
 * @param {object[]} catalog
 * @returns {Record<string, object[]>}
 */
const groupByDecade = (catalog) =>
  catalog.reduce((grouped, book) => {
    const decadeKey = book.year === "Unknown" ? "Unknown" : `${Math.floor(book.year / 10) * 10}s`;
    (grouped[decadeKey] ??= []).push(book);
    return grouped;
  }, {});

const byDecade = groupByDecade(catalog);

/**
 * Renders a single catalog entry as a formatted text block.
 * @param {object} entry
 * @returns {string}
 */
const renderEntry = ({ title = "Unknown", author = "Unknown", year = "Unknown", location = "Unknown" }) => {
  const divider = "-".repeat(25);
  return `${divider}\nTitle: ${title}\nAuthor: ${author}\nYear: ${year}\nLocation: ${location}\n${divider}`;
};

console.log(renderEntry(catalog[0]));

/**
 * Checks whether a book entry has all required fields filled in
 * (none missing and none equal to the "Unknown" placeholder).
 * @param {object} entry
 * @returns {boolean}
 */
const validateEntry = (entry) =>
  ["title", "author", "year", "location"].every(
    (field) => field in entry && entry[field] && entry[field] !== "Unknown"
  );

/** @param {object[]} catalog */
const exportToJSON = (catalog) => JSON.stringify(catalog, null, 2);

/** @param {object[]} catalog */
const exportToCSV = (catalog) => {
  const header = "Title,Author,Year,Location";
  const rows = catalog.map(
    ({ title, author, year, location }) => `"${title}","${author}",${year},"${location}"`
  );
  return [header, ...rows].join("\n");
};

console.log(exportToCSV(catalog));
console.log(catalog.length);
console.log(Object.keys(byDecade).length);

const knownYears = catalog.map((book) => book.year).filter((year) => year !== "Unknown");
const oldestYear = Math.min(...knownYears);
const newestYear = Math.max(...knownYears);

console.log(oldestYear);
console.log(newestYear);

export { parseCard, parseCatalog, findByAuthor, groupByDecade, renderEntry, validateEntry, exportToJSON, exportToCSV };
