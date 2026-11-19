import { Component, inject, signal, OnInit } from '@angular/core';
import { PostsService } from '../services/posts';
import { Posts, PostsInput } from '../models/post.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-panel',
  styleUrl: './panel.css',
  templateUrl: './panel.html',
})
export class Panel implements OnInit {

  posts = signal<Posts[]>([]);
  service = inject(PostsService);
  editingId = signal<number | null>(null);

  ngOnInit(): void {
    this.cargarPosts();
  }
  
  cargarPosts() {
    this.service.obtenerPosts().subscribe({
      next: (data) => {
        this.posts.set(data);
      },
      error: (err) => {
        console.error('Error al cargar posts:', err);
      }
    });
  }

  form: PostsInput = { title: '', body: '' };

  save(): void {
    if (!this.form.title || !this.form.body) {
      return;
    }

    const id = this.editingId();
    if (id === null) {
      this.create();
    } else {
      this.update(id);
    }
  }

  private create(): void {
    this.service.crearPost(this.form).subscribe({
      next: (newPost) => {
        this.posts.update((list) => [newPost, ...list]);
        this.cancel();
      },
      error: (err) => console.error('Error al crear post:', err)
    });
  }

  private update(id: number): void {
    this.service.actualizarPost(id, this.form).subscribe({
      next: (updatedPost) => {
        this.posts.update((list) =>
          list.map((item) => (item.id === id ? { ...item, ...updatedPost, ...this.form } : item))
        );
        this.cancel();
      },
      error: (err) => console.error('Error al actualizar post:', err)
    });
  }

  edit(post: Posts): void {
    this.editingId.set(post.id);
    this.form = { title: post.title, body: post.body };
  }

  delete(id: number): void {
    this.service.eliminarPost(id).subscribe({
      next: () => {
        this.posts.update((list) => list.filter(item => item.id !== id));
      },
      error: (err) => console.error('Error al eliminar post:', err)
    });
  }

  cancel(): void {
    this.editingId.set(null);
    this.form = { title: '', body: '' };
  }
}