import { FC } from "react";
import PageTitle from "@/components/widgets/PageTitle/PageTitle";
import { cookies } from "next/headers";
import { Col, Row } from "@w01f-o/react-grid-layout";
import styles from "./settings.module.scss";
import LanguageChanger from "@/components/features/Settings/LanguageChanger/LanguageChanger";
import PasswordChanger from "@/components/features/Settings/PasswordChanger/PasswordChanger";
import PlanImprover from "@/components/features/Settings/PlanImprover/PlanImprover";
import AvatarChanger from "@/components/features/Settings/AvatarChanger/AvatarChanger";
import { getDictionary } from "@/actions/lang.action";
import AccountDeleter from "@/components/features/Settings/AccountDeleter/AccountDeleter";
import { UserApi } from "@/services/api/index.api";
import EmailChanger from "@/components/features/Settings/EmailChanger/EmailChanger";
import NameChanger from "@/components/features/Settings/NameChanger/NameChanger";

const Settings: FC = async () => {
  const cookie = cookies();
  const lang = cookie.get("NEXT_LOCALE")?.value as string;
  const dict = await getDictionary();
  const { data: user } = await UserApi.getUser();

  return (
    <Row>
      <Col xs={12}>
        <PageTitle>{dict.pages.settings}</PageTitle>
      </Col>
      <Col xs={4}>
        <div className={styles.buttons}>
          <LanguageChanger dict={dict} lang={lang} />
          <NameChanger dict={dict} oldName={user.name} />
          <EmailChanger dict={dict} />
          <PasswordChanger dict={dict} />
          <AvatarChanger
            dict={dict}
            oldAvatarUrl={`${process.env.NEXT_PUBLIC_STATIC_BASE_URL}/${user.avatar}`}
          />
          <PlanImprover dict={dict} />
          <AccountDeleter dict={dict} />
        </div>
      </Col>
    </Row>
  );
};

export default Settings;
