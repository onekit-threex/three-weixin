
import Blob from './Blob'
import createImageBitmap from "./createImageBitmap"
import CSSStyleDeclaration from "./CSSStyleDeclaration"
import Document from './document'
import fetch from './fetch'
import Headers from './Headers'
import Image from './Image'
import navigator from './navigator'
import Request from './Request'
import requestAnimationFrame from "./requestAnimationFrame"
import Response from './Response'
import URL from './URL'
import Window from './window'
import Worker from "./Worker"
import XMLHttpRequest from "./XMLHttpRequest"
import Location from "./Location"
import { DOMParser } from './core/xmldom/dom-parser'
const WebAssembly = require("./WebAssembly")
const document = new Document()
const window = new Window()
const self = window
const location = new Location()
module.exports = {
  Blob,
  createImageBitmap,
  CSSStyleDeclaration,
  document,
  DOMParser,
  fetch,
  Headers,
  Image,
  location,
  navigator,
  Request,
  requestAnimationFrame,
  Response,
  self,
  URL,
  window,
  Worker,
  XMLHttpRequest,
  WebAssembly
}
