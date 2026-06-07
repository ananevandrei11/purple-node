import { homedir } from "os";
import { join } from "path";
import { promises } from "fs";

const STORAGE_DICTONARY = {
  token: "token",
  city: "city",
  lang: "lang"
};

const filePath = join(homedir(), "weather-data.json");

const isExsist = async (pathToFile) => {
  try {
    await promises.stat(pathToFile);
    return true;
  } catch {
    return false;
  }
};

const setKeyValue = async (key, value) => {
  let data = {};
  const hasFile = await isExsist(filePath);
  if (hasFile) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }
  data[key] = value;
  await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key) => {
  const hasFile = await isExsist(filePath);
  if (!hasFile) {
    return undefined;
  }
  const data = await promises.readFile(filePath);
  const dataObj = JSON.parse(data);
  return dataObj?.[key];
};

export { setKeyValue, getKeyValue, STORAGE_DICTONARY };
