import { Platform } from "react-native";

const theme = {
  colors: {
    light: '#fff',
    textPrimary: '#24292e',
    textSecondary: '#586069',
    bgcDarken: '#24292e',
    primary: '#0366d6',
    error: 'red',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      default: 'System',
      android: 'Roboto',
      ios: 'Arial'
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  }
};

export default theme;
