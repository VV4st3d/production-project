import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './PageLoader.module.scss';
import { Loader } from '@/shared/ui/Loader';

interface PageLoaderProps {
    className?: string;
    isLoaderBlack?: boolean;
}

export const PageLoader = ({ className, isLoaderBlack }: PageLoaderProps) => {
    return (
        <div className={classNames(cls.PageLoader, {}, [className])}>
            <Loader isLoaderBlack={isLoaderBlack} />
        </div>
    );
};
