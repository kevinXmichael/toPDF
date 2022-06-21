import { Application } from "https://deno.land/x/abc@v1.3.3/mod.ts"
import { justPDF, toPDF } from "./pdfHandler.ts"

const app = new Application()
const port = 8080
const justPDFRoute = "/justPDF"
const toPDFRoute = "/toPDF"
console.log(
  `Send a GET response to: \n👉 http://localhost:${port}${toPDFRoute}\n👉 http://localhost:${port}${justPDFRoute}`
)

app.get(justPDFRoute, justPDF).get(toPDFRoute, toPDF).start({ port })
