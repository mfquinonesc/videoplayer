export interface Account {
    email:string;
    password:string;
    name?:string;
    lastname?:string;
    isAdmin?:boolean;
    createdAt?: Date | null;   
}
