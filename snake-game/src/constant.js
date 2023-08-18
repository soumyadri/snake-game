export const initialSnakeDetails = [
      { x: 5, y: 5 },
];

export const boxLength = 16;

export const getRandomFoodPosition = () => ({
      x: Math.floor(Math.random() * boxLength),
      y: Math.floor(Math.random() * boxLength),
});