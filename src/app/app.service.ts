import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

export interface Config {
  state1: boolean;
  state2: boolean;
}

const defaultConfig: Config = {
  state1: false,
  state2: false
}

@Injectable({providedIn: 'root'})
export class AppService {
  private storageKey = 'config'
  private config$: BehaviorSubject<Config>

  constructor() {
    const savedConfig = sessionStorage.getItem(this.storageKey)
    this.config$ = new BehaviorSubject<Config>(savedConfig ? JSON.parse(savedConfig) : defaultConfig)
  }

  getConfig$(): Observable<Config> {
    return this.config$.asObservable()
  }

  getConfig(): Config {
    return this.config$.getValue()
  }

  updateConfig(config: Partial<Config>): Config {
    this.config$.next({...this.getConfig(), ...config})
    sessionStorage.setItem(this.storageKey, JSON.stringify(this.getConfig()))
    return this.getConfig()
  }
}
