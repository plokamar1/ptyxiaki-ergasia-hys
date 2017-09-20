export class User {
    constructor( private email: string,
                 private loginType: string,
                 private password?: string,
                 private firstName?: string,
                 private lastName?: string,
                 private userId?: string
                ) {}
    }