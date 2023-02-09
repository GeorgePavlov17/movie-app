export type Movie = {
    id: number, 
    title: string,
    overview: string,
    actors?: string,
    genres: number[],
    poster: string,
    release: string,
    rating: number,
    trailer?: string,
    director?: string,
    duration?: number
}