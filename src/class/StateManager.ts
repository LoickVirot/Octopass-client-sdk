import State from '../interface/State'

class StateManager {
    private static instance: StateManager = new StateManager()
    
    private state: State

    private constructor() {
        this.state = {
            clientToken: "",
            userToken: ""
        }
    }

    public static getInstance(): StateManager {
        return this.instance || (this.instance = new this());
    }

    /**
     * Update element into state
     * @param key Name of the value to change
     * @param value new value
     */
    public updateState(key: string, value: string): void {
        try {
            this.state[key] = value;
        } catch(err) {
            if (typeof err == TypeError.toString()) {
                throw new Error("Cannot update State : key not found")
            }
        }
    }

    /**
     * element element into state
     * @param key Name of the value to change
     */
    public get(key: string): any {
        try {
            return this.state[key];
        } catch(err) {
            if (typeof err == TypeError.toString()) {
                throw new Error("Cannot update State : key not found")
            }
        }
    }

    public getState(): State {
        return this.state
    }
}

export default StateManager