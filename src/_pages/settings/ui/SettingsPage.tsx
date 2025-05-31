import { Link } from '@/_shared/i18n';
import { RoutePaths } from '@/_shared/router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/_shared/ui';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { SettingsTabValue } from '../model/enums/tabs-value.enum';
import { AccountSettings } from './account-settings/AccountSettings';
import { AppearanceSettings } from './appearance-settings/AppearanceSettings';
import { GeneralSettings } from './general-settings/GeneralSettings';

interface SettingsPageProps {
  tabValue: SettingsTabValue;
}

export const SettingsPage: FC<SettingsPageProps> = ({ tabValue }) => {
  const t = useTranslations('SettingsPage');

  return (
    <div className='md:pt-3'>
      <Tabs value={tabValue}>
        <TabsList className='mb-4'>
          <TabsTrigger value={SettingsTabValue.GENERAL}>
            <Link href={RoutePaths.SETTINGS_GENERAL}>{t('tabs.general')}</Link>
          </TabsTrigger>
          <TabsTrigger value={SettingsTabValue.ACCOUNT}>
            <Link href={RoutePaths.SETTINGS_ACCOUNT}>{t('tabs.account')}</Link>
          </TabsTrigger>
          <TabsTrigger value={SettingsTabValue.APPEARANCE}>
            <Link href={RoutePaths.SETTINGS_APPEARANCE}>
              {t('tabs.appearance')}
            </Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value={SettingsTabValue.GENERAL}>
          <GeneralSettings />
        </TabsContent>
        <TabsContent value={SettingsTabValue.ACCOUNT}>
          <AccountSettings />
        </TabsContent>
        <TabsContent value={SettingsTabValue.APPEARANCE}>
          <AppearanceSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};
