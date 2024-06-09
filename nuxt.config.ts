import type { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  build: {},
  buildModules: [
    '@nuxt/typescript-build'
  ],
  store: true,
}

export default config
