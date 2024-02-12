import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { UiDesignSwitcher } from '@/features/uiDesignSwitcher';
import { Text } from '@/shared/ui/redesigned/Text';

interface SettingsPageProps {
    className?: string;
}

const SettingsPage = memo((_: SettingsPageProps) => {
    const { t } = useTranslation();

    return (
        <Page>
            <VStack gap={'16'}>
                <Text title={t('Настройки пользователя')} />
                <UiDesignSwitcher />
            </VStack>
        </Page>
    );
});

export default SettingsPage;
