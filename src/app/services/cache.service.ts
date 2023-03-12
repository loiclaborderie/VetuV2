import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache: any = {};

  set(
    category: string | null,
    genre: string | null,
    term: string | null,
    page: number,
    sortBy: string,
    data: any
  ): void {
    const key = `${category || ''}:${genre || ''}:${
      term || ''
    }:${page}:${sortBy}`;
    this.cache[key] = data;
  }

  get(
    category: string | null,
    genre: string | null,
    term: string | null,
    page: number,
    sortBy: string
  ): any {
    const key = `${category || ''}:${genre || ''}:${
      term || ''
    }:${page}:${sortBy}`;
    return this.cache[key];
  }
}
