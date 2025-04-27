import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/_shared/ui';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { TabsValue } from '../model/enums/tabs-value.enum';
import { AccountSettings } from './general-settings/AccountSettings';
import { AppearanceSettings } from './general-settings/AppearanceSettings';
import { GeneralSettings } from './general-settings/GeneralSettings';

export const SettingsPage: FC = () => {
  const t = useTranslations('SettingsPage');

  return (
    <div className='pt-6'>
      <Tabs defaultValue={TabsValue.ACCOUNT}>
        <TabsList className='mb-4'>
          <TabsTrigger value={TabsValue.GENERAL}>
            {t('tabs.general')}
          </TabsTrigger>
          <TabsTrigger value={TabsValue.ACCOUNT}>
            {t('tabs.account')}
          </TabsTrigger>
          <TabsTrigger value={TabsValue.APPEARANCE}>
            {t('tabs.appearance')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value={TabsValue.GENERAL}>
          <GeneralSettings />
        </TabsContent>
        <TabsContent value={TabsValue.ACCOUNT}>
          <AccountSettings />
        </TabsContent>
        <TabsContent value={TabsValue.APPEARANCE}>
          <AppearanceSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};
