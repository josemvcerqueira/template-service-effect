#!/usr/bin/env bash
# why: the merge check. Hooks, CI and people all run this same file, and every step must pass.
set -euo pipefail
cd "$(dirname "$0")/.."
step() { printf '\n== %s ==\n' "$1"; }
step "1/7 standard";           bunx ip-standards-verify
step "2/7 oxfmt";              bunx oxfmt --check .
step "3/7 oxlint";             bunx oxlint --deny-warnings src
step "4/7 tsc";                bunx tsc
step "5/7 effect diagnostics"; bunx effect-language-service diagnostics --project tsconfig.json
step "6/7 knip";               bunx knip --no-progress
step "7/7 bun test";           bun test
