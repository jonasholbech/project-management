import { Machine } from "xstate";

const flowMachine = Machine(
  {
    id: "PM",
    initial: "idle",
    states: {
      idle: {
        on: {
          FETCH: 'fetchIt'
        }
      },
      fetchIt: {
        on: {
          SUCCESS:"overview",
          ERROR:{}
        }
      },
      overview: {
        on: {}
      }
      /* success: {
        entry:['assignData'],
        type: 'final'
      },
      failure: {
        on: {
          RETRY: {
            target: 'idle',
            actions: assign({
              retries: (context, event) => context.retries + 1
            })
          }
        }
      } */
      /*loading: {
        on: {
          COMPLETED: "addingPlayer"
          //ERROR: "todo"
        }
      },
      addingPlayer: {
        entry: ["sayHi"],
        on: {
          ADDED: "addingPlayer",
          NEXT: "setup"
        }
      },

      setup: {
        on: {
          NEXT: "setup",
          LANDS_DIVIDED: "getMission"
        }
      },
      getMission: {
        on: {
          NEXT: "placeUnits"
        }
      },
      placeUnits: {
        on: {
          UNIT_PLACED: "placeUnits",
          NO_MORE_UNITS: "playerStartTurn"
        }
      },
      playerStartTurn: {
        entry: ["addStartOfTurnUnitsTest"],
        on: {
          GOT_UNITS: "placeUnitsTurn"
        }
      },
      placeUnitsTurn: {
        on: {
          UNIT_PLACED: "placeUnitsTurn",
          NO_MORE_UNITS: "playerAttackPhase"
        }
      },
      playerAttackPhase: {
        on: {
          SELECT: "playerAttackPhase",
          ATTACK: "playerAttackPhase",
          MOVE: "playerAttackPhase",
          END_TURN: "setNextPlayer"
        }
      },
      setNextPlayer: {
        NEXT: "playerStartTurn"
      }*/
    }
  },
  {
    actions: {
      // action implementations
      addStartOfTurnUnitsTest: (context, event) => {
        //
      },
      
    }
  }
);

export default flowMachine;
