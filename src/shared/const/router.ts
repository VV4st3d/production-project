export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_EDIT = 'article_edit',
    ADMIN_PANEL = 'admin_panel',
    FORBIDDEN = 'forbidden',
    SETTINGS = 'settings',
    //last
    NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => '/profile/' + id;
export const getRouteArticles = () => '/articles';
export const getRouteArticleDetails = (id: string) => '/articles/' + id;
export const getRouteArticleEdit = (id: string) => '/profile/' + id + '/edit';
export const getRoueArticleCreate = () => '/articles/new';
export const getRouteAdmin = () => '/admin';
export const getRouteForbidden = () => '/forbidden';
export const getRouteSettings = () => '/settings';

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
    [getRouteMain()]: AppRoutes.MAIN,
    [getRouteAbout()]: AppRoutes.ABOUT,
    [getRouteProfile(':id')]: AppRoutes.PROFILE,
    [getRouteArticles()]: AppRoutes.ARTICLES,
    [getRouteArticleDetails(':id')]: AppRoutes.ARTICLE_DETAILS,
    [getRouteArticleEdit(':id')]: AppRoutes.ARTICLE_EDIT,
    [getRoueArticleCreate()]: AppRoutes.ARTICLE_CREATE,
    [getRouteAdmin()]: AppRoutes.ADMIN_PANEL,
    [getRouteForbidden()]: AppRoutes.FORBIDDEN,
    [getRouteSettings()]: AppRoutes.SETTINGS,
};
