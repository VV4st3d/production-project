import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import './Loader.scss';

interface LoaderProps {
    className?: string;
    isLoaderBlack?: boolean;
}

export const Loader = ({ className, isLoaderBlack }: LoaderProps) => {
    const mod: Mods = { black_loader: isLoaderBlack };
    return (
        <div className={classNames('lds-ellipsis', {}, [className])}>
            <div className={classNames('', mod, [])}></div>
            <div className={classNames('', mod, [])}></div>
            <div className={classNames('', mod, [])}></div>
            <div className={classNames('', mod, [])}></div>
        </div>
    );
};
