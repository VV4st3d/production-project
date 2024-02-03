import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>;
/**
 * устарел, используем новые компоненты из папки redesigned
 * @deprecated
 * */
export const HStack = (props: HStackProps) => {
    return (
        <Flex
            direction={'row'}
            {...props}
        />
    );
};
