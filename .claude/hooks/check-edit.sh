#!/usr/bin/env bash
# why: Claude Code PostToolUse hook. Formats the file Claude just wrote, lints the package and runs the Effect
# why: diagnostics on the file, so Claude reads the rule's fix-it message while it is still editing. Exit 2 sends stderr back to Claude.
set -uo pipefail
file=$(bun -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const i=JSON.parse(s).tool_input??{};process.stdout.write(i.file_path??"")})')
case "$file" in *.ts|*.tsx|*.js|*.mjs|*.json|*.md) ;; *) exit 0 ;; esac
[ -f "$file" ] || exit 0
cd "${CLAUDE_PROJECT_DIR:-.}"
bunx oxfmt "$file" >/dev/null 2>&1 || true
case "$file" in *.json|*.md) exit 0 ;; esac
if ! out=$(bunx oxlint --deny-warnings src 2>&1); then
  printf 'Lint failed after your edit. Fix these before moving on:\n%s\n' "$out" >&2
  exit 2
fi
case "$file" in *.ts) ;; *) exit 0 ;; esac
if ! out=$(bunx effect-language-service diagnostics --file "$file" 2>&1); then
  printf 'Effect diagnostics failed after your edit. Fix these before moving on:\n%s\n' "$out" >&2
  exit 2
fi
