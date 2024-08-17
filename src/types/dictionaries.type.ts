export interface RootDictionary {
  welcome: Welcome;
  auth: Auth;
  pages: Pages;
  help: Help;
}

export interface Welcome {
  title: string;
  subtitle: string;
  description: string;
}

export interface Auth {
  login: string;
  registration: string;
  register: string;
  logout: string;
  password: string;
  email: string;
  name: string;
  dontHaveAccount: string;
  alreadyHaveAccount: string;
  required: string;
  passwordMinLength: string;
  passwordMaxLength: string;
  passwordPattern: string;
}

export interface Pages {
  home: string;
  profile: string;
  storage: string;
  shared: string;
  settings: string;
  help: string;
  login: string;
  registration: string;
}

export interface Help {
  accordion: Accordion[];
}

export interface Accordion {
  id: number;
  title: string;
  body: string;
}
