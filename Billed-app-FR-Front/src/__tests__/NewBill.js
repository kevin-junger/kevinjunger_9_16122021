import { fireEvent, screen } from "@testing-library/dom"
import userEvent from "@testing-library/user-event"
import { ROUTES } from "../constants/routes.js"
import store from "../app/Store.js"
import { localStorageMock } from "../__mocks__/localStorage.js"
import storeMock from "../__mocks__/store.js"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"

describe('Given I am connected as an employee', () => {
  // mock d'une connexion en tant qu'employé
  Object.defineProperty(window, 'localStorage', { value: localStorageMock })
  window.localStorage.setItem('user', JSON.stringify({ type: 'Employee' }))
  const onNavigate = (pathname) => {
    document.body.innerHTML = ROUTES({ pathname })
  }
  describe('When I am on NewBill Page', () => {
    test('Then a form should appear', () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      const newBillForm = screen.getByTestId('form-new-bill')
      expect(newBillForm).toBeTruthy()
    })
    describe('Given I am uploading a file to attach to my new bill', () => {
      describe('When I try to upload something which is not a JPG, JPEG or PNG file (e.g. a PDF)', () => {
        test('Then the file should be rejected', () => {
          const html = NewBillUI()
          document.body.innerHTML = html
          const newBill = new NewBill({ document, onNavigate, store: store, localStorage: window.localStorage })
          const handleChangeFile = jest.fn(newBill.handleChangeFile)
          const inputFile = screen.getByTestId('file')
          const file = new File(['some random data'], 'file.pdf', { type: 'application/pdf' })
          jest.spyOn(window, 'alert').mockImplementation(() => {}) // nécessaire sinon renvoie une erreur
          inputFile.addEventListener('change', handleChangeFile)
          userEvent.upload(inputFile, file)
          expect(handleChangeFile).toBeCalled()
          expect(inputFile.value).toBe('')
        })
      })
      describe('When I try to upload a JPG, JPEG or PNG file', () => {
        test('Then the file should be accepted', () => {
          const html = NewBillUI()
          document.body.innerHTML = html
          const newBill = new NewBill({ document, onNavigate, store: store, localStorage: window.localStorage })
          const handleChangeFile = jest.fn(newBill.handleChangeFile)
          const inputFile = screen.getByTestId('file')
          const file = new File(['some random data'], 'file.jpg', { type: 'image/jpg'})
          inputFile.addEventListener('change', handleChangeFile)
          userEvent.upload(inputFile, file)
          expect(handleChangeFile).toBeCalled()
          expect(inputFile.files.length).toEqual(1)
        })
      })
    })
    describe('When I submit a NewBill', () => {
      test('Then I should be redirected to the Bills page', () => {
        document.body.innerHTML = NewBillUI()
        const newBill = new NewBill({ document, onNavigate, store: null, localStorage: window.localStorage })
        const form = screen.getByTestId('form-new-bill')
        const handleSubmit = jest.fn(newBill.handleSubmit)
        form.addEventListener('submit', handleSubmit)
        fireEvent.submit(form)
        expect(screen.getByText('Mes notes de frais')).toBeTruthy()
      })
    })
  })
})

// test d'intégration POST
describe('Given I am connected as an employee', () => {
  // mock d'une connexion en tant qu'employé
  window.localStorage.setItem('user', JSON.stringify({ type: 'Employee' }))
  describe('When I send a NewBill form', () => {
    test('Then fetches bill ID from mock API POST', async () => {
      const dataBill = {
        "id": "47qAXb6fIm2zOKkLzMro",
        "vat": "80",
        "fileUrl": "https://test.storage.tld/v0/b/billable-677b6.a…f-1.jpg?alt=media&token=c1640e12-a24b-4b11-ae52-529112e9602a",
        "status": "pending",
        "type": "Hôtel et logement",
        "commentary": "séminaire billed",
        "name": "encore",
        "fileName": "preview-facture-free-201801-pdf-1.jpg",
        "date": "2004-04-04",
        "amount": 400,
        "commentAdmin": "ok",
        "email": "a@a",
        "pct": 20
      }
      const postSpy = jest.spyOn(storeMock, "post")
      const postBill = await storeMock.post(dataBill)
      expect(postSpy).toHaveBeenCalled()
      expect(postSpy).toReturn()
      expect(postBill.id).toEqual(dataBill.id)
    })
  })
})
