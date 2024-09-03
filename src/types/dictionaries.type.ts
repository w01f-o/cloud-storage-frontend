export interface RootDictionary {
  welcome: Welcome;
  auth: Auth;
  pages: Pages;
  help: Help;
  settings: Settings;
  errors: Errors;
  folders: Folders;
  date: Date;
  profile: Profile;
  files: Files;
  contextMenu: ContextMenu;
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
  avatar: Avatar;
  plan: Plan;
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

interface Avatar {
  change: string;
}

interface Plan {
  improve: string;
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
  error: Error;
  success: Success;
  title: string;
  create: Create;
  delete: Delete;
  update: Update;
  notFound: string;
  name: string;
  color: string;
  search: string;
  view: View;
  empty: Empty;
  actions: Actions;
}

interface Error {
  create: string;
  update: string;
  delete: string;
}

interface Success {
  create: string;
  update: string;
  delete: string;
}

interface Create {
  full: string;
  partial: string;
}

interface Delete {
  full: string;
  partial: string;
  warning: string;
  question: string;
  confirm: string;
}

interface Update {
  full: string;
  partial: string;
  title: string;
}

interface View {
  row: string;
  cells: string;
}

interface Empty {
  title: string;
  description: string;
}

interface Actions {
  open: string;
  update: string;
  delete: string;
}

interface Date {
  month: string[];
}

interface Profile {
  folders: string;
  files: string;
}

interface Files {
  empty: Empty2;
  contextMenu: string;
  actions: Actions2;
  delete: Delete2;
  update: Update2;
  upload: Upload;
}

interface Empty2 {
  title: string;
}

interface Actions2 {
  download: string;
  delete: string;
  rename: string;
  share: string;
}

interface Delete2 {
  warning: string;
  full: string;
  partial: string;
  success: string;
  error: string;
}

interface Update2 {
  full: string;
  partial: string;
  success: string;
  error: string;
}

interface Upload {
  full: string;
  partial: string;
  success: string;
  error: string;
}

interface ContextMenu {
  title: string;
  ariaLabel: string;
}
