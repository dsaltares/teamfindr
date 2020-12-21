import { useEffect } from 'react';
import './App.css';
import { useStoreState, useStoreActions } from './store';

function App() {
  const authenticated = useStoreState((state) => state.authenticated);
  const authenticating = useStoreState((state) => state.authenticating);
  const user = useStoreState((state) => state.user);
  const handleLoginViaTwitter = useStoreActions(
    (actions) => actions.loginViaTwitter
  );
  const handleLoginViaFacebook = useStoreActions(
    (actions) => actions.loginViaFacebook
  );
  const handleLogout = useStoreActions((actions) => actions.logout);
  const login = useStoreActions((actions) => actions.login);

  useEffect(() => {
    login();
  }, [login]);

  if (authenticating) {
    return <div>Logging in</div>;
  }

  if (!authenticated) {
    return (
      <ul>
        <li onClick={() => handleLoginViaTwitter()}>Login via Twitter</li>
        <li onClick={() => handleLoginViaFacebook()}>Login via Facebook</li>
      </ul>
    );
  }

  return (
    <div>
      <div>{JSON.stringify(user, null, 2)}</div>
      <ul>
        <li onClick={() => handleLogout()}>Logout</li>
      </ul>
    </div>
  );
}

export default App;
