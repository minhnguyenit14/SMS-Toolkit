import React from 'react';
import { mainStack } from '../appStacks';
import { homeStackRoutes } from '../appRoutes';
import { HomeContainer } from '@containers';


const { Navigator, Screen } = mainStack;

function MainStackScreen() {
    return (
        <Navigator>
            <Screen
                name={homeStackRoutes.home}
                component={HomeContainer}
                options={{ headerShown: false }}
            />
        </Navigator>
    );
}

export default MainStackScreen;