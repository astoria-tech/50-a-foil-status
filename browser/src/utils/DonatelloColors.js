import Color from 'color';


/*
Other colors:
Orange: `hsla(29, 100%, 50%, 1)`,
Blue: `hsla(212, 71%, 46%, 1)`,
Magento: `hsla(339, 74%, 57%, 1)`,
  Red: `hsla(7, 100%, 50%, 1)`,
*/

const colors = {
  Yellow: Color.hsl(51, 100, 50),
  Purple: Color.hsl(309, 45, 50),
  DeepPurple: Color.hsl(285, 39, 49),
  Green: Color.hsl(144, 43, 50),
  WarmGreen: Color.hsl(76, 56, 47),
};

const colorList = [
  colors.Green,
  colors.Yellow,
  colors.Purple,
  colors.DeepPurple,
  colors.WarmGreen,
];

// Not including the half green because it's not yellow enough
// Deterministically ordered to make bubble graph pretty (maybe move to that class?)
const colorTintList = [
  colors.Green,
  colors.Yellow,
  colors.Purple,
  colors.Purple.alpha(0.5),
  colors.DeepPurple,
  colors.DeepPurple.alpha(0.5),
  colors.WarmGreen,
  colors.WarmGreen.alpha(0.5)
];

const DonatelloColors = {
  Yellow: colors.Yellow,
  Purple: colors.Purple,
  DeepPurple: colors.DeepPurple,
  Green: colors.Green,
  WarmGreen: colors.WarmGreen,
  all: colorList,
  colorTints: colorTintList
}

export default DonatelloColors;