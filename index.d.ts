import {Component} from "react";

declare enum Method {
    addFileExtension = "addFileExtension",
    extLink = "extLink",
    file = "file",
    getClientID = "getClientID",
    hit = "hit",
    notBounce = "notBounce",
    params = "params",
    reachGoal = "reachGoal",
    setUserID = "setUserID",
    userParams = "userParams"
}

interface YandexMetrikaProps {
    counterId: number,
    options: {
        accurateTrackBounce?: boolean | number,
        childIframe?: boolean,
        clickmap?: boolean,
        defer?: boolean,
        ecommerce?: boolean | string | unknown[],
        params?: Record<string, unknown> | unknown[],
        userParams?: Record<string, unknown>,
        trackHash?: boolean,
        trackLinks?: boolean,
        trustedDomains?: string[],
        type?: number,
        webvisor?: boolean,
        triggerEvent?: boolean
    }
}

export class YandexMetrika extends Component<YandexMetrikaProps> {}
export declare const useMetrika: () => (method: Method, ...args: unknown[])=>void
