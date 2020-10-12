import { AsyncStorage } from 'react-native';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
    this.tokenKey = `${this.namespace}:token`;
  }

  getAccessToken() {
    // Get the access token for the storage
    const rawToken = AsyncStorage?.getItem(this.tokenKey);

    return rawToken || '';
  }

  setAccessToken(accessToken) {
    // Add the access token to the storage
    AsyncStorage?.setItem(this.tokenKey, accessToken);
  }

  removeAccessToken() {
    // Remove the access token from the storage
    AsyncStorage?.removeItem(this.tokenKey);
  }
}

export default AuthStorage;