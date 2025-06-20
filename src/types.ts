// src/types.ts
export interface Course {
  title: string;
  image: string;
  videoUrl: string;
  description?: string; // opcional
}

export interface ModuleClass {
  title: string;
  videoUrl: string;
  description?: string;
}

export interface Module {
  name: string;
  classes: ModuleClass[];
}

export interface ModularCourse {
  title: string;
  image: string;
  modules: Module[];
  description?: string;
}