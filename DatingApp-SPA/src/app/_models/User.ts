import { Photo } from './Photo';

export interface User {
    Id: number;
    Username: string;
    KnownAs: string;
    Age: number;
    Gender: string;
    Created: Date;
    LastActive: Date;
    PhotoUrl: string;
    City: string;
    Country: string;
    Interests?: string;
    Introduction?: string;
    LookingFor?: string;
    Photos?: Photo[];
}
