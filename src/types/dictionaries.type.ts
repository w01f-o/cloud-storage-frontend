export interface RootDictionary {
  welcome: Welcome;
  auth: Auth;
  pages: Pages;
  help: Help;
  settings: Settings;
  errors: Errors;
  folders: Folders;
  date: Date;
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
  success: string;
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
  welcome: string;
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

interface Errors {
  mailer_error: string;
  user_with_such_email_already_exists: string;
  user_with_such_email_not_found: string;
  wrong_email_or_password: string;
  wrong_code: string;
  user_not_activated: string;
  no_refresh_token: string;
  no_access_token: string;
  wrong_refresh_token: string;
  wrong_access_token: string;
}

interface Folders {
  error: string;
  success: string;
  create: Create;
  notFound: string;
  title: string;
  name: string;
  color: string;
  search: string;
  view: View;
  empty: Empty;
}

interface Create {
  full: string;
  partial: string;
}

interface View {
  row: string;
  cells: string;
}

interface Empty {
  title: string;
  description: string;
  create: string;
}

interface Date {
  month: string[];
}
