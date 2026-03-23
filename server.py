from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent

class SPARequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def _is_asset_request(self):
        clean_path = self.path.split('?', 1)[0].split('#', 1)[0]
        translated = Path(self.translate_path(clean_path))
        return clean_path.startswith('/src/') or clean_path.startswith('/public/') or translated.exists()

    def do_GET(self):
        if not self._is_asset_request():
            self.path = '/index.html'
        return super().do_GET()

    def do_HEAD(self):
        if not self._is_asset_request():
            self.path = '/index.html'
        return super().do_HEAD()

if __name__ == '__main__':
    server = ThreadingHTTPServer(('0.0.0.0', 4173), SPARequestHandler)
    print('Serving on http://0.0.0.0:4173')
    server.serve_forever()
