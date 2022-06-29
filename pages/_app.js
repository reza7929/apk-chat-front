import "../styles/globals.css";
import "@elastic/eui/dist/eui_theme_light.css";

import { EuiProvider } from "@elastic/eui";

function MyApp({ Component, pageProps }) {
  return (
    <EuiProvider>
      <Component {...pageProps} />
    </EuiProvider>
  );
}

export default MyApp;
