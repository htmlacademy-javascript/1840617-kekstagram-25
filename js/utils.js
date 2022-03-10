const getRandomInt = (min, max) => {
  if (min > max) {[min, max] = [max, min];}
  return Math.floor((Math.random() * (max - min + 1) + min));
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export {getRandomInt};
export {shuffleArray};
