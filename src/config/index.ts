import development from './config.development';

const configs = {
  development,
};

const env = process.env.NODE_ENV || 'development';

export default () => configs[env]();
