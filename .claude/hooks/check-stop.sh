#!/usr/bin/env bash
# why: Claude Code Stop hook. Claude may not finish while the gate fails. After 5 blocked attempts in a row it may
# why: stop, so a rule it cannot satisfy reaches a person instead of looping; the gate still blocks the push and CI.
set -uo pipefail
session=$(bun -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>process.stdout.write(String(JSON.parse(s).session_id??"none")))')
cd "${CLAUDE_PROJECT_DIR:-.}"
count_file="${TMPDIR:-/tmp}/gate-blocks-$session"
if out=$(bash scripts/gate.sh 2>&1); then
  rm -f "$count_file"
  exit 0
fi
count=$(( $(cat "$count_file" 2>/dev/null || echo 0) + 1 ))
echo "$count" > "$count_file"
if [ "$count" -gt 5 ]; then
  printf 'The gate still fails after 5 attempts. Tell Jose which rule blocks you and why.\n' >&2
  exit 0
fi
printf 'The gate fails, so you are not done. Fix this (attempt %s of 5):\n%s\n' "$count" "$(printf '%s' "$out" | tail -40)" >&2
exit 2
