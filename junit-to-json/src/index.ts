import * as fs from 'fs'
import { processXmlResult } from './lib'

const [, , xmlResultPath, jsonResultPath] = process.argv

console.log(`Converting '${xmlResultPath}' to ${jsonResultPath}`)

const xml = fs.readFileSync(xmlResultPath)
const result = processXmlResult(xml)
console.log(result)
