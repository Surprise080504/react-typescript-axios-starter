import axios, { AxiosInstance, AxiosPromise, AxiosResponse } from 'axios';

export enum EnumContentType {
  JSON = "application/json",
  XML = "application/xml",
  FORM = "application/x-www-form-urlencoded",
}

class HttpApiService {
  private _axiosInstance: AxiosInstance | undefined;
  private _baseURL: string;
  private _token: string | null;

  constructor(baseURL: string) {
    this._baseURL = baseURL;
    this._token = null;

    this.createAxiosInstance();
  }

  private defaultOptions = (): any => {
    // Set the AUTH token for any request

    const authHttpHeader = "Bearer token" // Token goes here
    this._token = authHttpHeader;

    const options = {
      baseURL: this._baseURL,
      // withCredentials: true, // Window Authentification
      headers: {
        'Accept': 'application/json',
        // 'Authorization': `${authHttpHeader}` // OAuth Authetification
      }
    };
    return options;
  };

  /**
   * Create instance
   */
  private createAxiosInstance() {
    this._axiosInstance = axios.create(this.defaultOptions());
    // this.checkAutorization()

    // Add a request interceptor
    this._axiosInstance.interceptors.request.use(
      config => config,
      error => {
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    this._axiosInstance.interceptors.response.use(
      this.handleSuccess,
      this.handleError
    );
  }

  public getToken() {
    return this._token;
  }

  public get(endpoint: string, conf = {}): AxiosPromise {
    return new Promise((resolve, reject) => {
      this._axiosInstance!
        .get(`${endpoint}`, conf)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  public create(endpoint: string, data: {}, conf = {}): AxiosPromise {
    return this.post(endpoint, data, conf)
  }

  public post(endpoint: string, data: {}, conf = {}): AxiosPromise {
    return new Promise((resolve, reject) => {
      this._axiosInstance!
        .post(`${endpoint}`, data, conf)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  public update(endpoint: string, data: {}, conf = {}): AxiosPromise {
    return new Promise((resolve, reject) => {
      this._axiosInstance!
        .put(`${endpoint}`, data, conf)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  public delete(endpoint: string, id: any, conf = {}): AxiosPromise {
    return new Promise((resolve, reject) => {
      this._axiosInstance!
        .delete(`${endpoint}/${id}`, conf)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  public deleteFile(endpoint: string, conf = {}): AxiosPromise {
    return new Promise((resolve, reject) => {
      this._axiosInstance!
        .delete(`${endpoint}`, conf)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  public uploadFile(endpoint: string, data: FormData, conf = {}): AxiosPromise {
    return this.post(endpoint, data, conf)
  }

  public downloadFile(endpoint: string): AxiosPromise {
    const conf = {
      responseType: 'blob', // important
      timeout: 30000,
    }
    return this.get(endpoint, conf)
  }

  handleSuccess(response: AxiosResponse) {
    // console.log('handleSuccess' + JSON.stringify(response))
    return response;
  }

  handleError = (err: any) => {
    console.log(`HttpService::Error : ${err}`)
    if (!err.response) {
      console.log(`Network error: ${err}`);
    } else {
      if (err.response !== undefined) {
        const { status } = err.response;
        if (status === 401 || status === 500) {
          console.log(`HttpService::Error(401 or 500) : ${err.response.data.Message}`)
        }
      }
    }
    return Promise.reject(err);
  };

  redirectTo = (document: any, path: string) => {
    document.location = path;
  };
}

export default HttpApiService;