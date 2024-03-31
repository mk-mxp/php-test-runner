#!/usr/bin/env bash

set -euo pipefail

PHPUNIT_BIN="./bin/phpunit-10.phar"
XML_RESULTS='results.xml'
JSON_RESULTS='results.json'
# shellcheck disable=SC2034 # Modifies XDebug behaviour when invoking PHP
XDEBUG_MODE='off'

function main {
  local output=""
  local test_files=""
  local -i phpunit_exit_code

  # local exercise_slug="${1}"
  local solution_dir="${2}"
  local output_dir="${3}"
  test_files=$(find "${solution_dir}" -type f -name '*Test.php' | tr '\n' ' ')

  set +e
  if ! output=$(php -l "${solution_dir}"/*.php 2>&1 1>/dev/null); then
    jo version=3 status=error message="${output/"$solution_dir/"/""}" tests="[]" > "${output_dir%/}/${JSON_RESULTS}"
    return 0;
  fi

  output=$(eval "${PHPUNIT_BIN}" \
    -d memory_limit=300M \
    --log-junit "${output_dir%/}/${XML_RESULTS}" \
    --no-configuration \
    --do-not-cache-result \
    "${test_files%%*( )}" 2>&1)
  phpunit_exit_code=$?
  set -e

  # This is only a theoretical failure case. This exit code is generated, when
  # PHPUnit fails to catch some issue in its internals. It cannot be provoked
  # by us for testing our code
  if [[ "${phpunit_exit_code}" -eq 255 ]]; then
    jo version=3 status=error message="${output/"$solution_dir/"/""}" tests="[]" > "${output_dir%/}/${JSON_RESULTS}"
    return 0;
  fi

  php junit-handler/run.php \
    "${output_dir%/}/${XML_RESULTS}" \
    "${output_dir%/}/${JSON_RESULTS}"
}

function installed {
  local cmd

  cmd=$(command -v "${1}")

  [[ -n "${cmd}" ]] && [[ -f "${cmd}" ]]
  return ${?}
}

function die {
  >&2 echo "❌ Fatal: $*"
  exit 1
}

if [[ -z "${1:-}" ]]; then
  die "Missing exercise slug"
fi

if [[ -z "${2:-}" ]]; then
  die "Missing exercise solution directory path"
elif [[ ! -d "${2}" ]]; then
  die "Exercise solution directory does not exist"
fi

if [[ -z "${3:-}" ]]; then
  die "Missing exercise test output path"
elif [[ ! -d "${3}" ]]; then
  die "Exercise test output directory does not exist"
fi

deps=("${PHPUNIT_BIN}" tr jo php)
for dep in "${deps[@]}"; do
  installed "${dep}" || die "Missing '${dep}'"
done

main "$@"; exit
