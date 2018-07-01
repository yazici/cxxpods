
const
  Fs = require('fs'),
  Path = require('path'),
  Yaml = require('js-yaml'),
  sh = require('shelljs'),
  _ = require("lodash")

function exists(path) {
  return sh.test('-f',path)
}

function isDirectory(path) {
  return sh.test('-d', path)
}

function mkdirs(path) {
  sh.mkdir('-p',path)
  return isDirectory(path)
}

function mkdirParents(path) {
  const parts = _.split(path,"/")
  parts.pop()
  const parentPath = parts.join("/")
  return mkdirs(parentPath)
}

function readFile(path) {
  if (!exists(path))
    throw `Unable to find: ${path}`
  
  return Fs.readFileSync(path,'utf-8')
}

function readFileJson(path) {
  return JSON.parse(readFile(path))
}

function readFileYaml(path) {
  return Yaml.safeLoad(readFile(path))
}

function readAsset(assetPath) {
  return readFile(Path.resolve(__dirname,"..","assets",assetPath))
}

function writeFile(path,content) {
  Fs.writeFileSync(path,content,'utf-8')
}



module.exports = {
  exists,
  isDirectory,
  mkdirs,
  mkdirParents,
  readAsset,
  readFile,
  readFileJson,
  readFileYaml,
  writeFile
}