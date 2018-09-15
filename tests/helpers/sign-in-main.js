import { signIn } from 'oslr-ui/tests/helpers/sign-in';

export default async function signInMain(assert){

  assert.equal(1, 1, "Logging in main user");
  await signIn(assert, 'test1@oslr.co.uk');

};
