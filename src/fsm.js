class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
		
    constructor(config) {
			if (config === 'undefined') {
				throw new Error;
			}
			this.initial = config.initial;
			this.states = config.states;
			this.historyStates = [];
			this.historyStates.push(this.initial);
		}

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
			return this.initial;
		}

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
			for (let value in this.states) {
				if (state === value) {
					this.initial = state;
					this.historyStates.push(this.initial);
					return this.initial;
				}
			}
			throw new Error;
			
		}

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
			for (let state in this.states) {
				if (state === this.initial) {
					let flag = 0;
					for (let key in this.states[state].transitions) {
						if (event === key) {
							flag++;
							if (this.initial === this.historyStates[this.historyStates.length-1]) {
								this.historyStates.push(this.states[state].transitions[key]);
							}
							return this.initial = this.states[state].transitions[key];
						}
					}
					if (flag === 0) {
						throw new Error;
					}
				}
			}
		}

    /**
     * Resets FSM state to initial.
     */
    reset() {
			return this.initial = 'normal';
		}

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
			if (event === undefined) {
				return Object.keys(this.states);
			}

			let arrStates = [];

			for (let state in this.states) {
					for (let key in this.states[state].transitions) {
						if (event === key) {
							arrStates.push(state);
						}
					}
			}
			return arrStates;
		}

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
			if (this.historyStates.length < 2) {
				return false;
			}

			let length = this.historyStates.length;

			if (this.initial === this.historyStates[length-2]) {
				return false;
			}
			if (this.initial = this.historyStates[length-2]) {
				return true;
			}

		}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
			
			if (this.historyStates.length < 2) {
				return false;
			}

			let length = this.historyStates.length;
			
			if (this.initial === this.historyStates[length-1]) {
				return false;
			}
			if (this.initial = this.historyStates[length-1]) {
				return true;
			}
		}

    /**
     * Clears transition history
     */
    clearHistory() {
			this.historyStates.splice(1);
		}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
