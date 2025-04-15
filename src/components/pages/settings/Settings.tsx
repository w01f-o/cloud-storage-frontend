import { getDictionary } from '@/actions/lang.action';
import AccountDeleter from '@/components/features/Settings/AccountDeleter/AccountDeleter';
import AvatarChanger from '@/components/features/Settings/AvatarChanger/AvatarChanger';
import EmailChanger from '@/components/features/Settings/EmailChanger/EmailChanger';
import LanguageChanger from '@/components/features/Settings/LanguageChanger/LanguageChanger';
import NameChanger from '@/components/features/Settings/NameChanger/NameChanger';
import PasswordChanger from '@/components/features/Settings/PasswordChanger/PasswordChanger';
import ThemeSwitcher from '@/components/features/Settings/ThemeSwitcher/ThemeSwitcher';
import PageTitle from '@/components/widgets/PageTitle/PageTitle';
import { UserApi } from '@/services/api/index.api';
import { Col, Row } from '@w01f-o/react-grid-layout';
import { cookies } from 'next/headers';
import { FC } from 'react';
import styles from './settings.module.scss';

const Settings: FC = async () => {
  const cookie = cookies();
  const lang = cookie.get('NEXT_LOCALE')?.value as string;
  const dict = await getDictionary();
  const { data: user } = await UserApi.getUser();

  return (
    <Row>
      <Col xs={12}>
        <PageTitle>{dict.pages.settings}</PageTitle>
      </Col>
      <Col xl={4} md={6} xs={12}>
        <div className={styles.buttons}>
          <LanguageChanger dict={dict} lang={lang} />
          <NameChanger dict={dict} oldName={user.name} />
          <EmailChanger dict={dict} />
          <PasswordChanger dict={dict} />
          <AvatarChanger
            dict={dict}
            oldAvatarUrl={`${process.env.NEXT_PUBLIC_STATIC_BASE_URL}/${user.avatar}`}
          />
          <AccountDeleter dict={dict} />
          <ThemeSwitcher dict={dict} />
        </div>
      </Col>
    </Row>
  );
};

export default Settings;
