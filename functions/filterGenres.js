/**
 * @desc function to filter genres and create arrays of existin genres
 * @requires array with the all items
 */

module.exports = (arrAllItems, arrAllGenres) => {
  /**
   * @desc extract genres and create an array with the existing genres
   */
  const arrGenres = [];
  arrAllItems.map((x, i) => {
    return arrGenres.push(x.genre_ids);
  });

  /**
   * @desc creates unique arrays
   */

  const arrGenresFinal = [...new Set(arrGenres.flat())];

  /**
   * @desc create an array with the existing genres with name and id
   */

  const filteredGenres = [];

  arrAllGenres.map((x, i) => {
    for (let i = 0; i < arrGenresFinal.length; i++) {
      if (x.id === arrGenresFinal[i]) {
        filteredGenres.push(x);
      }
    }
  });

  return filteredGenres;
};
