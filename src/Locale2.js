/* useContext Hook with broken updater in value */

import React, { useContext, useState, memo } from "react";
import { render } from "react-dom";
import { CDNFlagIcon } from "react-flag-kit";
import "./index.css";

const ThemeContext = React.createContext();

const localeMap = {
  "en-US": { locale: "en-US", flag: "US", content: "Hello, World!" },
  "fr-FR": { locale: "fr-FR", flag: "FR", content: "Bonjour le monde!" },
  "es-ES": { locale: "es-ES", flag: "ES", content: "¡Hola Mundo!" }
};

const LocaleSwitcher = memo(props => {
  console.log("LocaleSwitcher");
  const [count, setCount] = useState(0);
  const [locale, setLocale] = useState(localeMap["en-US"]);

  // BUG
  return (
    <ThemeContext.Provider
      value={{
        state: locale,
        updateLocale: e => setLocale(localeMap[e.target.value])
      }}
    >
      {props.children}
      <button onClick={() => setCount(count + 1)}>
        Shouldn't Rerender: {count}
      </button>
    </ThemeContext.Provider>
  );
});

const LocaleSelect = memo(() => {
  console.log("LocaleSelect");
  const context = useContext(ThemeContext);
  return (
    <select value={context.state.locale} onChange={context.updateLocale}>
      <option value="en-US">English</option>
      <option value="fr-FR">French</option>
      <option value="es-ES">Spanish</option>
    </select>
  );
});

const LocaleFlag = memo(() => {
  console.log("LocaleFlag");
  const context = useContext(ThemeContext);
  return <CDNFlagIcon code={context.state.flag} size={256} />;
});

const LocaleContent = memo(() => {
  console.log("LocaleContent");
  const context = useContext(ThemeContext);
  return <h1>{context.state.content}</h1>;
});

const App = () => {
  console.log("App");
  return (
    <LocaleSwitcher>
      <LocaleSelect />
      <LocaleFlag />
      <LocaleContent />
    </LocaleSwitcher>
  );
};

render(<App />, document.getElementById("⚛️"));
