from flask import Flask
from jinja2 import Template
import urllib3

app = Flask(__name__)

@app.route("/")
def home():
    t = Template("Hello {{ user }}")
    return t.render(user="vuln-py")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
