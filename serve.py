#!/usr/bin/env python3
"""Static file server that disables caching, so edits show up on refresh
without hunting for a hard-reload. Usage: python3 serve.py [port]"""
import http.server
import socketserver
import sys


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        super().end_headers()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5173
    with socketserver.TCPServer(("", port), NoCacheHandler) as httpd:
        print(f"Serving (no-cache) on http://localhost:{port}")
        httpd.serve_forever()
