#!/bin/bash
# Starts the Cantonese Reader local web server in the background.
#
# Uses nohup + a PID file so the server keeps running after you close the
# terminal window. (A plain "python3 serve.py &" dies as soon as its parent
# shell goes away, which is why the site kept disappearing.)
#
# Usage:  ./start.sh          (uses port 5173)
#         ./start.sh 8080     (uses port 8080)

set -u

# Always operate from the folder this script lives in, so it works no matter
# where you run it from.
cd "$(dirname "$0")" || exit 1

PORT="${1:-5173}"
PID_FILE="server.pid"
LOG_FILE="server.log"
URL="http://localhost:$PORT"

# --- Already running (started by this script)? ---
if [ -f "$PID_FILE" ]; then
  OLD_PID="$(cat "$PID_FILE" 2>/dev/null)"
  if [ -n "$OLD_PID" ] && kill -0 "$OLD_PID" 2>/dev/null; then
    echo "Already running (PID $OLD_PID)."
    echo "Open: $URL"
    exit 0
  fi
  # PID file left over from a server that's no longer alive.
  rm -f "$PID_FILE"
fi

# --- Port taken by something else? ---
IN_USE="$(lsof -nP -iTCP:"$PORT" -sTCP:LISTEN -t 2>/dev/null | head -1)"
if [ -n "$IN_USE" ]; then
  echo "Port $PORT is already in use by PID $IN_USE (not started by this script)."
  echo "Either stop that process, or start on another port:  ./start.sh 8080"
  exit 1
fi

# --- Start it ---
nohup python3 serve.py "$PORT" > "$LOG_FILE" 2>&1 &
NEW_PID=$!
echo "$NEW_PID" > "$PID_FILE"

# Give it a moment, then confirm it actually came up rather than just
# reporting success and leaving you to find out on your own.
sleep 1
if ! kill -0 "$NEW_PID" 2>/dev/null; then
  echo "Server failed to start. Last lines of $LOG_FILE:"
  echo "---"
  tail -20 "$LOG_FILE"
  rm -f "$PID_FILE"
  exit 1
fi

echo "Started (PID $NEW_PID)."
echo "Open: $URL"
echo "Logs: $LOG_FILE     Stop with: ./stop.sh"
