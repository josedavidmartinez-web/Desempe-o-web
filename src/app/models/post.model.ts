export interface Posts{
    id: number;
    title: string;
    body: string;
}

export type PostsInput=Pick<Posts,'title'|'body'>