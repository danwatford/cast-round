#!/usr/bin/env bash

# Show localdev info only in interactive shells.
case "$-" in
  *i*) ;;
  *)
    return 0 2>/dev/null || exit 0
    ;;
esac

echo "[localdev] phpMyAdmin: http://localhost:8080 | username: root | password: crdevpassword"
