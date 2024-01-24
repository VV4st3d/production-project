import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Notificationitem.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Notification } from '../../model/types/notifications';
import { Card, CardTheme } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const { t } = useTranslation();
    const { className, item } = props;

    const content = (
        <Card
            theme={CardTheme.OUTLINED}
            className={classNames(cls.NotificationItem, {}, [className])}
        >
            <Text
                title={item.title}
                text={item.description}
            />
        </Card>
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
