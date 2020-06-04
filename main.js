const { createStore } = Redux;

const initialState = {
  crew: [
    {
      id: 1,
      name: 'Jason'
    }
  ],
  walked: [],
  walkCounter: 0
}

const crewReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PIRATE:
      const newPirateArray = state.crew.concat(action.newPirate)
      return Object.assign({}, state, {
        crew: newPirateArray
      })
      case WALK_THE_PLANK:
        let walker = state.crew[0]
        let newWalkCounter = state.walkCounter + 1
        const afterWalkArray = state.crew.slice(1)
        return Object.assign({}, state, {
          crew: afterWalkArray,
          walked: state.walked.concat(walker),
          walkCounter: newWalkCounter
        })
  default:
    return state;
  }
}

const newPirateForm = document.getElementById('new-pirate-form')

const createNextId = () => {
  currentPirates = store.getState().crew
  const pirateIds = []
  currentPirates.forEach(function(pirate) { pirateIds.push(pirate.id) })
  return Math.max(...pirateIds) + 1
}

const ADD_PIRATE = 'ADD_PIRATE'

const addPirateToList = newPirate => {
  return {
    type: ADD_PIRATE,
    newPirate: newPirate
  }
}

newPirateForm.addEventListener('submit', () => {
  event.preventDefault()
  const pirateName = document.getElementById('name').value
  document.getElementById('name').value = ''
  const newPirate = { id: createNextId(), name: pirateName }
  store.dispatch(addPirateToList(newPirate))
})

const walkThePlankButton = document.getElementById('walk-the-plank')

const WALK_THE_PLANK = 'WALK_THE_PLANK'

const walkThePlank = pirate => {
  return {
    type: WALK_THE_PLANK,
    pirate: pirate
  }
}

let walkCounter = 0
walkThePlankButton.addEventListener('click', () => {
  event.preventDefault()
  store.dispatch(walkThePlank())
  walkCounter += 1
})

const store = createStore(crewReducer)

const crewList = document.getElementById('current-crew')
const walkedList = document.getElementById('walked-crew')
const plankWalkers = document.getElementById('plank-walkers')

const render = () => {
  let newCrewList = ''
  console.log(store.getState().crew)
  store.getState().crew.forEach(function(crew) {
    newCrewList += `<li>${crew.name}</li>`
  })
  let newWalkedList = ''
  console.log(store.getState().walked)
  store.getState().walked.forEach(function(walked) {
    newWalkedList += `<li> ${walked.name}</li>`
  })
  crewList.innerHTML = newCrewList
  walkedList.innerHTML = newWalkedList
  plankWalkers.innerHTML = store.getState().walkCounter
}

render()
store.subscribe(render);
