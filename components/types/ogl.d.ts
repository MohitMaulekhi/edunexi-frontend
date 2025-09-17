declare module "ogl" {
  export class Renderer {
    constructor(options?: any);
    readonly gl: WebGLRenderingContext;
    readonly domElement: HTMLCanvasElement;
    setSize(width: number, height: number): void;
    render(options: any): void;
  }

  export class Geometry {
    constructor(gl: WebGLRenderingContext, options?: any);
  }

  export class Triangle {
    constructor(gl: WebGLRenderingContext);
  }

  export class Program {
    constructor(gl: WebGLRenderingContext, options: any);
    uniforms: { [key: string]: { value: any } };
  }

  export class Mesh {
    constructor(gl: WebGLRenderingContext, options: any);
  }
}
