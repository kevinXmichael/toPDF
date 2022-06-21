import Alpine from "alpinejs"
import dataStore from "./dataStore.js"

Alpine.data("dataStore", dataStore)

window.Alpine = Alpine
Alpine.start()
