import axios from "axios"
import { config } from "services/config"
import { isServer } from "services/ssrutils"
import { ServerApi } from "./serverApi"

const serverApi = new ServerApi(
  axios.create({
    timeout: isServer() ? 15000 : 300000,
    baseURL: config.serverApi.url,
  }),
)
