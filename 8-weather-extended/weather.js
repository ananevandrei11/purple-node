#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import {
  printHelp,
  printError,
  printSuccess,
  printWeather,
} from "./services/log.service.js";
import {
  setKeyValue,
  getKeyValue,
  STORAGE_DICTONARY,
} from "./services/storage.service.js";
import { getWeather } from "./services/api.service.js";
import { t } from "./locales/i18next.init.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError(t("token.tokenUndefinded"));
    return;
  }
  try {
    await setKeyValue(STORAGE_DICTONARY.token, token);
    printSuccess(t("token.tokenSaved"));
  } catch (e) {
    printError(e?.message ?? t("somethingWentWrong"));
  }
};

const saveCity = async (city) => {
  try {
    await setKeyValue(STORAGE_DICTONARY.city, [].concat(city));
    printSuccess(t("city.citySaved"));
  } catch (e) {
    printError(e?.message ?? t("somethingWentWrong"));
  }
};

const removeCity = async (city) => {
  try {
    const cities = (await getKeyValue(STORAGE_DICTONARY.city)) ?? [];
    const next = cities.filter((c) => ![].concat(city).includes(c));
    await setKeyValue(STORAGE_DICTONARY.city, next);
    printSuccess(t("city.cityRemoved"));
  } catch (e) {
    printError(e?.message ?? t("somethingWentWrong"));
  }
};

const saveLang = async (lang) => {
  if (!lang.length) {
    printError(t("lang.langUndefinded"));
    return;
  }
  try {
    await setKeyValue(STORAGE_DICTONARY.lang, lang);
    printSuccess(t("lang.langSaved"));
  } catch (e) {
    printError(e?.message ?? t("somethingWentWrong"));
  }
};

const getForcast = async () => {
  try {
    const cities = await getKeyValue(STORAGE_DICTONARY.city) ?? [];
    const weathers = await Promise.all(cities.map((city) => getWeather(city)));
    printWeather(weathers);
  } catch (e) {
    printError(e.message ?? t("somethingWentWrong"));
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    return saveCity(args.s);
  }
  if (args.r) {
    return removeCity(args.r);
  }
  if (args.t) {
    return saveToken(args.t);
  }
  if (args.l) {
    return saveLang(args.l);
  }
  return getForcast();
};

initCLI();
