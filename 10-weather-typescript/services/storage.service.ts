import { homedir } from "os";
import { join } from "path";
import { promises } from "fs";

const STORAGE_DICTONARY = {
  token: "token",
  city: "city",
  lang: "lang",
} as const;

interface StorageData {
  token: string;
  city: string[];
  lang: string;
}

const filePath = join(homedir(), "weather-data.json");

const isExsist = async (pathToFile: string) => {
  try {
    await promises.stat(pathToFile);
    return true;
  } catch {
    return false;
  }
};

const setKeyValue = async <K extends keyof StorageData>(
  key: K,
  value: StorageData[K]
) => {
  let data: Partial<StorageData> = {};
  const hasFile = await isExsist(filePath);
  if (hasFile) {
    const file = await promises.readFile(filePath, "utf-8");
    data = JSON.parse(file) as Partial<StorageData>;
  }
  data[key] = value;
  await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async <K extends keyof StorageData>(
  key: K
): Promise<StorageData[K] | undefined> => {
  const hasFile = await isExsist(filePath);
  if (!hasFile) {
    return undefined;
  }
  const data = await promises.readFile(filePath, "utf-8");
  const dataObj = JSON.parse(data) as Partial<StorageData>;
  return dataObj[key];
};

export { setKeyValue, getKeyValue, STORAGE_DICTONARY };
