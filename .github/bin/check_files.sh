#!/usr/bin/env bash

set -euo pipefail

function main {
  expected_files=(results.xml results.json)

  for file in ${expected_files[@]}; do
    if [[ ! -f "./test/${file}" ]]; then
      echo "🔥 expected ${file} to exist on successful run 🔥"
      exit 1
    else
      echo "✅ found ${file}"
    fi
  done

  echo "🏁 expected files present after successful run 🏁"
}

main "$@"; exit