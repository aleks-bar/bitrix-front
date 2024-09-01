import fs from "node:fs";
import {resolve} from "path";

export const getDirectoriesByPath = (path: string): string[] => {
  if(fs.existsSync(path)) {
    return fs.readdirSync(path, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name)
  } else {
    throw new Error( `[getDirectoriesByPath]:неверный_путь - ${path}`)
  }
}

export const getRollupInputFromDirectory = (path: string) => {
  const inputs: Record<string, string> = {}

  getDirectoriesByPath(path).forEach(pageName => {
    const pageEntryFilePath = resolve(path, pageName, 'index.html');
    if (fs.existsSync(pageEntryFilePath)) {
      inputs[ pageName ] = pageEntryFilePath
    }
  })
  return inputs
}