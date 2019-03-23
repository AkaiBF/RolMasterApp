import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class MonstersService {

    constructor(private net: HttpClient) { }

    search(index: number) {
        return this.net.get('http://localhost:4004/api/v1/monsters/search/' + index + '/', {})
    }
}
