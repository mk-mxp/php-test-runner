![JUnit to JSON Tests](https://github.com/exercism/php-test-runner/workflows/Test%20JUnit-to-JSON/badge.svg) ![Smoke Test](https://github.com/exercism/php-test-runner/workflows/Smoke%20Test/badge.svg) ![Tooling image pushed](https://github.com/exercism/php-test-runner/workflows/Deploy/badge.svg)

# PHP Test Runner

TODO: This seems to be outdated, but I don't know the current state:

This is a minimal test runner for Exercism's v3 platform.
It meets the minimal spec for testing _practice exercises_.
It does not currently parse the test case code being run, therefore it does not meet the standard for testing _concept exercises_.

## Basic components

### Docker image

The website uses isolated docker images to run untrusted code in a sandbox.
Image consists of PHP 8.2.7 (PHPUnit 9/10).
All final assets are built into the image, because the image does not have network access once in use.

Includes PHP extensions: ds, intl

### Test runner

Test running a solution is coordinated by a bash script at `bin/run.sh` taking 3 positional arguments:

```text
bin/run.sh <test-slug> <directory path to solution> <directory path for output>
```

This is what runs inside the production Docker image when students submit their code.

### Testing the test runner

In `./tests/` are golden tests to verify test runner behaves as expected.
The CI uses `bin/run-tests.sh` to execute them.

### Running tests in Docker locally

This is the recommended way to use this locally.
Use `bin/run-in-docker.sh <test-slug> <directory path to solution> <directory path for output>` and `bin/run-tests-in-docker.sh` to locally build and run the Docker image.

### JUnit to JSON

PHPUnit can natively output tests run to JUnit XML format, but Exercism requires output in json format.
A PHP-based app is located in the `junit-handler` folder.
It provides a translation layer from one format to the other incorporating `task_id` identification and test code inclusion.
