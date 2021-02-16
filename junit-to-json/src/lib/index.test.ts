export {}
import { load } from 'cheerio'
import { parseTestCase, parseTestSuite, parseTestSuites } from './index'

describe('parseTestCase', () => {
  test('parses passing test', () => {
    const xml = `
      <testcase name="test1"/>
    `
    const testCaseEl = load(xml)('testcase')
    const result = parseTestCase(testCaseEl)

    expect(result).toEqual({ name: 'test1', status: 'pass', output: '' })
  })

  test('parses passing test with system output', () => {
    const xml = `
      <testcase name="test2">
        <system-out>Hello World!</system-out>
      </testcase>
    `
    const testCaseEl = load(xml)('testcase')
    const result = parseTestCase(testCaseEl)

    expect(result).toEqual({
      name: 'test2',
      status: 'pass',
      output: 'Hello World!',
    })
  })

  test('parses failing test', () => {
    const xml = `
      <testcase name="test3"/>
        <failure>This is a failure message</failure>
      </testcase>
    `
    const testCaseEl = load(xml)('testcase')
    const result = parseTestCase(testCaseEl)

    expect(result).toEqual({
      name: 'test3',
      status: 'fail',
      message: 'This is a failure message',
      output: '',
    })
  })

  test('parses failing test with system output', () => {
    const xml = `
      <testcase name="test4"/>
        <failure>This is a failure message</failure>
        <system-out>Goodbye World!</system-out>
      </testcase>
    `
    const testCaseEl = load(xml)('testcase')
    const result = parseTestCase(testCaseEl)

    expect(result).toEqual({
      name: 'test4',
      status: 'fail',
      message: 'This is a failure message',
      output: 'Goodbye World!',
    })
  })

  test('parses erroring test', () => {
    const xml = `
      <testcase name="test5"/>
        <error type="RuntimeException">This is an error message</error>
      </testcase>
    `
    const testCaseEl = load(xml)('testcase')
    const result = parseTestCase(testCaseEl)

    expect(result).toEqual({
      name: 'test5',
      status: 'error',
      message: 'This is an error message',
      output: '',
    })
  })

  test('parses erroring test', () => {
    const xml = `
      <testcase name="test6"/>
        <error type="RuntimeException">This is an error message</error>
        <system-out>Goodbye cruel world!</system-out>
      </testcase>
    `
    const testCaseEl = load(xml)('testcase')
    const result = parseTestCase(testCaseEl)

    expect(result).toEqual({
      name: 'test6',
      status: 'error',
      message: 'This is an error message',
      output: 'Goodbye cruel world!',
    })
  })
})

describe('parseTestSuite', () => {
  test('parses correctly', () => {
    const xml = `
      <testsuite name="HelloWorldTest" file="/home/tim/Projects/exercism/php-test-runner/test/hello-world/HelloWorldTest.php" tests="31" assertions="30" errors="1" warnings="0" failures="15" skipped="0" time="0.001204"/>
    `
    const testSuiteEl = load(xml)('testsuite')
    const result = parseTestSuite(testSuiteEl)

    expect(result).toEqual({
      tests: 31,
      assertions: 30,
      errors: 1,
      warnings: 0,
      failures: 15,
      skipped: 0,
    })
  })
})

describe('parseTestSuites', () => {
  test('parses testsuites with 0 testsuites', () => {
    const xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <testsuites />
    `
    const $ = load(xml)
    const result = parseTestSuites($)

    expect(result).toEqual([])
  })

  test('parses test suite with 1 testsuite, 0 test cases', () => {
    const xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <testsuites>
        <testsuite name="HelloWorldTest" file="/opt/php-test-runner/test/hello-world/HelloWorldTest.php" tests="0" assertions="0" errors="0" warnings="0" failures="0" skipped="0" time="0.000087" />
      </testsuites>
    `
    const $ = load(xml)
    const result = parseTestSuites($)

    expect(result).toEqual([
      {
        assertions: 0,
        errors: 0,
        failures: 0,
        skipped: 0,
        testCases: [],
        tests: 0,
        warnings: 0,
      },
    ])
  })

  test('parses test suite with 1 testsuite, 1 test cases', () => {
    const xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <testsuites>
        <testsuite name="HelloWorldTest" file="/opt/php-test-runner/test/hello-world/HelloWorldTest.php" tests="1" assertions="0" errors="1" warnings="0" failures="0" skipped="0" time="0.000087">
          <testcase name="testAssertEqualsPassing" class="HelloWorldTest" classname="HelloWorldTest" file="/opt/php-test-runner/test/hello-world/HelloWorldTest.php" line="10" assertions="0" time="0.000087">
            <error type="Error">HelloWorldTest::testAssertEqualsPassing
      Error: Call to undefined function helloWorld()</error>
          </testcase>
        </testsuite>
      </testsuites>
    `
    const $ = load(xml)
    const result = parseTestSuites($)

    expect(result).toEqual([
      {
        assertions: 0,
        errors: 1,
        failures: 0,
        skipped: 0,
        testCases: [
          {
            message:
              'HelloWorldTest::testAssertEqualsPassing\n      Error: Call to undefined function helloWorld()',
            name: 'testAssertEqualsPassing',
            output: '',
            status: 'error',
          },
        ],
        tests: 1,
        warnings: 0,
      },
    ])
  })
})
