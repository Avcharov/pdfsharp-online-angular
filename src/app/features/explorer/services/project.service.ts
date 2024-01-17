import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { ProjectModel } from '../models/project-model';

@Injectable()
export class ProjectService extends ApiService {

    private readonly baseUrl = 'explorer/project';

    constructor(http: HttpClient) { super(http) }

    getUsersProjects(userId: number): Observable<ProjectModel[]> {
        const url = `${this.baseUrl}/${userId}`;

        return this.get(url);
    }


}
