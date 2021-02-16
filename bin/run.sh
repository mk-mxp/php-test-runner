#!/usr/bin/env bash

set -euo pipefail

PHPUNIT_BIN="./bin/phpunit-9.phar"

function main {
  echo "running"
}

function installed {
  cmd=$(command -v "${1}")

  [[ -n "${cmd}" ]] && [[ -f "${cmd}" ]]
  return ${?}
}

function die {
  >&2 echo "❌ Fatal: ${@}"
  exit 1
}

if [[ -z "${1:-}" ]]; then
  die "Missing exercise slug"
fi

if [[ -z "${2:-}" ]]; then
  die "Missing exercise solution directory path"
elif [ ! -d "${2}" ]; then
  die "Exercise solution directory does not exist"
fi

if [[ -z "${3:-}" ]]; then
  die "Missing exercise test output path"
elif [ ! -d "${3}" ]; then
  die "Exercise test output directory does not exist"
fi

deps=("${PHPUNIT_BIN}" node)
for dep in "${deps[@]}"; do
  installed "${dep}" || die "Missing '${dep}'"
done

main "$@"; exit