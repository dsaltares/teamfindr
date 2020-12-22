import { useEffect } from 'react';
import Counter from './components/Counter';
import { auth } from './store/hooks';

function App() {
  const loginViaFacebook = auth.useLoginViaFacebook();
  const loginViaTwitter = auth.useLoginViaTwitter();
  const loginViaGoogle = auth.useLoginViaGoogle();
  const login = auth.useLogin();
  const logout = auth.useLogout();

  const user = auth.useUser();
  const authenticated = auth.useAuthenticated();
  const authenticating = auth.useAuthenticating();

  useEffect(() => {
    login();
  }, [login]);

  if (authenticating) {
    return <div>Logging in</div>;
  }

  if (!authenticated) {
    return (
      <ul>
        <li onClick={() => loginViaTwitter()}>Login via Twitter</li>
        <li onClick={() => loginViaFacebook()}>Login via Facebook</li>
        <li onClick={() => loginViaGoogle()}>Login via Google</li>
      </ul>
    );
  }

  return (
    <div>
      <div>{JSON.stringify(user, null, 2)}</div>
      <ul>
        <li onClick={() => logout()}>Logout</li>
      </ul>
      <Counter />
    </div>
  );
}

export default App;
