import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  // tslint:disable-next-line:max-line-length
  private url = 'http://akamaicache.dof6.com/vod/yomvi.svc/lg/contents/browse?profile=ANONIMO&mediaType=FOTOV&parentalRating=M18&showNonRated=true&start=1&end=15&showseries=series&filter=TD-CUP&mode=vod&sort=VA&topic=CN';

  private goals = new BehaviorSubject<any>([]);
  goal = this.goals.asObservable();

  constructor(private http: HttpClient) {
    this.getData();
  }

  changeGoal(goal) {
    this.goals.next(goal);
  }

  getData() {
    return this.http.get(this.url, {responseType: 'json'}).subscribe(data => this.changeGoal(this.parseData(data)));
  }

  private parseData(res) {
    const result = [];
    for (const item of res.Contenidos) {
      result.push(item.DatosEditoriales.Titulo);
    }
    return result;
  }
}
