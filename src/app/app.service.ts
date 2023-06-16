import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

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
  private config$

  constructor() {
    const savedConfig = sessionStorage.getItem(this.storageKey)
    this.config$ = new BehaviorSubject<Config>(savedConfig ? JSON.parse(savedConfig) : defaultConfig)
  }

  getConfig() {
    return this.config$.asObservable()
  }

  updateConfig(config: Partial<Config>) {
    this.config$.next({...this.config$.getValue(), ...config})
    sessionStorage.setItem(this.storageKey, JSON.stringify(this.config$.getValue()))
  }
}
