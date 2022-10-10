## Getting Started
The following steps assume you already have python installed on your machine.

First, create a new virtual environment and activate it. This could be specific to your machine, so use the instructions from here if you don't know how:

[Create and Activate a Virtual Environment](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/#creating-a-virtual-environment)

Then, install the dependencies:

```bash
pip install -r requirements.txt
```

Lastly, start the server:

```bash
flask run
```

If your server is running at "http://127.0.0.1:5000", then you are good to go. 

If your server isn't running on "http://127.0.0.1:5000" then you will need to update the Next.js app's "app.config.ts" file and change the STOCK_SCRAPE_API value to your flask server's url.
