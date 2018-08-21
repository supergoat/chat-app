/* Color Definitions
============================================================================= */
const NAMED_COLORS: COLOR_TYPES = {
  black: '#000000',
  white: "#FFFFFF",
  osloGrey: '#7e8890',
  silver: '#CDCDCD',
  gallery: '#EEEEEE',
  azure: '#2E60B0',
  stRopaz: '#2E589B',
  riverBed: '#424B5C',
  oxfordBlue: '#333C4E',
  mariner: '#2277D8',
  alabaster: '#F9F9F9',
  alabasterLight: '#FBFBFB',
  apple: '#32CD32',
  forestGreen: '#2BAD2B',
  orinoco: '#DFF8C8',
  bone: '#E9DBCE'
};

/* Color Type Definitions
============================================================================= */
type COLOR_TYPES =
  "white"
  | "osloGrey"
  | "silver"
  | "gallery"
  | "azure"
  | "stRopaz"
  | "riverBed"
  | "oxfordBlue"
  | "alabaster"
  | "alabasterLight"
  | "apple"
  | "forestGreen"

/* Export
============================================================================= */
export default {
  ...NAMED_COLORS
}
