#!/usr/bin/env bash
set -euo pipefail

codex_version=$(npm view @openai/codex version)
codex_major=${codex_version%%.*}
if [ "$codex_major" -ge 1 ]; then
  npm install --global --no-fund --no-audit "@openai/codex@$codex_major"
else
  npm install --global --no-fund --no-audit @openai/codex
fi

npm install --global --no-fund --no-audit @fission-ai/openspec@latest

motd_hook='[ -n "${PS1-}" ] && [ -f /workspaces/cast-round/.devcontainer/localdev-motd.sh ] && source /workspaces/cast-round/.devcontainer/localdev-motd.sh'
if ! grep -Fq "$motd_hook" "$HOME/.bashrc"; then
  printf '\n%s\n' "$motd_hook" >> "$HOME/.bashrc"
fi
