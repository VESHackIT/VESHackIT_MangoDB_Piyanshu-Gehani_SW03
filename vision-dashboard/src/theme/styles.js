export const globalStyles = {
  colors: {
    gray: {
      700: "#1f2733",
    },
    brand: {
      50: "#00b38c",
      100: "#00b38c",
      200: "#00b38c",
      300: "#00b38c",
      400: "#00b38c",
      500: "#00b38c",
      600: "#00b38c",
      700: "#00b38c",
      800: "#00b38c",
      900: "#00b38c"
    },
  },
  styles: {
    global: (props) => ({
      body: {
        fontFamily: "Plus Jakarta Display",
      },
      "*::placeholder": {
        color: "gray.400",
      },
      html: {
        fontFamily: "Plus Jakarta Display",
      },
    }),
  },
};
