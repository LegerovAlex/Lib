export type BuildMode = 'production' | 'development';
export type BuildPlatform = 'mobile' | 'desktop';

export interface BuildPaths {
  entry: string;
  html: string;
  output: string;
  src: string;
  public: string;
}

export interface BuildOptions {
  port: number;
  paths: BuildPaths;
  mode: BuildMode;
  analayzer?: boolean;
  platform: BuildPlatform;
}

export interface EnvVariables {
  mode?: BuildMode;
  port?: number;
  analayzer?: boolean;
  platform?: BuildPlatform;
}
