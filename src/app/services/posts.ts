import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Posts, PostsInput } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private readonly url = 'https://jsonplaceholder.typicode.com/posts';
  private readonly http = inject(HttpClient);

  // Obtener todos los posts
  obtenerPosts(): Observable<Posts[]> {
    return this.http.get<Posts[]>(this.url);
  }

  // Crear post
  crearPost(post: PostsInput): Observable<Posts> {
    return this.http.post<Posts>(this.url, post);
  }

  // Actualizar post
  actualizarPost(id: number, post: PostsInput): Observable<Posts> {
    return this.http.put<Posts>(`${this.url}/${id}`, post);
  }

  // Eliminar post
  eliminarPost(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  // Obtener un post por su ID (método útil añadido)
  obtenerPostPorId(id: number): Observable<Posts> {
    return this.http.get<Posts>(`${this.url}/${id}`);
  }
}