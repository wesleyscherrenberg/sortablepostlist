type Variant = 'primary' | 'secondary' | 'light';
type Icon = 'info' | 'error' | 'sad';

export interface PostsType {
    userId: number,
    id: number,
    title: string,
    body: string
}

export interface PostsType {
    userId: number,
    id: number,
    title: string,
    body: string
}

export interface ActionsType {
    postId: number,
    fromIndex: number,
    toIndex: number
}

export interface PostsPropType {
    limit?: number
}

export interface PostPropType {
    title: string
}

export interface PostItemPropType {
    postId: number
    index: number,
    showSortUp?: boolean,
    showSortDown?: boolean
}

export interface ActionItemProp {
    action: ActionsType,
    btnText: string
}

export interface CardPropType {
    title: string
}

export interface ToastPropType {
    message?: string,
    variant?: string,
    duration?: number
}

export interface NotificationPropType {
    variant?: Variant;
    icon?: Icon;
    iconPositionRight?: boolean;
    text: string;
}
