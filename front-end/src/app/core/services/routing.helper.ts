export enum RouteEnum {
  TODO = 'todo',
  CARD = 'card',
}

export type CardRouteType = 'short' | 'full' | 'cardId' | 'for-soft-reload';
export type TodoRouteType = 'short' | 'full';

export class AppRoutes {
  static TODO(type: TodoRouteType = 'short'): string {
    return type === 'short' ? RouteEnum.TODO : `/${RouteEnum.TODO}`;
  }

  static CARD(type: CardRouteType = 'short'): string {
    switch (type) {
      case 'full':
        return `/${RouteEnum.CARD}`;
      case 'cardId':
        return `${RouteEnum.CARD}/:cardId`;
      case 'for-soft-reload':
        return `/${RouteEnum.CARD}/`;
      case 'short':
      default:
        return RouteEnum.CARD;
    }
  }
}
