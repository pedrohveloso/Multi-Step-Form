let currentStep = 0;
const formSteps = document.querySelectorAll('.form-step')
const form = document.querySelector('form')

/* Steps */
form.addEventListener('click', (event) => {
  if (!event.target.matches('[data-action]')) {
    return
  }

  const actions = {
    next() {
      if (!isValidInputs()) {
        return
      }
      currentStep++
    },
    prev() {
      currentStep--
    }
  }

  const action = event.target.dataset.action
  actions[action]()

  updateActiveStep()
  updateProgressStep()
})

/* Envio do formulário */
form.addEventListener('submit', (event) => {
  event.preventDefault()

  const data = new FormData(form)
  alert(`Obrigado ${data.get('name')}!`)
})

/* Update Steps */
function updateActiveStep() {
  formSteps.forEach(step => step.classList.remove('active'))
  formSteps[currentStep].classList.add('active')
}

const progressSteps = document.querySelectorAll('.step-progress [data-step')
function updateProgressStep() {
  progressSteps.forEach((step, idx) => {
    step.classList.remove('active')
    step.classList.remove('done')

    if (idx < currentStep + 1) {
      step.classList.add('active')
    }

    if (idx < currentStep) {
      step.classList.add('done')
    }
  })
}

/* Validation */
function isValidInputs() {
  const currentFormStep = formSteps[currentStep]
  const formFields = [...currentFormStep.querySelectorAll('input'), ...currentFormStep.querySelectorAll('textarea')]

 return (formFields.every((input) => input.reportValidity()))
}

/* Animations */
formSteps.forEach(formStep => {
  function addHide() {
    formStep.classList.add('hide')
  }

  formStep.addEventListener('animationend', () => {
    addHide()
    formSteps[currentStep].classList.remove('hide')
  })
})