// src/config/configuration.ts

export default () => ({
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT || '3000'),
  cors: {
    origins: process.env.CORS_ORIGINS
      ? (JSON.parse(process.env.CORS_ORIGINS) as string[])
      : [],
    maxAge: parseInt(process.env.CORS_MAX_AGE || String(3 * 60 * 60)),
  },
  log: {
    levels: process.env.LOG_LEVELS
      ? (JSON.parse(process.env.LOG_LEVELS) as LogLevel[])
      : ['log', 'error', 'warn'],
    disabled: process.env.LOG_DISABLED === 'true',
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  auth: {
    jwt: {
      expirationInterval:
        Number(process.env.AUTH_JWT_EXPIRATION_INTERVAL) || 3600,
      secret: process.env.AUTH_JWT_SECRET || '',
      audience: process.env.AUTH_JWT_AUDIENCE || 'delaware.hogent.be',
      issuer: process.env.AUTH_JWT_ISSUER || 'delaware.hogent.be',
    },
  },
});

export interface JwtConfig {
  expirationInterval: number;
  secret: string;
  audience: string;
  issuer: string;
}

export interface AuthConfig {
  jwt: JwtConfig;
}

export interface LogConfig {
  levels: LogLevel[];
  disabled: boolean;
}

type LogLevel = 'log' | 'error' | 'warn' | 'debug' | 'verbose' | 'fatal';

export interface CorsConfig {
  origins: string[];
  maxAge: number;
}

export interface ServerConfig {
  env: string;
  port: number;
  cors: CorsConfig;
  log: LogConfig;
  database: DatabaseConfig;
  auth: AuthConfig;
}

export interface DatabaseConfig {
  url: string;
}
