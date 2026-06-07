import chalk from "chalk";
import { t } from "../locales/i18next.init.js";

const colors = {
  help: "cyan",
  error: "red",
  succes: "green",
  weather: "yellowBright",
};

const printLines = (lines) => {
  console.log(lines.join("\n"));
};

const printHelp = () => {
  const lines = [
    chalk.bold[colors.help].bgBlack(t("help")),
    t("helpOptions.withoutParams"),
    t("helpOptions.city"),
    t("helpOptions.remove"),
    t("helpOptions.token"),
    t("helpOptions.lang"),
    t("helpOptions.help"),
  ];
  printLines(lines);
};

const printError = (error) => {
  const lines = [chalk.bold[colors.error].bgBlack(t("error")), error];
  printLines(lines);
};

const printSuccess = (message) => {
  const lines = [chalk.bold[colors.succes].bgBlack(t("success")), message];
  printLines(lines);
};

const weatherEmoji = {
  1000: "☀️", // Sunny / Clear (see is_day below)
  1003: "🌤️", // Partly cloudy
  1006: "☁️", // Cloudy
  1009: "☁️", // Overcast
  1030: "🌫️", // Mist
  1063: "🌦️", // Patchy rain possible
  1066: "🌨️", // Patchy snow possible
  1069: "🌨️", // Patchy sleet possible
  1072: "🌧️", // Patchy freezing drizzle possible
  1087: "⛈️", // Thundery outbreaks possible
  1114: "🌨️", // Blowing snow
  1117: "❄️", // Blizzard
  1135: "🌫️", // Fog
  1147: "🌫️", // Freezing fog
  1150: "🌦️", // Patchy light drizzle
  1153: "🌧️", // Light drizzle
  1168: "🌧️", // Freezing drizzle
  1171: "🌧️", // Heavy freezing drizzle
  1180: "🌦️", // Patchy light rain
  1183: "🌧️", // Light rain
  1186: "🌧️", // Moderate rain at times
  1189: "🌧️", // Moderate rain
  1192: "🌧️", // Heavy rain at times
  1195: "🌧️", // Heavy rain
  1198: "🌧️", // Light freezing rain
  1201: "🌧️", // Moderate or heavy freezing rain
  1204: "🌨️", // Light sleet
  1207: "🌨️", // Moderate or heavy sleet
  1210: "🌨️", // Patchy light snow
  1213: "🌨️", // Light snow
  1216: "🌨️", // Patchy moderate snow
  1219: "❄️", // Moderate snow
  1222: "❄️", // Patchy heavy snow
  1225: "❄️", // Heavy snow
  1237: "🧊", // Ice pellets
  1240: "🌦️", // Light rain shower
  1243: "🌧️", // Moderate or heavy rain shower
  1246: "🌧️", // Torrential rain shower
  1249: "🌨️", // Light sleet showers
  1252: "🌨️", // Moderate or heavy sleet showers
  1255: "🌨️", // Light snow showers
  1258: "❄️", // Moderate or heavy snow showers
  1261: "🧊", // Light showers of ice pellets
  1264: "🧊", // Moderate or heavy showers of ice pellets
  1273: "⛈️", // Patchy light rain with thunder
  1276: "⛈️", // Moderate or heavy rain with thunder
  1279: "⛈️", // Patchy light snow with thunder
  1282: "⛈️", // Moderate or heavy snow with thunder
};

const getWeatherEmoji = (code, isDay) => {
  if (code === 1000) return isDay ? "☀️" : "🌙";
  return weatherEmoji[code] ?? "🌡️";
};

const formatWeather = (weather) => {
  const { location, current } = weather;
  return [
    chalk.bold[colors.weather].bgBlack(` ${t("weather")} `),
    ` ${t("weatherOptions.location", { name: location.name, country: location.country })} `,
    ` ${t("weatherOptions.condition", {
      emoji: getWeatherEmoji(current.condition.code, current.is_day),
      text: current.condition.text,
    })} `,
    ` ${t("weatherOptions.temperature", { temp: current.temp_c, feelsLike: current.feelslike_c })} `,
    ` ${t("weatherOptions.humidity", { humidity: current.humidity })} `,
    ` ${t("weatherOptions.wind", { wind: current.wind_kph, dir: current.wind_dir })} `,
    ` ${t("weatherOptions.pressure", { pressure: current.pressure_mb })} `,
  ];
};

const printWeather = (weather) => {
  const list = Array.isArray(weather) ? weather : [weather];
  const lines = list.flatMap((w, i) => (i ? ["", ...formatWeather(w)] : formatWeather(w)));
  printLines(lines);
};

export { printHelp, printError, printSuccess, printWeather };
