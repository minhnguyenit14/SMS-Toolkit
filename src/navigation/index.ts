import * as appStacks from './appStacks';
import appRoutes, { homeStackRoutes, modalStackRoutes } from './appRoutes';
import { RouteProp } from '@react-navigation/core';

export interface ScreenOptions {
    route: RouteProp<any, any>;
    navigation: any;
}

export { appStacks, appRoutes, homeStackRoutes, modalStackRoutes };

export { default } from './RootStackScreen';