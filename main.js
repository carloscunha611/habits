const form = document.querySelector('#form-habits')
const button = document.querySelector('header button')

const STORAGE_KEY = 'NLWSetup@habits'
const nlwSetup = new NLWSetup(form)

button.addEventListener('click', add)
form.addEventListener('change', save)

function getTodayLabel() {
  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')

  return `${day}/${month}`
}

function add(event) {
  event.preventDefault()

  const today = getTodayLabel()
  const dayExists = nlwSetup.dayExists(today)

  if (dayExists) {
    alert('⚠ Dia já existente')
    return
  }

  nlwSetup.addDay(today)
  save()
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nlwSetup.data))
}

function loadSavedData() {
  const rawData = localStorage.getItem(STORAGE_KEY)

  if (!rawData) return {}

  try {
    return JSON.parse(rawData)
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return {}
  }
}

nlwSetup.setData(loadSavedData())
nlwSetup.load()
