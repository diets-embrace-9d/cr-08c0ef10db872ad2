#!/bin/bash
# Stops the Cantonese Reader local web server.
#
# Usage:  ./stop.sh          (stops the server on port 5173)
#         ./stop.sh 8080     (stops the server on port 8080)

set -u

cd "$(dirname "$0")" || exit 1

PORT="${1:-5173}"
PID_FILE="server.pid"
STOPPED=0

# Politely ask a process to exit, then force it if it ignores us.
stop_pid() {
  local pid="$1"
  kill "$pid" 2>/dev/null
  for _ in 1 2 3 4 5 6 7 8 9 10; do
    kill -0 "$pid" 2>/dev/null || return 0
    sleep 0.2
  done
  kill -9 "$pid" 2>/dev/null
  return 0
}

# --- Preferred path: the PID file written by start.sh ---
if [ -f "$PID_FILE" ]; then
  PID="$(cat "$PID_FILE" 2>/dev/null)"
  if [ -n "$PID" ] && kill -0 "$PID" 2>/dev/null; then
    stop_pid "$PID"
    echo "Stopped (PID $PID)."
    STOPPED=1
  fi
  rm -f "$PID_FILE"
fi

# --- Fallback: something is still holding the port ---
# Covers servers started by hand, or a stale/missing PID file.
LEFTOVER="$(lsof -nP -iTCP:"$PORT" -sTCP:LISTEN -t 2>/dev/null)"
if [ -n "$LEFTOVER" ]; then
  for pid in $LEFTOVER; do
    stop_pid "$pid"
    echo "Stopped process on port $PORT (PID $pid)."
    STOPPED=1
  done
fi

if [ "$STOPPED" -eq 0 ]; then
  echo "Nothing running on port $PORT."
fi
