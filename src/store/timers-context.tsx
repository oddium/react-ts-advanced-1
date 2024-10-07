import {createContext, ReactNode, useContext, useReducer} from "react";

export type TimerType = {
    name: string;
    duration: number;
}

type TimersStateType = {
    isRunning: boolean;
    timers: TimerType[];
}

type TimersContextValueType = TimersStateType & {
    addTimer: (timerData: TimerType) => void;
    startTimers: () => void;
    stopTimers: () => void;
}

type TimersContextProviderPropsType = {
    children: ReactNode;
}

type StartTimersActionType = {
    type: 'START_TIMERS',
}

type StopTimersActionType = {
    type: 'STOP_TIMERS',
}

type AddTimersActionType = {
    type: 'ADD_TIMER',
    payload: TimerType;
}

type Action = StartTimersActionType | StopTimersActionType | AddTimersActionType;

const initialState: TimersStateType = {
    isRunning: false,
    timers: []
}

const TimersContext = createContext<TimersContextValueType | null>(null);


const timersReducer = (state: TimersStateType, action: Action): TimersStateType => {
    switch (action.type) {
        case "START_TIMERS":
            return {...state, isRunning: true};
        case "STOP_TIMERS":
            return {...state, isRunning: false};
        case "ADD_TIMER":
            return {
                ...state,
                timers: [
                    ...state.timers,
                    {
                        name: action.payload.name,
                        duration: action.payload.duration,
                    }
                ]
            }
        default:
            return state;
    }
}

export const useTimersContext = () => {
    const timersCtx = useContext(TimersContext)

    if (!timersCtx) {
        throw new Error("useTimersContext must be used within Timers");
    }

    return timersCtx;
};

const TimersContextProvider = ({children}: TimersContextProviderPropsType) => {
    const [timersState, dispatch] = useReducer(timersReducer, initialState)

    const ctx: TimersContextValueType = {
        timers: timersState.timers,
        isRunning: timersState.isRunning,
        addTimer(timerData) {
            dispatch({type: 'ADD_TIMER', payload: timerData});
        },
        startTimers() {
            dispatch({type: 'START_TIMERS'});
        },
        stopTimers() {
            dispatch({type: 'STOP_TIMERS'});
        }
    };

    return <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
}

export default TimersContextProvider;