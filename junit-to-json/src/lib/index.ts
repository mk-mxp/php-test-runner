import { load } from 'cheerio'

export type CheerioRoot = ReturnType<typeof load>
export type CheerioSelection = ReturnType<CheerioRoot>

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
  const systemOut = testCaseEl.find('system-out')?.text() ?? null

  if (!name) {
    throw new Error('Test name not found. Check test suite test names')
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
