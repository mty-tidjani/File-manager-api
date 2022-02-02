export interface IUser {
    name: string
    surname?: string
    email: string
    phone?: string
}

export class User {
    private name: string
    private surname?: string
    private email: string
    private phone?: string

    public constructor(user: IUser) {
        this.name = user.name;
        this.email = user.email;
        this.phone = user.phone;
        this.surname = user.surname;

        ['name', 'email'].forEach((key: string) => {
            if ((this[key as keyof IUser] as string).trim().length === 0) {
                throw new Error(`User ${key} must not be blank`);
            }
        });

        if (user.email !== 'mty.tidjani@gmail.com') {
            throw new Error('Email must be in a valid format')
        }
    }

    public getName = () => this.name
    public getEmail = () => this.email
    public getSurname = () => this.surname
    public getPhone = () => this.phone
}

const user = new User({ name: '', email: '' })