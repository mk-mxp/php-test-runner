type ExercismTestRunnerResult = ExercismTestRunnerResultV2

type ExercismTestRunnerResultV2 = {
  version: 2
  tests: TestCase[]
} & (
  | {
      status: 'error'
      message: string
    }
  | {
      status: 'pass' | 'fail'
      message?: null
    }
)

type TestSuite = {
  tests: number
  assertions: number
  errors: number
  warnings: number
  failures: number
  skipped: number
  testCases?: TestCase[]
}

type TestCase = {
  name: string
  test_code?: string
  output?: string
} & (
  | {
      status: 'pass'
      message?: null
    }
  | {
      status: 'fail' | 'error'
      message: string
    }
)
