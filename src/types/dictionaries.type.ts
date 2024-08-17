export interface RootDictionary {
  welcome: Welcome;
  auth: Auth;
  pages: Pages;
  help: Help;
  settings: Settings;
}

interface Welcome {
  title: string;
  subtitle: string;
  description: string;
}

interface Auth {
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

interface Pages {
  home: string;
  profile: string;
  storage: string;
  shared: string;
  settings: string;
  help: string;
  login: string;
  registration: string;
}

interface Help {
  accordion: Accordion[];
}

interface Accordion {
  id: number;
  title: string;
  body: string;
}

interface Settings {
  language: Language;
  password: Password;
  plan: Plan;
  avatar: Avatar;
}

interface Language {
  change: string;
  english: string;
  russian: string;
}

interface Password {
  current: string;
  new: string;
  repeat: string;
  change: string;
}

interface Plan {
  improve: string;
}

interface Avatar {
  change: string;
}
