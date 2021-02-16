import * as fs from 'fs'
import * as cheerio from 'cheerio'

import { parseTestSuite, parseTestCase, CheerioRoot } from './lib'

const [, , xmlResultPath, jsonResultPath] = process.argv

const xml = fs.readFileSync(xmlResultPath)
const $ = cheerio.load(xml)

const result = processXmlResult($)
console.log(result)

function processXmlResult($: CheerioRoot): TestSuite[] {
  return $('testsuite')
    .toArray()
    .map((testSuiteEl) => {
      const testSuite = parseTestSuite($(testSuiteEl))

      testSuite.testCases = $('testcase')
        .toArray()
        .map((testCase) => parseTestCase($(testCase)))

      return testSuite
    })
}
