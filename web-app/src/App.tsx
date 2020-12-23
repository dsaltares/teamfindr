import { useEffect } from 'react';
import Counter from './components/Counter';
import { auth } from './store/hooks';

function App() {
  const loginViaSocialMedia = auth.useLoginViaSocialMedia();
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
        <li onClick={() => loginViaSocialMedia('twitter')}>
          Login via Twitter
        </li>
        <li onClick={() => loginViaSocialMedia('facebook')}>
          Login via Facebook
        </li>
        <li onClick={() => loginViaSocialMedia('google')}>Login via Google</li>
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
