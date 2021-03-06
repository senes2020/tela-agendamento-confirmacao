import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Proposta from './Proposta';
import ConfirmacaoAgendamento from './ConfirmacaoAgendamento';
import ConclusaoAgendamento from './ConclusaoAgendamento';
import DateCal from './Date';

const Stack = createStackNavigator();

export default function MyStack(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Proposta"
                    component={Proposta}
                    options={{headerShown: false}}
                    />
                 <Stack.Screen
                    name="ConfirmacaoAgendamento"
                    component={ConfirmacaoAgendamento}
                    options={{headerShown: false}}
                    />    
                    <Stack.Screen
                    name="ConclusaoAgendamento"
                    component={ConclusaoAgendamento}
                    options={{headerShown: false}}
                    /> 
                    <Stack.Screen
                    name="DateCal"
                    component={DateCal}
                    options={{headerShown: false}}
                    />
            </Stack.Navigator>
        </NavigationContainer>
    )
}