import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

    private baseUrl: string = environments.baseUrl;
    constructor(private http: HttpClient) { }

    getHeroes(): Observable<Hero[]> {
        return this.http.get<Hero[]>(`${ this.baseUrl }/heroes`)
    }

    getHeroById( id: string ): Observable<Hero | undefined> {
        return this.http.get<Hero>(`${ this.baseUrl }/heroes/${ id }`)
            .pipe(
                catchError( error => of(undefined) )
            );
    }

    getSuggestions(query: string): Observable<Hero[]> {
        return this.http.get<Hero[]>(`${ this.baseUrl }/heroes?q=${ query }&_limit=6`);
    }

    addHero( hero: Hero ): Observable<Hero> {
        return this.http.post<Hero>(`${ this.baseUrl }/heroes`, hero);
    }

    updateHero( hero: Hero ): Observable<Hero> {
        if( !hero.id ) throw Error('Hero id is required');

        return this.http.patch<Hero>(`${ this.baseUrl }/heroes/${ hero.id }`, hero);
    }

    deleteHeroById( id: string ): Observable<boolean> { // al final el observable nos debe devolver un boolean
        
        // llamar a este endpoint retorna {} si se borró o 'error 404' si no se borró (no encontró el id o hubo error de conexión)
        return this.http.delete<Hero>(`${ this.baseUrl }/heroes/${ id }`)
            .pipe(
                map( resp => true ), // si se llega a este es porque se borró, y la respuesta es true
                catchError( err => of(false) ), // si hay error, el "of" retorna un nuevo obsrvable con el valor de false
            );
    }
    
}