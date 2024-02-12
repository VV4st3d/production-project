export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_EDIT = 'article_edit',
    ADMIN_PANEL = 'admin_panel',
    SETTINGS = 'settings',
    FORBIDDEN = 'forbidden',
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
