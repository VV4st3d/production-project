import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Notificationitem.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Notification } from '../../model/types/notifications';
import { Card as CardDeprecated, CardTheme } from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const { t } = useTranslation();
    const { className, item } = props;

    const content = (
        <ToggleFeatures
            feature={'isAppRedesigned'}
            on={
                <Card
                    className={classNames(cls.NotificationItem, {}, [
                        className,
                    ])}
                >
                    <Text
                        title={item.title}
                        text={item.description}
                    />
                </Card>
            }
            off={
                <CardDeprecated
                    theme={CardTheme.OUTLINED}
                    className={classNames(cls.NotificationItem, {}, [
                        className,
                    ])}
                >
                    <TextDeprecated
                        title={item.title}
                        text={item.description}
                    />
                </CardDeprecated>
            }
        />
    );

    if (item.href) {
        return (
            <a
                className={cls.link}
                target={'_black'}
                href={item.href}
                rel={'noreferrer'}
            >
                {content}
            </a>
        );
    }

    return content;
});
