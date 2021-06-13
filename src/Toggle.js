import { useContext } from "react";
import { ThemeContext } from "./theme";

export const Toggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  function isDark() {
    return theme === "dark";
  }

  function toggleTheme(e) {
    setTheme(e.target.checked ? "dark" : "light");
  }

  return (
    <label className="mr-3 dark:text-gray-50">
      <input
        type="checkbox"
        checked={isDark()}
        onChange={(e) => toggleTheme(e)}
      />{" "}
      Dark Mode
    </label>
  );
};
