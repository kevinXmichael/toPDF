import { Context, HandlerFunc } from "https://deno.land/x/abc@v1.3.3/mod.ts"
import { PdfDTO } from "./pdfDTO.ts"
import { Status } from "https://deno.land/std/http/http_status.ts"
import puppeteer from "https://deno.land/x/puppeteer@9.0.2/mod.ts"
import { join } from "https://deno.land/std@0.127.0/path/mod.ts"

const pdfPath = "printed.pdf"
const jsonPath = join("..", "client", "public", "pdfData.json")
const website = "http://localhost:3030/"

const writeJSON2Client = async (pdfData: PdfDTO) => {
  const pdfDataJson = JSON.stringify(pdfData, null, 4)
  try {
    Deno.writeTextFile(jsonPath, pdfDataJson)
  } catch (err) {
    console.error(`❌ Cannot writeJSON2Client: '${pdfDataJson}' because of: ${err}`)
  }
}

const createPDF = async (context: Context, writeJSON = true) => {
  const pdfData = (await context.body) as PdfDTO
  let writtenPDF = false

  if (writeJSON && pdfData) {
    await writeJSON2Client(pdfData)
  }

  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()
    await page.goto(website)
    await page.pdf({ path: pdfPath, format: "a4" })
    writtenPDF = true
  } catch (err) {
    console.error(`❌ Cannot visit '${website}' because of: ${err}`)
    writtenPDF = false
  } finally {
    await browser.close()
  }

  return writtenPDF
}

export const justPDF: HandlerFunc = async (context: Context) => {
  return await createPDF(context)
}

export const toPDF: HandlerFunc = async (context: Context) => {
  const writtenPDF = await createPDF(context)
  if (writtenPDF) {
    try {
      const pdf = await Deno.readFile(pdfPath)
      if (pdf) {
        return pdf
      }
    } catch (err) {
      console.error(`❌ Cannot read '${pdfPath}' because of: ${err}`)
    } finally {
      await Deno.remove(pdfPath)
    }
  }
  return Status.NoContent
}
