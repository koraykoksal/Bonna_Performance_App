# Performance Application

This application made for performance evaulation.
There is two step. 1 - Employee Evaulation. 2 - Manager Evaulation after employee

## Installation
This project was created using React and the Vite package manager.
Use the package manager vite-pnpm


```bash
for node modules yarn or pnpm install
```

## Usage

```
# for employee
use v2_my folder

# for manager and admin
use v2_by folder

```

## How does the employee application work?
* Employees login with ID number. (this id number must be registered company system.)
* After login employee see status component. (for this company there is two type worker. my1 or my2)
* There is questions in my1 or my2 component.
* After answers save all data to Firebase Database system.
* The employee can view their own data in Report page and can update data.

## How does the manager application work?
* Manager can login with username and password. (Made integration with facility ERP system)
* Manager can view own employees performance evaulation results.
* Manager select an employess and view employee performance result. Manager can performance evaulation for employee.
* After manager evaulation save all data to Firebase Database system.
* The manager can view employees data in Report page and can update employee data.

## How does the admin application work?
* HR employee can be login with username and password like manager.
* HR employee can be view employees reports page - manager reports page - settings page - calculate page - and manager private evaulation report pages.
* HR employee can be add and update new year raise data.
* HR employee can calculate with raise data and view employee's new sallary.
* HR employee can be view all employee's title raise or department scale in graphic

Note : The Objective Key Result system is used for performance evaluation of managers and white-collar employees. The results from this data are displayed on the ByReports page, accessed through the API system. Human resources can access these results.

The same salary calculation process used for workers is also applicable to white-collar employees and managers.

# Employee white-collar employees and managers - Sallary Calculate
* There two type raise data and performance raise data.
* 1 - White-collar and manager employee raise data
* 2 - The employee raise data
* Performance raise data.


# The white-collar and manager application web site tree

````
▼ v2_by
▼ src
 ▼ app
  ▷ store.jsx
 ▼ assets
  ◇ img
 ▼ auth
  ▷ firebase.js
 ▼ components
  ◇ delete
   ▷ DeleteModal.jsx
  ◇ modals
   ▷ PerformanceResultView_HR.jsx
   ▷ PerformanceResultView_Manager.jsx
   ▷ PerformanceResultView_OKR.jsx
   ▷ PerformanceResultView_Personel.jsx
   ▷ PerformanceUpdate.jsx
   ▷ ReadUnderstood.jsx
   ▷ Settings_Modal.jsx
   ▷ UnSelectedPersonels.jsx
  ◇ tables
   ▷ AllResults_Table.jsx
   ▷ AllReults_GraphicData.jsx
   ▷ PerformanceResult_Table_BY_OKR.jsx
   ▷ PerformanceResult_Table_BY.jsx
   ▷ PerformanceResult_Table_MY.jsx
   ▷ PerformanceResult_Table.jsx
   ▷ Raise_GraphicData.jsx
   ▷ Settings_Table.jsx
  ▷ My1_Tables.jsx
  ▷ My1.jsx
  ▷ My2_Tables.jsx
  ▷ My2.jsx
 ▼ db
  ▷ firebase_db.js
 ▼ features
  ▷ authSlice.jsx
  ▷ performanceSlice.jsx
 ▼ helper
  ▷ data.js
  ▷ postTextSchema.js
  ▷ ToastNotify.js
 ▼ hooks
  ▷ useAuthCall.jsx
  ▷ usePerformanceCall.jsx
 ▼ pages
  ▷ ByReports.jsx
  ▷ Calculates.jsx
  ▷ Dashboard.jsx
  ▷ Home.jsx
  ▷ Login.jsx
  ▷ ManagerReports.jsx
  ▷ MyReports.jsx
  ▷ NotFound.jsx
  ▷ Report.jsx
  ▷ Settings.jsx
 ▼ router
  ▷ AppRouter.jsx
  ▷ PrivateRouter.jsx
 ▼ styles
  ▷ globalStyle.js
 App.css
 App.jsx
 index.css
 main.jsx
▶︎ .gitignore
▶︎ index.html
▶︎ package.json
▶︎ README.MD
▶︎ vite.config.js

````


# The employee application web site tree

````
▼ v2_my
▼ src
 ▼ app
  ▷ store.jsx
 ▼ assets
  ◇ img
 ▼ auth
  ▷ firebase.js
 ▼ components
  ◇ modals
   ▷ PerformanceUpdate.jsx
   ▷ ReadUnderstood.jsx
  ◇ tables
   ▷ PerformanceResult_Table.jsx
  ▷ My1_Tables.jsx
  ▷ My1.jsx
  ▷ My2_Tables.jsx
  ▷ My2.jsx
 ▼ db
  ▷ firebase_db.js
 ▼ features
  ▷ authSlice.jsx
  ▷ performanceSlice.jsx
 ▼ helper
  ▷ data.js
  ▷ postTextSchema.js
  ▷ ToastNotify.js
 ▼ hooks
  ▷ useAuthCall.jsx
  ▷ usePerformanceCall.jsx
 ▼ pages
  ▷ Dashboard.jsx
  ▷ Home.jsx
  ▷ Login.jsx
  ▷ MyReports.jsx
  ▷ NotFound.jsx
 ▼ router
  ▷ AppRouter.jsx
  ▷ PrivateRouter.jsx
 ▼ styles
  ▷ globalStyle.js
 App.css
 App.jsx
 index.css
 main.jsx
▶︎ .gitignore
▶︎ index.html
▶︎ package.json
▶︎ README.MD
▶︎ vite.config.js

````






## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
