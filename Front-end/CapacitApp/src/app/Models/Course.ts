export interface Course {
    id: number;
    name: string;
    description: string;
    language: string;
    technology: string;
    level: string;
    price: number; // Cambié a number para ser consistente con el tipo de datos esperado
    link: string;
    category: number; // Nueva clave foránea
    tutor: number; // Nueva clave foránea
}