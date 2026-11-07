# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests_PostTest\TMS-Module\Employees\01-employee.spec.ts >> Employees
- Location: tests_PostTest\TMS-Module\Employees\01-employee.spec.ts:27:5

# Error details

```
Test timeout of 90000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=f3e2]:
  - banner [ref=f3e5]:
    - generic [ref=f3e6]:
      - generic [ref=f3e7]:
        - button "menu" [ref=f3e9] [cursor=pointer]
        - separator [ref=f3e22]
        - paragraph [ref=f3e24]: Employees
      - generic [ref=f3e25]:
        - generic [ref=f3e28]:
          - button [ref=f3e29] [cursor=pointer]
          - button [ref=f3e33] [cursor=pointer]
          - button [ref=f3e37] [cursor=pointer]
        - separator [ref=f3e43]
        - generic [ref=f3e44]:
          - button [ref=f3e46] [cursor=pointer]
          - button [ref=f3e51] [cursor=pointer]
          - button "notifications" [ref=f3e61] [cursor=pointer]
          - button [ref=f3e71] [cursor=pointer]
          - button [ref=f3e78] [cursor=pointer]
          - button "notifications" [ref=f3e86] [cursor=pointer]
          - button [ref=f3e92] [cursor=pointer]
          - button [ref=f3e97] [cursor=pointer]
          - paragraph [ref=f3e102]: Welcome Back., Trainee
  - generic [ref=f3e109]:
    - generic [ref=f3e113]:
      - button [expanded] [ref=f3e114] [cursor=pointer]:
        - generic [ref=f3e115]:
          - heading "Search" [level=4] [ref=f3e121]
          - 'heading "Total : 1" [level=4] [ref=f3e124]'
      - region [ref=f3e132]:
        - generic [ref=f3e137]:
          - generic [ref=f3e140] [cursor=pointer]:
            - generic: Business Unit
            - generic [ref=f3e141]:
              - textbox [ref=f3e142]: 15 item(s) selected
              - generic [ref=f3e144]:
                - button "clear" [ref=f3e145]
                - button [ref=f3e149]
              - group
          - generic [ref=f3e155]:
            - generic: Type
            - generic [ref=f3e156] [cursor=pointer]:
              - textbox [ref=f3e157]
              - button [ref=f3e160]
              - group
          - generic [ref=f3e165]:
            - button "Reset" [ref=f3e167] [cursor=pointer]
            - button "Search" [ref=f3e170] [cursor=pointer]
    - generic [ref=f3e172]:
      - generic [ref=f3e176]:
        - generic: Filter by Employee ID, First Name, Last Name
        - generic [ref=f3e177]:
          - textbox [ref=f3e178]: EMP26102701
          - button [ref=f3e179] [cursor=pointer]
          - group
      - table [ref=f3e185]:
        - rowgroup [ref=f3e186]:
          - row [ref=f3e187]:
            - columnheader "Action" [ref=f3e188]
            - columnheader "Employee ID" [ref=f3e189]
            - columnheader "First Name" [ref=f3e190]
            - columnheader "Last Name" [ref=f3e191]
            - columnheader "Business Unit" [ref=f3e192]
            - columnheader "Type" [ref=f3e193]
            - columnheader "Update Date" [ref=f3e194]
            - columnheader "Update By" [ref=f3e195]
            - columnheader "Create Date" [ref=f3e196]
            - columnheader "Create By" [ref=f3e197]
        - rowgroup [ref=f3e198]:
          - row [ref=f3e199]:
            - cell [ref=f3e200]:
              - generic [ref=f3e201]:
                - button [ref=f3e202] [cursor=pointer]
                - separator [ref=f3e208]
                - button [ref=f3e209] [cursor=pointer]
            - cell "EMP26102701" [ref=f3e217]
            - cell "ชื่อจริง" [ref=f3e219]
            - cell "นามสกุล" [ref=f3e220]
            - cell "AGG UAT" [ref=f3e221]
            - cell "Employee" [ref=f3e222]
            - cell "27/10/2026 11:25" [ref=f3e223]
            - cell "trainee03" [ref=f3e224]
            - cell "27/10/2026 11:24" [ref=f3e225]
            - cell "trainee03" [ref=f3e226]
      - generic [ref=f3e228]:
        - navigation "pagination navigation" [ref=f3e230]:
          - list [ref=f3e231]:
            - listitem [ref=f3e232]:
              - button "Go to first page" [disabled]
            - listitem [ref=f3e233]:
              - button "Go to previous page" [disabled]
            - listitem [ref=f3e234]:
              - button "page 1" [ref=f3e235] [cursor=pointer]: "1"
            - listitem [ref=f3e236]:
              - button "Go to next page" [disabled]
            - listitem [ref=f3e237]:
              - button "Go to last page" [disabled]
        - generic [ref=f3e239]:
          - combobox [ref=f3e240] [cursor=pointer]:
            - option "25" [selected]
            - option "50"
            - option "100"
          - group
        - heading "1 - 1 of 1 items" [level=5] [ref=f3e244]
```