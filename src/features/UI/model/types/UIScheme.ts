// <Адрес страницы, позиция скрола(пиксели)>
export type ScrollScheme = Record<string, number>;

export interface UIScheme {
    scroll: ScrollScheme;
}
