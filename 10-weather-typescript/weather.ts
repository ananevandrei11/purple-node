#!/usr/bin/env node
import { getArgs } from "./helpers/args.ts";
import {
  printHelp,
  printError,
  printSuccess,
  printWeather,
} from "./services/log.service.ts";
import {
  setKeyValue,
  getKeyValue,
  STORAGE_DICTONARY,
} from "./services/storage.service.ts";
import { getWeather } from "./services/api.service.ts";
import { t } from "./locales/i18next.init.ts";

const saveToken = async (token: string) => {
  if (!token.length) {
    printError(t("token.tokenUndefinded"));
    return;
  }
  try {
    await setKeyValue(STORAGE_DICTONARY.token, token);
    printSuccess(t("token.tokenSaved"));
  } catch (e: unknown) {
    const errMessage =
      e instanceof Error ? e?.message : t("somethingWentWrong");
    printError(errMessage);
  }
};

const saveCity = async (city: string | string[]) => {
  const cities = Array.isArray(city) ? city : [city];
  try {
    await setKeyValue(STORAGE_DICTONARY.city, cities);
    printSuccess(t("city.citySaved"));
  } catch (e: unknown) {
    const errMessage =
      e instanceof Error ? e?.message : t("somethingWentWrong");
    printError(errMessage);
  }
};

const removeCity = async (city: string | string[]) => {
  const toRemove = Array.isArray(city) ? city : [city];
  try {
    const cities = (await getKeyValue(STORAGE_DICTONARY.city)) ?? [];
    const next = cities.filter((c) => !toRemove.includes(c));
    await setKeyValue(STORAGE_DICTONARY.city, next);
    printSuccess(t("city.cityRemoved"));
  } catch (e: unknown) {
    const errMessage =
      e instanceof Error ? e?.message : t("somethingWentWrong");
    printError(errMessage);
  }
};

const saveLang = async (lang: string) => {
  if (!lang.length) {
    printError(t("lang.langUndefinded"));
    return;
  }
  try {
    await setKeyValue(STORAGE_DICTONARY.lang, lang);
    printSuccess(t("lang.langSaved"));
  } catch (e: unknown) {
    const errMessage =
      e instanceof Error ? e?.message : t("somethingWentWrong");
    printError(errMessage);
  }
};

const getForcast = async () => {
  try {
    const cities = (await getKeyValue(STORAGE_DICTONARY.city)) ?? [];
    const weathers = await Promise.all(cities.map((city) => getWeather(city)));
    printWeather(weathers);
  } catch (e: unknown) {
    const errMessage =
      e instanceof Error ? e?.message : t("somethingWentWrong");
    printError(errMessage);
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
