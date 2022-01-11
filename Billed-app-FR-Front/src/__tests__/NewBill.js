import { screen } from "@testing-library/dom"
import userEvent from "@testing-library/user-event"
import { ROUTES } from "../constants/routes.js"
import store from "../app/Store.js"
import { localStorageMock } from "../__mocks__/localStorage.js"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"

describe('Given I am connected as an employee', () => {
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
          const file = new File(['some random data'], 'file.jpg', {type: 'image/jpg'})
          inputFile.addEventListener('change', handleChangeFile)
          userEvent.upload(inputFile, file)
          expect(handleChangeFile).toBeCalled()
          expect(inputFile.files.length).toEqual(1)
        })
      })
    })
  })
})
