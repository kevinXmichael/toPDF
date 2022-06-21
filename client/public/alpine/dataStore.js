export default () => ({
  data: {},
  async init() {
    try {
      const data = await fetch("../pdfData.json")
      this.data = await data.json()
    } catch (err) {
      console.error(`❌ Smth went wrong initializing the dataStore: ${err}`)
    }
  }
})
