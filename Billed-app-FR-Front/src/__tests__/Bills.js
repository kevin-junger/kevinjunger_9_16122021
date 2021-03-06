import { screen } from "@testing-library/dom"
import userEvent from "@testing-library/user-event"
import { bills } from "../fixtures/bills.js"
import storeMock from "../__mocks__/store.js"
import { ROUTES, ROUTES_PATH } from "../constants/routes.js"
import Router from "../app/Router.js"
import Bills from "../containers/Bills.js"
import BillsUI from "../views/BillsUI.js"

describe('Given I am connected as an employee', () => {
  // mock d'une connexion en tant qu'employé
  window.localStorage.setItem('user', JSON.stringify({ type: 'Employee' }))
  const onNavigate = (pathname) => {
    document.body.innerHTML = ROUTES({ pathname })
  }
  describe('When I am on Bills Page', () => {
    test('Then bill icon in vertical layout should be highlighted', () => {
      window.location.hash = ROUTES_PATH["Bills"]
      document.body.innerHTML = `<div id="root"></div>`
      Router()
      const icon = screen.getByTestId('icon-window')
      expect(icon.classList.contains('active-icon')).toBeTruthy()
    })
    test('Then bills should be ordered from earliest to latest', () => {
      const html = BillsUI({ data: bills })
      document.body.innerHTML = html
      const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)
      const antiChrono = (a, b) => ((a < b) ? 1 : -1)
      const datesSorted = dates.sort(antiChrono)
      expect(dates).toEqual(datesSorted)
    })
    describe('When I click the eye icon on an existing bill to view the attached file', () => {
      test('Then the file should be opened in its own modal', () => {
        const html = BillsUI({ data: bills })
        document.body.innerHTML = html
        const testBills = new Bills({ document, onNavigate, store: null, localStorage: window.localStorage })
        const eyeIcons = screen.getAllByTestId('icon-eye')
        $.fn.modal = jest.fn() // nécessaire sinon renvoie une erreur
        const handleClick = jest.fn(testBills.handleClickIconEye(eyeIcons[0]))
        eyeIcons[0].addEventListener('click', handleClick)
        userEvent.click(eyeIcons[0])
        expect(handleClick).toHaveBeenCalled()
        expect(document.getElementById('modaleFile')).toBeTruthy()
      })
    })
    describe('When I click the "New Bill" button', () => {
      test('Then the "New Bill" page should render', () => {
        const html = BillsUI({ data: [] })
        document.body.innerHTML = html
        const testBills = new Bills({ document, onNavigate, store: null, localStorage: window.localStorage })
        const newBillBtn = screen.getByTestId('btn-new-bill')
        const handleClick = jest.fn(testBills.handleClickNewBill)
        newBillBtn.addEventListener('click', handleClick)
        userEvent.click(newBillBtn)
        expect(handleClick).toHaveBeenCalled()
        expect(screen.getByTestId('form-new-bill')).toBeTruthy()
      })
    })
  })
})

// test d'intégration GET
describe('Given I am connected as an employee', () => {
  describe('When I am on the Bills page', () => {
    test('Fetches bills from mock API GET', async () => {
      const getSpy = jest.spyOn(storeMock, "get")
      const bills = await storeMock.get()
      expect(getSpy).toHaveBeenCalledTimes(1)
      expect(bills.data.length).toBe(4)
    })
    test("fetches bills from an API and fails with 404 message error", async () => {
      storeMock.get.mockImplementationOnce(() =>
        Promise.reject(new Error("Erreur 404"))
      )
      const html = BillsUI({ error: "Erreur 404" })
      document.body.innerHTML = html
      const message = screen.getByText(/Erreur 404/)
      expect(message).toBeTruthy()
    })
    test("fetches messages from an API and fails with 500 message error", async () => {
      storeMock.get.mockImplementationOnce(() =>
        Promise.reject(new Error("Erreur 500"))
      )
      const html = BillsUI({ error: "Erreur 500" })
      document.body.innerHTML = html
      const message = screen.getByText(/Erreur 500/)
      expect(message).toBeTruthy()
    })
  })
})
