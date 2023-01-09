const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild){
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [

  // START
  {
    id: 1,
    text: 'You live in a haunted house and the ghosts have taken your cookies tin and hidden it. Try to find it and avoid the scary ghosts! 👻',
    options: [
      {
        text: 'Start',
        nextText: 5
      }
    ]
  },

  // RESTART

  {
    id: 2,
    text: 'You got scared by the ghost! 👻',
    options: [
      {
        text: 'Try again',
        nextText: -1
      }
    ]
  },

  // COOKIE
  {
    id: 3,
    text: 'Congratulations! You found the cookies! 🍪',
    options: [
      {
        text: 'Play again',
        nextText: 1,
      }
    ]
  },

  // KEY

  {
    id: 4,
    text: 'You found a key. 🔑',
    options: [
      {
        text: 'Back',
        setState: {key: true},
        nextText: 5
      }
    ]
  },

  // ROOMS
  {
    id: 5,
    text: 'Move to the...',
    options: [
      {
        text: 'Attic',
        nextText: 6
      },

      {
        text: 'Living room',
        nextText: 7
      },

      {
        text: 'Door',
        nextText: 8
      },

      {
        text: 'Kitchen',
        nextText: 9
      }
    ]
  },

  // ATTIC
  {
    id: 6,
    text: 'The attic is cold and dusty. There are cardboard boxes around. Which do you open?',
    options: [
      {
        text: 'This box',
        nextText: 2
      },
      {
        text: 'Another box',
        nextText: 4
      },
      {
        text: 'Back',
        nextText: 5
      }
    ]
  },

  // LIVING ROOM
  {
    id: 7,
    text: 'In the living room there is a tv and a sofa. Where do you look?',
    options: [
      {
        text: 'Behind the TV',
        nextText: 2
      },
      {
        text: 'Sofa',
        nextText: 2
      },
      {
        text: 'Back',
        nextText: 5
      }
    ]
  },

  // DOOR
  {
    id: 8,
    text: 'Leave to buy more cookies?',
    options: [
      {
        text: 'Give up',
        nextText: 1
      },
      {
        text: 'Back',
        nextText: 5
      }
    ]
  },


  // KITCHEN
  {
    id: 9,
    text: 'The kitchen door is locked.',
    options: [
      {
        text: 'Open',
        requiredState: (currentState) => currentState.key,
        nextText: 3
      },
      {
        text: 'Back',
        nextText: 5
      }
    ]
  }
]

startGame()
