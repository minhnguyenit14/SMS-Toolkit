import React from 'react';
import { rootStack } from '../appStacks';
import { modalStackRoutes } from '../appRoutes';
import MainStackScreen from '../MainStackScreen';
import { Popup, Picker } from '@components';


const { Navigator, Screen } = rootStack;

function RootStackScreen() {
    return (
        <Navigator mode="modal">
            <Screen
                name="Main"
                component={MainStackScreen}
                options={{ headerShown: false }}
            />
            <Screen
                name={modalStackRoutes.popup}
                options={{
                    headerShown: false,
                    cardStyle: {
                        backgroundColor: 'transparent'
                    },
                    animationEnabled: false
                }}
            >
                {(props) => <Popup {...props.route.params} />}
            </Screen>
            <Screen
                name={modalStackRoutes.picker}
                options={{
                    headerShown: false,
                    cardStyle: {
                        backgroundColor: 'transparent'
                    }
                }}
            >
                {(props) => <Picker {...props.route.params} />}
            </Screen>
        </Navigator>
    );
}

export default RootStackScreen;