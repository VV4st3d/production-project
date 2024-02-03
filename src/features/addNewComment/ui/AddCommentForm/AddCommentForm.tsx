import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AddCommentForm.module.scss';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Input } from '@/shared/ui/deprecated/Input';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import {
    DynamicModuleLoader,
    ReducerList,
} from '@/shared/lib/components/DinamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import {
    getAddCommentFormError,
    getAddCommentFormText,
} from '../../model/selectors/addCommentFormSelector';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    addCommentFormSliceActions,
    addCommentFormSliceReducer,
} from '@/features/addNewComment/model/slices/addCommetFormSlice';
import { HStack } from '@/shared/ui/deprecated/Stack';

const reducers: ReducerList = {
    addCommentForm: addCommentFormSliceReducer,
};

interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const AddCommentForm = memo((props: AddCommentFormProps) => {
    const { t } = useTranslation();
    const { className, onSendComment } = props;
    const text = useSelector(getAddCommentFormText);
    const error = useSelector(getAddCommentFormError);
    const dispatch = useAppDispatch();

    const onCommentTextChange = useCallback((value: string) => {
        dispatch(addCommentFormSliceActions.setText(value));
    }, []);

    const onSendHandler = useCallback(() => {
        onSendComment(text || '');
        onCommentTextChange('');
    }, [text, onSendComment, onCommentTextChange]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <HStack
                justify={'between'}
                max
                className={classNames(cls.AddCommentForm, {}, [className])}
            >
                <Input
                    className={cls.input}
                    onChange={onCommentTextChange}
                    value={text}
                    placeholder={t('Введите текст комментария')}
                />
                <Button
                    onClick={onSendHandler}
                    theme={ButtonTheme.OUTLINE}
                >
                    {t('Отправить')}
                </Button>
            </HStack>
        </DynamicModuleLoader>
    );
});

export default AddCommentForm;
