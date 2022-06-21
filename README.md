# toPDF

This is a simple deno server && microservice that

1. takes a text input
2. opens a website that can render that input
3. prints that website into a pdf file
4. sends the pdf-blob back as a response

## Prerequisites

You need to install [deno first](https://deno.land/manual/getting_started/installation.md).

## Usage

```bash
sh ./run.sh
```

You can send an example GET request with [Insomnia](https://insomnia.rest/) to "http://localhost:8080/toPDF" with the following body:

```bash
{
	"name": "Test"
}
```

👉 &nbsp;For test purposes only you can also send this body to the `justPDF` endpoint, this will neither return nor delete the pdf afterwards, just create it.

# Troubleshooting

⚠️ &nbsp;Maybe you need to install a headless-runnable browser for puppeteer:

```bash
PUPPETEER_PRODUCT=chrome deno run -A --unstable https://deno.land/x/puppeteer@9.0.2/install.ts
```

⚠️ &nbsp;The pdf won't be printable if no client is reachable. Please ensure that a website is running on the intended port (3030).

⚠️ &nbsp;Ensure that only one node process is running, otherwise the client with port 3000 will not be found resulting in a misprinted pdf.
