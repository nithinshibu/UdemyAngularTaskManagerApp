import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientLocation } from '../models/client-location.model';

@Injectable({
  providedIn: 'root',
})
export class ClientLocationService {
  constructor(private httpClient: HttpClient) {}

  getClientLocations(): Observable<ClientLocation[]> {
    return this.httpClient.get<ClientLocation[]>('api/clientlocations', {
      responseType: 'json',
    });
  }
  getClientLocationtByClientLocationID(
    ClientLocationID: number
  ): Observable<ClientLocation> {
    return this.httpClient.get<ClientLocation>(
      '/api/clientlocations/searchbyclientlocationid/' + ClientLocationID,
      { responseType: 'json' }
    );
  }

  insertClientLocation(
    newClientLocation: ClientLocation
  ): Observable<ClientLocation> {
    return this.httpClient.post<ClientLocation>(
      '/api/clientlocations',
      newClientLocation,
      { responseType: 'json' }
    );
  }

  updateClientLocation(
    existingClientLocation: ClientLocation
  ): Observable<ClientLocation> {
    return this.httpClient.put<ClientLocation>(
      '/api/clientlocations',
      existingClientLocation,
      { responseType: 'json' }
    );
  }

  deleteClientLocation(ClientLocationID: number): Observable<string> {
    return this.httpClient.delete<string>(
      '/api/clientlocations?ClientLocationID=' + ClientLocationID
    );
  }
}
