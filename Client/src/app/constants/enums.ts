export declare enum ShapeKind {
    Circle,
    Square,
}

export enum ToastBackgroundColor{
    success ='#dff0d8',
    error = '#f2dede',
    info = '#d9edf7',
    warning = '#faf2cc'
}

// interface Circle {
//     kind: ShapeKind.Circle;
//     radius: number;
// }

/**
 * Supportet HTTP methods.
 */
export declare enum ResourceActionHttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
    OPTIONS = "OPTIONS",
    HEAD = "HEAD",
    TRACE = "TRACE",
    CONNECT = "CONNECT",
}