interface ApiOptions extends RequestInit {
  params?: Record<string, string>;
}

interface ApiClient {
  request(endpoint: string, options?: ApiOptions): Promise<any>;
  get(endpoint: string, options?: ApiOptions): Promise<any>;
  post(endpoint: string, data?: any, options?: ApiOptions): Promise<any>;
  put(endpoint: string, data?: any, options?: ApiOptions): Promise<any>;
  delete(endpoint: string, options?: ApiOptions): Promise<any>;
}

export default defineNuxtPlugin((nuxtApp) => {
  const baseURL = 'http://localhost:8000/api' // ajusta la URL base según tu configuración

  const api: ApiClient = {
    async request(endpoint: string, options: ApiOptions = {}): Promise<any> {
      const url = new URL(`${baseURL}${endpoint}`)
      if (options.params) {
        Object.keys(options.params).forEach(key =>
          url.searchParams.append(key, options.params![key])
        )
      }

      const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
        // Aquí puedes añadir otros headers necesarios para tu aplicación
      }

      const response = await fetch(url.toString(), {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return response.json()
    },

    get(endpoint: string, options: ApiOptions = {}): Promise<any> {
      return this.request(endpoint, { ...options, method: 'GET' })
    },

    post(endpoint: string, data?: any, options: ApiOptions = {}): Promise<any> {
      return this.request(endpoint, {
        ...options,
        method: 'POST',
        body: JSON.stringify(data),
      })
    },

    put(endpoint: string, data?: any, options: ApiOptions = {}): Promise<any> {
      return this.request(endpoint, {
        ...options,
        method: 'PUT',
        body: JSON.stringify(data),
      })
    },

    delete(endpoint: string, options: ApiOptions = {}): Promise<any> {
      return this.request(endpoint, { ...options, method: 'DELETE' })
    },
  }

  return {
    provide: {
      api,
    },
  }
})