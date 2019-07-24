/* useContext Hook with no updater in value */

import React, { createContext, useContext, useState } from "react";
import { render } from "react-dom";
import { CDNFlagIcon } from "react-flag-kit";
import "./index.css";

const ThemeContext = createContext();

const localeMap = {
  "en-US": { locale: "en-US", flag: "US", content: "Hello, World!" },
  "fr-FR": { locale: "fr-FR", flag: "FR", content: "Bonjour le monde!" },
  "es-ES": { locale: "es-ES", flag: "ES", content: "¡Hola Mundo!" }
};

function LocaleFlag() {
  const { flag } = useContext(ThemeContext);
  return <CDNFlagIcon code={flag} size={256} />;
}

function LocaleContent() {
  const { content } = useContext(ThemeContext);
  return <h1>{content}</h1>;
}

function App() {
  const [theme, setTheme] = useState(localeMap["en-US"]);
  return (
    <ThemeContext.Provider value={theme}>
      <select
        value={theme.locale}
        onChange={e => setTheme(localeMap[e.target.value])}
      >
        <option value="en-US">English</option>
        <option value="fr-FR">French</option>
        <option value="es-ES">Spanish</option>
      </select>
      <LocaleFlag />
      <LocaleContent />
    </ThemeContext.Provider>
  );
}

render(<App />, document.getElementById("⚛️"));
