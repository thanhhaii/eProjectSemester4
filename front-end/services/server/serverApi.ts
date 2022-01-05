import { AxiosInstance, AxiosRequestConfig } from "axios"
import { isServer } from "services/ssrutils"
import nprogress from "nprogress"

export class ServerApi {
  constructor(private _axios: AxiosInstance) {
    this._axios.interceptors.request.use(
      async (cfg): Promise<AxiosRequestConfig> => {
        return {
          ...cfg,
          withCredentials: true,
          headers: {
            "X-Accept-Cookie": "true",
            ...cfg.headers,
          },
        }
      },
    )

    if (!isServer()) {
      this._axios.interceptors.request.use(cfg => {
        nprogress.start()
        return cfg
      })

      this._axios.interceptors.response.use(
        resp => {
          nprogress.done()
          return resp
        },
        err => {
          nprogress.done()
          return Promise.reject(err)
        },
      )
    }
  }
}
