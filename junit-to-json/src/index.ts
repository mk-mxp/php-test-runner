import * as fs from 'fs'
import { processXmlResult } from './lib'

const [, , xmlResultPath, jsonResultPath] = process.argv

console.log('📋 Converting phpunit xml to json')
console.log(`🔸 Source: ${xmlResultPath}`)
console.log(`🔸 Destination: ${jsonResultPath}`)

const xml = fs.readFileSync(xmlResultPath)
const result = processXmlResult(xml)

fs.writeFileSync(jsonResultPath, JSON.stringify(result))

console.log('🏁 All done!')
