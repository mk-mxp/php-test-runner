type ExercismTestRunnerResult =
  | ExercismTestRunnerPass
  | ExercismTestRunnerFail
  | ExercismTestRunnerError

type ExercismTestRunnerPass = {
  version: 2
  tests: TestCase[]
  status: 'pass'
  message?: null
}

type ExercismTestRunnerFail = {
  version: 2
  tests: TestCase[]
  status: 'fail'
  message?: null
}

type ExercismTestRunnerError = {
  version: 2
  tests: TestCase[]
  status: 'error'
  message: string
}

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
