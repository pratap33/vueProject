import { extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

extend('username', {
  ...required,
  message: 'Username is required'
});

extend('password', {
  ...required,
  message: 'Password is required'
});
