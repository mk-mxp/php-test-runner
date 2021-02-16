import { load } from 'cheerio'

type CheerioRoot = ReturnType<typeof load>
type CheerioSelection = ReturnType<CheerioRoot>

export function processXmlResult(xmlContent: Buffer): TestSuite[] {
  const $ = load(xmlContent)

  return parseTestSuites($)
}

export function parseTestSuites($: CheerioRoot) {
  return $('testsuites')
    .children()
    .toArray()
    .map((testSuiteEl) => {
      const selectedTestSuite = $(testSuiteEl)
      const testSuite = parseTestSuite(selectedTestSuite)

      testSuite.testCases = selectedTestSuite
        .children()
        .toArray()
        .map((testCase) => parseTestCase($(testCase)))

      return testSuite
    })
}

export function parseTestSuite(testSuiteEl: CheerioSelection): TestSuite {
  return {
    tests: Number(testSuiteEl.attr('tests')),
    assertions: Number(testSuiteEl.attr('assertions')),
    errors: Number(testSuiteEl.attr('errors')),
    warnings: Number(testSuiteEl.attr('warnings')),
    failures: Number(testSuiteEl.attr('failures')),
    skipped: Number(testSuiteEl.attr('skipped')),
  }
}

export function parseTestCase(testCaseEl: CheerioSelection): TestCase {
  const name = testCaseEl.attr('name') ?? null
  const failure = testCaseEl.find('failure')?.text() ?? null
  const error = testCaseEl.find('error')?.text() ?? null
  const systemOut = testCaseEl.find('system-out')?.text() ?? null

  if (!name) {
    throw new Error('Test name not found. Check test suite test names')
  }

  if (error) {
    return {
      name,
      status: 'error',
      message: error,
      output: systemOut,
    }
  }

  if (failure) {
    return {
      name,
      status: 'fail',
      message: failure,
      output: systemOut,
    }
  }

  return {
    name,
    status: 'pass',
    output: systemOut,
  }
}
