export default class Hash {
    static generate(data: string, key: string, secret: string): {
        hash: string;
        time: string;
    };
}
