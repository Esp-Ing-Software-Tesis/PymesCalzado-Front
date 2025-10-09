import { ArticlesDTO } from './../pages/pedidos/crearPedido/crearPedido.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ArticlesSharedService {
  // Lista enviada desde el padre
  private articlesListSubject = new BehaviorSubject<ArticlesDTO[]>([]);
  articlesList$ = this.articlesListSubject.asObservable();

  // Articulo nuevo enviado desde el hijo
  private newArticleSubject = new BehaviorSubject<ArticlesDTO | null>(null);
  newArticle$ = this.newArticleSubject.asObservable();

  // Metodos

  // Enviar lista de articulos desde el padre
  setArticlesList(articles: ArticlesDTO[]) {
    this.articlesListSubject.next(articles);
  }

  // Consultar listado de articulos
  getArticlesList(): ArticlesDTO[] {
    return this.articlesListSubject.value;
  }

  // Enviar articulo nuevo
  sendNewArticle(article: ArticlesDTO) {
    this.newArticleSubject.next(article);
  }

  // Limpiar datos
  clear() {
    this.articlesListSubject.next([]);
    this.newArticleSubject.next(null);
  }
}