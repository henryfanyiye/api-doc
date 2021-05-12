import development from './config.development';
import production from './config.production';

const configs = {
  development,
  production,
};

const env = process.env.NODE_ENV || 'development';

export default () => configs[env]();
