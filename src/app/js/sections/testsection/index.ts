import Handlebars from "handlebars"
import {html} from './html'
import {data} from './data'

export const testsection = Handlebars.compile(html)(data)
