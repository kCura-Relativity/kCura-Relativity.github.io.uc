interface NodeRequire {
    context: (path: string, deep?: boolean, filter?: RegExp) => any;
}